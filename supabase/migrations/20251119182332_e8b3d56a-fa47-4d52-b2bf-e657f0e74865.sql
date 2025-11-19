-- Create table for provider incident history
CREATE TABLE IF NOT EXISTS provider_incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES provider_status_configs(id) ON DELETE CASCADE,
  incident_id text NOT NULL,
  incident_type text NOT NULL CHECK (incident_type IN ('outage', 'degradation', 'maintenance')),
  severity text NOT NULL CHECK (severity IN ('minor', 'major', 'critical')),
  title text NOT NULL,
  description text,
  started_at timestamp with time zone NOT NULL,
  resolved_at timestamp with time zone,
  duration_minutes integer,
  affected_services text[],
  status text NOT NULL DEFAULT 'investigating' CHECK (status IN ('investigating', 'identified', 'monitoring', 'resolved')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(provider_id, incident_id)
);

-- Enable RLS
ALTER TABLE provider_incidents ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view provider incidents"
  ON provider_incidents
  FOR SELECT
  USING (true);

-- Create policy for service role to manage incidents
CREATE POLICY "Service role can manage incidents"
  ON provider_incidents
  FOR ALL
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_provider_incidents_provider_id ON provider_incidents(provider_id);
CREATE INDEX idx_provider_incidents_started_at ON provider_incidents(started_at DESC);
CREATE INDEX idx_provider_incidents_status ON provider_incidents(status);

-- Create function to update duration when incident is resolved
CREATE OR REPLACE FUNCTION update_incident_duration()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.resolved_at IS NOT NULL AND OLD.resolved_at IS NULL THEN
    NEW.duration_minutes := EXTRACT(EPOCH FROM (NEW.resolved_at - NEW.started_at)) / 60;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic duration calculation
CREATE TRIGGER update_incident_duration_trigger
  BEFORE UPDATE ON provider_incidents
  FOR EACH ROW
  EXECUTE FUNCTION update_incident_duration();