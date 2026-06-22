import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const WINDOW_MINUTES = 60;

function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { key } = await req.json();

    if (!key || typeof key !== "string" || key.length > 100) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid key" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Rate limiting
    const { data: rateLimit } = await supabase
      .from("rate_limits").select("*").eq("ip_address", clientIP).single();
    const now = new Date();

    if (rateLimit) {
      if (rateLimit.locked_until && new Date(rateLimit.locked_until) > now) {
        const remainingMinutes = Math.ceil((new Date(rateLimit.locked_until).getTime() - now.getTime()) / 60000);
        return new Response(
          JSON.stringify({ valid: false, error: `Muitas tentativas. Tente em ${remainingMinutes} min.`, rateLimited: true }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const firstAttempt = new Date(rateLimit.first_attempt_at);
      const windowExpiry = new Date(firstAttempt.getTime() + WINDOW_MINUTES * 60000);
      if (now < windowExpiry) {
        if (rateLimit.attempt_count >= MAX_ATTEMPTS) {
          const lockUntil = new Date(now.getTime() + LOCKOUT_MINUTES * 60000);
          await supabase.from("rate_limits").update({ locked_until: lockUntil.toISOString() }).eq("ip_address", clientIP);
          return new Response(
            JSON.stringify({ valid: false, error: `Muitas tentativas. Tente em ${LOCKOUT_MINUTES} min.`, rateLimited: true }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        await supabase.from("rate_limits").update({ attempt_count: rateLimit.attempt_count + 1 }).eq("ip_address", clientIP);
      } else {
        await supabase.from("rate_limits").update({ attempt_count: 1, first_attempt_at: now.toISOString(), locked_until: null }).eq("ip_address", clientIP);
      }
    } else {
      await supabase.from("rate_limits").insert({ ip_address: clientIP, attempt_count: 1 });
    }

    // 1) Check admin key
    const { data: settings } = await supabase
      .from("settings").select("admin_key").eq("id", "main").single();

    let isAdmin = false;
    let accessKeyId: string | null = null;
    let durationMinutes = 24 * 60;
    let valid = false;

    if (settings?.admin_key === key) {
      isAdmin = true;
      valid = true;
      durationMinutes = 24 * 60;
    } else {
      // 2) Check access_keys table
      const { data: accessKey } = await supabase
        .from("access_keys")
        .select("*")
        .eq("key_value", key)
        .maybeSingle();

      if (accessKey && accessKey.is_active) {
        if (accessKey.expires_at && new Date(accessKey.expires_at) < now) {
          return new Response(
            JSON.stringify({ valid: false, error: "Chave expirada" }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        valid = true;
        accessKeyId = accessKey.id;
        durationMinutes = accessKey.duration_minutes ?? 1440;
      }
    }

    if (!valid) {
      return new Response(
        JSON.stringify({ valid: false }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Reset rate limit on success
    await supabase.from("rate_limits").delete().eq("ip_address", clientIP);

    const sessionToken = generateSessionToken();
    const expiresAt = new Date(now.getTime() + durationMinutes * 60 * 1000);

    const { error: sessionError } = await supabase.from("auth_sessions").insert({
      session_token: sessionToken,
      expires_at: expiresAt.toISOString(),
      ip_address: clientIP,
      user_agent: userAgent,
      is_admin: isAdmin,
      access_key_id: accessKeyId,
    });

    if (sessionError) {
      console.error("Session error:", sessionError);
      return new Response(
        JSON.stringify({ valid: false, error: "Internal error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ valid: true, sessionToken, expiresAt: expiresAt.toISOString(), isAdmin }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ valid: false, error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
