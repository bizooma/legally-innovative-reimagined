-- Fix search path security warnings
CREATE OR REPLACE FUNCTION public.get_current_user_admin_status()
RETURNS BOOLEAN 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
SET search_path = 'public'
AS $$
  SELECT COALESCE(is_admin, FALSE) FROM public.users WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_client_id()
RETURNS UUID 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
SET search_path = 'public'
AS $$
  SELECT client_id FROM public.users WHERE id = auth.uid();
$$;