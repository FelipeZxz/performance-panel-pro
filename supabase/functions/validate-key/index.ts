import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const WINDOW_MINUTES = 60;
const SESSION_HOURS = 24;

function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { key } = await req.json();

    if (!key || typeof key !== "string") {
      return new Response(
        JSON.stringify({ valid: false, error: "Key is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Input validation
    if (key.length > 100) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid key format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Check rate limits
    const { data: rateLimit, error: rateLimitError } = await supabase
      .from("rate_limits")
      .select("*")
      .eq("ip_address", clientIP)
      .single();

    const now = new Date();

    if (rateLimit && !rateLimitError) {
      // Check if currently locked out
      if (rateLimit.locked_until && new Date(rateLimit.locked_until) > now) {
        const remainingMinutes = Math.ceil((new Date(rateLimit.locked_until).getTime() - now.getTime()) / 60000);
        console.log(`Rate limit: IP ${clientIP} is locked out for ${remainingMinutes} more minutes`);
        return new Response(
          JSON.stringify({ 
            valid: false, 
            error: `Too many attempts. Try again in ${remainingMinutes} minutes.`,
            rateLimited: true 
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if within rate limit window
      const firstAttempt = new Date(rateLimit.first_attempt_at);
      const windowExpiry = new Date(firstAttempt.getTime() + WINDOW_MINUTES * 60000);

      if (now < windowExpiry) {
        if (rateLimit.attempt_count >= MAX_ATTEMPTS) {
          // Lock out the IP
          const lockUntil = new Date(now.getTime() + LOCKOUT_MINUTES * 60000);
          await supabase
            .from("rate_limits")
            .update({ locked_until: lockUntil.toISOString() })
            .eq("ip_address", clientIP);

          console.log(`Rate limit: IP ${clientIP} has been locked out until ${lockUntil.toISOString()}`);
          return new Response(
            JSON.stringify({ 
              valid: false, 
              error: `Too many attempts. Try again in ${LOCKOUT_MINUTES} minutes.`,
              rateLimited: true 
            }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Increment attempt count
        await supabase
          .from("rate_limits")
          .update({ attempt_count: rateLimit.attempt_count + 1 })
          .eq("ip_address", clientIP);
      } else {
        // Window expired, reset counter
        await supabase
          .from("rate_limits")
          .update({ 
            attempt_count: 1, 
            first_attempt_at: now.toISOString(),
            locked_until: null 
          })
          .eq("ip_address", clientIP);
      }
    } else {
      // First attempt from this IP
      await supabase
        .from("rate_limits")
        .insert({ ip_address: clientIP, attempt_count: 1 });
    }

    // Fetch the password server-side (not exposed to client)
    const { data, error } = await supabase
      .from("settings")
      .select("password")
      .eq("id", "main")
      .single();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ valid: false, error: "Internal error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate key server-side - never expose the actual password
    const isValid = data?.password === key;

    if (isValid) {
      // Reset rate limit on successful login
      await supabase
        .from("rate_limits")
        .delete()
        .eq("ip_address", clientIP);

      // Generate session token
      const sessionToken = generateSessionToken();
      const expiresAt = new Date(now.getTime() + SESSION_HOURS * 60 * 60 * 1000);

      // Store session in database
      const { error: sessionError } = await supabase
        .from("auth_sessions")
        .insert({
          session_token: sessionToken,
          expires_at: expiresAt.toISOString(),
          ip_address: clientIP,
          user_agent: userAgent
        });

      if (sessionError) {
        console.error("Session creation error:", sessionError);
        return new Response(
          JSON.stringify({ valid: false, error: "Internal error" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log(`Successful login from IP ${clientIP}`);
      return new Response(
        JSON.stringify({ valid: true, sessionToken, expiresAt: expiresAt.toISOString() }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      console.log(`Failed login attempt from IP ${clientIP}`);
      return new Response(
        JSON.stringify({ valid: false }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ valid: false, error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
