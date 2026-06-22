
CREATE TABLE public.access_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_value text NOT NULL UNIQUE,
  label text,
  duration_minutes integer NOT NULL DEFAULT 1440,
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.access_keys TO service_role;

ALTER TABLE public.access_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only access" ON public.access_keys
  FOR ALL USING (false) WITH CHECK (false);

CREATE TRIGGER update_access_keys_updated_at
  BEFORE UPDATE ON public.access_keys
  FOR EACH ROW EXECUTE FUNCTION public.update_settings_updated_at();

ALTER TABLE public.auth_sessions
  ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS access_key_id uuid REFERENCES public.access_keys(id) ON DELETE CASCADE;

INSERT INTO public.access_keys (key_value, label, duration_minutes, is_active)
VALUES ('naxx123', 'Chave inicial', 1440, true)
ON CONFLICT (key_value) DO NOTHING;
