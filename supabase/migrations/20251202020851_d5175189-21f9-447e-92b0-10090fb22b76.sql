-- Create settings table for storing the panel password
CREATE TABLE public.settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  password TEXT NOT NULL DEFAULT 'naxx123',
  admin_key TEXT NOT NULL DEFAULT 'admin2024',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the password (for login check)
CREATE POLICY "Anyone can read settings" 
ON public.settings 
FOR SELECT 
USING (true);

-- Only allow update with admin key (handled in code)
CREATE POLICY "Anyone can update settings" 
ON public.settings 
FOR UPDATE 
USING (true);

-- Insert default settings
INSERT INTO public.settings (id, password, admin_key) VALUES ('main', 'naxx123', 'admin2024');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_settings_updated_at();