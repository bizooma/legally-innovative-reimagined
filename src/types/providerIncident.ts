export interface ProviderIncident {
  id: string;
  provider_id: string;
  incident_id: string;
  incident_type: 'outage' | 'degradation' | 'maintenance';
  severity: 'minor' | 'major' | 'critical';
  title: string;
  description: string | null;
  started_at: string;
  resolved_at: string | null;
  duration_minutes: number | null;
  affected_services: string[] | null;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  created_at: string;
  updated_at: string;
}
