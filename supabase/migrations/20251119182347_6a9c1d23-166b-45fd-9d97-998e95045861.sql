-- Fix search path for the incident duration function
CREATE OR REPLACE FUNCTION update_incident_duration()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.resolved_at IS NOT NULL AND OLD.resolved_at IS NULL THEN
    NEW.duration_minutes := EXTRACT(EPOCH FROM (NEW.resolved_at - NEW.started_at)) / 60;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;