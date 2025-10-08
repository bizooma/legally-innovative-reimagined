-- Fix search_path security warning by recreating the function properly
DROP TRIGGER IF EXISTS update_project_tasks_updated_at_trigger ON public.project_tasks;
DROP FUNCTION IF EXISTS update_project_tasks_updated_at();

CREATE OR REPLACE FUNCTION update_project_tasks_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_project_tasks_updated_at_trigger
  BEFORE UPDATE ON public.project_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_project_tasks_updated_at();