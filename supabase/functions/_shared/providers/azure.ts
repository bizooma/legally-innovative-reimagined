// Azure uses a JSON feed
// API: https://azure.status.microsoft/en-us/status/feed/

export async function fetchAzureStatus(): Promise<{ status: string; summary: string }> {
  try {
    const response = await fetch('https://azure.status.microsoft/en-us/status/feed/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StatusTicker/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    
    // Azure feed returns an array of active issues
    if (data.value && Array.isArray(data.value) && data.value.length > 0) {
      const activeIssues = data.value.filter((issue: any) => 
        issue.status === 'active' || issue.isActive
      );
      
      if (activeIssues.length > 0) {
        const firstIssue = activeIssues[0];
        const isMajor = firstIssue.impactedServices?.some((s: any) => 
          s.impactLevel === 'Critical' || s.impactLevel === 'High'
        );
        
        return {
          status: isMajor ? 'major_outage' : 'degraded',
          summary: firstIssue.title || `${activeIssues.length} active issues`,
        };
      }
    }

    return {
      status: 'operational',
      summary: 'All Azure services operational',
    };
  } catch (error) {
    console.error('Error fetching Azure status:', error);
    return {
      status: 'unknown',
      summary: `Failed to fetch status: ${error.message}`,
    };
  }
}
