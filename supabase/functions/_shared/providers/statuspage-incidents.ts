export interface StatuspageIncident {
  id: string;
  name: string;
  status: string;
  impact: string;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  shortlink: string;
  incident_updates: Array<{
    body: string;
    status: string;
    created_at: string;
  }>;
  components: Array<{
    name: string;
    status: string;
  }>;
}

export async function fetchStatuspageIncidents(apiUrl: string): Promise<StatuspageIncident[]> {
  try {
    // Extract base URL and construct incidents endpoint
    const baseUrl = apiUrl.replace('/status.json', '');
    const incidentsUrl = `${baseUrl}/incidents.json`;
    
    console.log(`Fetching incidents from: ${incidentsUrl}`);
    
    const response = await fetch(incidentsUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.incidents || [];
  } catch (error) {
    console.error(`Error fetching Statuspage incidents: ${error.message}`);
    throw error;
  }
}

export function mapStatuspageIncidentToDb(incident: StatuspageIncident) {
  // Map Statuspage impact to our severity
  const severityMap: Record<string, string> = {
    none: 'minor',
    minor: 'minor',
    major: 'major',
    critical: 'critical',
  };

  // Map Statuspage status to our status
  const statusMap: Record<string, string> = {
    investigating: 'investigating',
    identified: 'identified',
    monitoring: 'monitoring',
    resolved: 'resolved',
    postmortem: 'resolved',
  };

  // Determine incident type
  let incidentType = 'outage';
  if (incident.name.toLowerCase().includes('maintenance')) {
    incidentType = 'maintenance';
  } else if (incident.impact === 'minor' || incident.impact === 'none') {
    incidentType = 'degradation';
  }

  // Get affected services from components
  const affectedServices = incident.components?.map(c => c.name) || [];

  // Get latest update body as description
  const description = incident.incident_updates?.[0]?.body || incident.name;

  return {
    incident_id: incident.id,
    incident_type: incidentType,
    severity: severityMap[incident.impact] || 'minor',
    title: incident.name,
    description: description.substring(0, 500), // Limit length
    started_at: incident.created_at,
    resolved_at: incident.resolved_at,
    affected_services: affectedServices.length > 0 ? affectedServices : null,
    status: statusMap[incident.status] || 'investigating',
  };
}
