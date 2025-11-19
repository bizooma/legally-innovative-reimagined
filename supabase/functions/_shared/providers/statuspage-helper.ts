// Helper function for parsing Statuspage.io API responses
// Most providers (Cloudflare, GitHub, Vercel, etc.) use this format

interface StatuspageResponse {
  status: {
    indicator: 'none' | 'minor' | 'major' | 'critical';
    description: string;
  };
}

export async function fetchStatuspageStatus(
  url: string
): Promise<{ status: string; summary: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StatusTicker/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: StatuspageResponse = await response.json();
    
    // Map Statuspage indicators to our status format
    let status: string;
    switch (data.status.indicator) {
      case 'none':
        status = 'operational';
        break;
      case 'minor':
        status = 'degraded';
        break;
      case 'major':
      case 'critical':
        status = 'major_outage';
        break;
      default:
        status = 'unknown';
    }

    return {
      status,
      summary: data.status.description || 'Status information available',
    };
  } catch (error) {
    console.error('Error fetching Statuspage status:', error);
    return {
      status: 'unknown',
      summary: `Failed to fetch status: ${error.message}`,
    };
  }
}
