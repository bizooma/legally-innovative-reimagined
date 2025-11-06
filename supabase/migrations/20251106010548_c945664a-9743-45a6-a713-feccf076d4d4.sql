-- Create a function to allow admins to delete clients
CREATE OR REPLACE FUNCTION public.delete_client(client_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Check if the current user is an admin
  IF NOT get_current_user_admin_status() THEN
    RAISE EXCEPTION 'Only admins can delete clients';
  END IF;
  
  -- Delete the client
  DELETE FROM public.clients WHERE id = client_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in delete_client: %', SQLERRM;
    RETURN FALSE;
END;
$$;