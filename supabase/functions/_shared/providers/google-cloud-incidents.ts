export async function fetchGoogleCloudIncidents() {
  try {
    const response = await fetch('https://status.cloud.google.com/incidents.json');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const incidents = await response.json();
    
    return incidents.map((incident: any) => ({
      incident_id: incident.id || `gcp-${incident.number}`,
      incident_type: incident.severity === 'high' ? 'outage' : 'degradation',
      severity: incident.severity === 'high' ? 'major' : 'minor',
      title: incident.external_desc || incident.most_recent_update?.text || 'Google Cloud Incident',
      description: incident.most_recent_update?.text?.substring(0, 500),
      started_at: incident.begin || new Date().toISOString(),
      resolved_at: incident.end || null,
      affected_services: incident.service_name ? [incident.service_name] : null,
      status: incident.end ? 'resolved' : 'monitoring',
    }));
  } catch (error) {
    console.error(`Error fetching Google Cloud incidents: ${error.message}`);
    return [];
  }
}
