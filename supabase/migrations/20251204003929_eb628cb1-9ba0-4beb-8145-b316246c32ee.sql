-- Remove public read access to settings table passwords
-- Drop the existing permissive policies
DROP POLICY IF EXISTS "Anyone can read settings" ON public.settings;
DROP POLICY IF EXISTS "Anyone can update settings" ON public.settings;

-- Create restrictive policy - only service role can access (via Edge Functions)
-- No public access to passwords
CREATE POLICY "Service role only access"
ON public.settings
FOR ALL
USING (false)
WITH CHECK (false);