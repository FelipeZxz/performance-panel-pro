import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { sessionToken, action, payload } = body ?? {};

    if (!sessionToken || typeof sessionToken !== "string" || sessionToken.length !== 64) {
      return json({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Validate admin session
    const { data: session, error: sErr } = await supabase
      .from("auth_sessions")
      .select("*")
      .eq("session_token", sessionToken)
      .maybeSingle();

    if (sErr || !session || !session.is_admin) {
      return json({ error: "Unauthorized" }, 401);
    }
    if (new Date(session.expires_at) < new Date()) {
      return json({ error: "Session expired" }, 401);
    }

    switch (action) {
      case "list": {
        const { data, error } = await supabase
          .from("access_keys")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) return json({ error: error.message }, 500);
        return json({ keys: data });
      }

      case "create": {
        const { key_value, label, duration_minutes, is_active, expires_at } = payload ?? {};
        if (!key_value || typeof key_value !== "string" || key_value.length < 3 || key_value.length > 100) {
          return json({ error: "Chave inválida (3-100 caracteres)" }, 400);
        }
        const { data, error } = await supabase
          .from("access_keys")
          .insert({
            key_value: key_value.trim(),
            label: label ?? null,
            duration_minutes: Number(duration_minutes) || 1440,
            is_active: is_active !== false,
            expires_at: expires_at ?? null,
          })
          .select()
          .single();
        if (error) {
          if (error.code === "23505") return json({ error: "Esta chave já existe" }, 400);
          return json({ error: error.message }, 500);
        }
        return json({ key: data });
      }

      case "update": {
        const { id, key_value, label, duration_minutes, is_active, expires_at } = payload ?? {};
        if (!id) return json({ error: "ID requerido" }, 400);
        const update: Record<string, unknown> = {};
        if (key_value !== undefined) update.key_value = String(key_value).trim();
        if (label !== undefined) update.label = label;
        if (duration_minutes !== undefined) update.duration_minutes = Number(duration_minutes);
        if (is_active !== undefined) update.is_active = !!is_active;
        if (expires_at !== undefined) update.expires_at = expires_at;
        const { data, error } = await supabase
          .from("access_keys")
          .update(update)
          .eq("id", id)
          .select()
          .single();
        if (error) {
          if (error.code === "23505") return json({ error: "Esta chave já existe" }, 400);
          return json({ error: error.message }, 500);
        }
        return json({ key: data });
      }

      case "delete": {
        const { id } = payload ?? {};
        if (!id) return json({ error: "ID requerido" }, 400);
        // Also kill any active sessions tied to this key
        await supabase.from("auth_sessions").delete().eq("access_key_id", id);
        const { error } = await supabase.from("access_keys").delete().eq("id", id);
        if (error) return json({ error: error.message }, 500);
        return json({ ok: true });
      }

      case "update_admin_key": {
        const { new_admin_key } = payload ?? {};
        if (!new_admin_key || typeof new_admin_key !== "string" || new_admin_key.length < 4 || new_admin_key.length > 100) {
          return json({ error: "Nova chave admin inválida (4-100 caracteres)" }, 400);
        }
        const { error } = await supabase
          .from("settings")
          .update({ admin_key: new_admin_key.trim() })
          .eq("id", "main");
        if (error) return json({ error: error.message }, 500);
        return json({ ok: true });
      }

      default:
        return json({ error: "Ação desconhecida" }, 400);
    }
  } catch (err) {
    console.error("admin-keys error:", err);
    return json({ error: "Invalid request" }, 400);
  }
});
