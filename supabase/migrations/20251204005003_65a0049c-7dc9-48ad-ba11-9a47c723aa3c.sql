-- Create auth_sessions table for server-side session management
CREATE TABLE public.auth_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address TEXT,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE public.auth_sessions ENABLE ROW LEVEL SECURITY;

-- Restrictive policy - only service role can access
CREATE POLICY "Service role only" ON public.auth_sessions
FOR ALL USING (false) WITH CHECK (false);

-- Create rate_limits table for tracking authentication attempts
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  first_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  locked_until TIMESTAMP WITH TIME ZONE,
  UNIQUE(ip_address)
);

-- Enable Row Level Security
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Restrictive policy - only service role can access
CREATE POLICY "Service role only" ON public.rate_limits
FOR ALL USING (false) WITH CHECK (false);

-- Create index for faster lookups
CREATE INDEX idx_auth_sessions_token ON public.auth_sessions(session_token);
CREATE INDEX idx_auth_sessions_expires ON public.auth_sessions(expires_at);
CREATE INDEX idx_rate_limits_ip ON public.rate_limits(ip_address);

-- Create function to clean expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.auth_sessions WHERE expires_at < now();
  DELETE FROM public.rate_limits WHERE first_attempt_at < now() - interval '1 hour';
END;
$$;