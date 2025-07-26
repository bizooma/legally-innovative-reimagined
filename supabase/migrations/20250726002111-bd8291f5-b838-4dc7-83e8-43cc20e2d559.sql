-- Enable RLS on documents table (it was disabled)
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.get_current_user_admin_status()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(is_admin, FALSE) FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create security definer function to get user's client_id
CREATE OR REPLACE FUNCTION public.get_current_user_client_id()
RETURNS UUID AS $$
  SELECT client_id FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Update clients table policies to use security definer functions
DROP POLICY IF EXISTS "Admins can access all clients" ON public.clients;
DROP POLICY IF EXISTS "Client contacts can only view their assigned client" ON public.clients;
DROP POLICY IF EXISTS "All authenticated users can view clients" ON public.clients;
DROP POLICY IF EXISTS "Only admins can manage clients" ON public.clients;

-- Create new policies using security definer functions
CREATE POLICY "Admins can access all clients" ON public.clients
FOR ALL USING (public.get_current_user_admin_status() = TRUE);

CREATE POLICY "Client users can only access their assigned client" ON public.clients
FOR SELECT USING (
  public.get_current_user_admin_status() = TRUE OR 
  id = public.get_current_user_client_id()
);

-- Update projects table policies  
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;
DROP POLICY IF EXISTS "Client contacts can only access projects for their client" ON public.projects;

CREATE POLICY "Admins can access all projects" ON public.projects
FOR ALL USING (public.get_current_user_admin_status() = TRUE);

CREATE POLICY "Client users can only access their client projects" ON public.projects
FOR ALL USING (
  public.get_current_user_admin_status() = TRUE OR
  client_id = public.get_current_user_client_id()
);

-- Update documents table policies
DROP POLICY IF EXISTS "Users can view documents for their clients" ON public.documents;
DROP POLICY IF EXISTS "Users can create documents" ON public.documents;
DROP POLICY IF EXISTS "Users can update documents" ON public.documents;
DROP POLICY IF EXISTS "Users can delete documents" ON public.documents;
DROP POLICY IF EXISTS "Authenticated users can view documents" ON public.documents;
DROP POLICY IF EXISTS "Authenticated users can update documents" ON public.documents;
DROP POLICY IF EXISTS "Authenticated users can delete documents" ON public.documents;
DROP POLICY IF EXISTS "Authenticated users can insert documents" ON public.documents;
DROP POLICY IF EXISTS "All authenticated users can view documents" ON public.documents;
DROP POLICY IF EXISTS "Only admins can manage documents" ON public.documents;

CREATE POLICY "Admins can access all documents" ON public.documents
FOR ALL USING (public.get_current_user_admin_status() = TRUE);

CREATE POLICY "Client users can only access their client documents" ON public.documents
FOR ALL USING (
  public.get_current_user_admin_status() = TRUE OR
  client_id = public.get_current_user_client_id()
);