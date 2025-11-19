// Google Cloud status API
// API: https://status.cloud.google.com/incidents.json

export async function fetchGoogleCloudStatus(): Promise<{ status: string; summary: string }> {
  try {
    const response = await fetch('https://status.cloud.google.com/incidents.json', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StatusTicker/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const incidents = await response.json();
    
    // Check for currently active incidents
    if (Array.isArray(incidents) && incidents.length > 0) {
      const activeIncidents = incidents.filter((incident: any) => 
        incident.end === null || incident.currently_affected
      );
      
      if (activeIncidents.length > 0) {
        const firstIncident = activeIncidents[0];
        const isMajor = firstIncident.severity === 'high' || 
                       firstIncident.severity === 'medium';
        
        return {
          status: isMajor ? 'major_outage' : 'degraded',
          summary: firstIncident.external_desc || `${activeIncidents.length} active incidents`,
        };
      }
    }

    return {
      status: 'operational',
      summary: 'All Google Cloud services operational',
    };
  } catch (error) {
    console.error('Error fetching Google Cloud status:', error);
    return {
      status: 'unknown',
      summary: `Failed to fetch status: ${error.message}`,
    };
  }
}
