// AWS uses a custom RSS feed format
// API: https://status.aws.amazon.com/rss/all.rss

export async function fetchAwsStatus(): Promise<{ status: string; summary: string }> {
  try {
    const response = await fetch('https://status.aws.amazon.com/rss/all.rss', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StatusTicker/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    
    // Check for recent service issues in RSS feed
    const hasIssues = text.includes('<item>') && 
                      (text.toLowerCase().includes('issue') || 
                       text.toLowerCase().includes('degraded') ||
                       text.toLowerCase().includes('outage'));
    
    if (hasIssues) {
      // Parse the most recent item title for summary
      const titleMatch = text.match(/<title>(.*?)<\/title>/i);
      const summary = titleMatch && titleMatch[1] ? titleMatch[1].substring(0, 100) : 'Service issues detected';
      
      return {
        status: text.toLowerCase().includes('outage') ? 'major_outage' : 'degraded',
        summary,
      };
    }

    return {
      status: 'operational',
      summary: 'All AWS services operational',
    };
  } catch (error) {
    console.error('Error fetching AWS status:', error);
    return {
      status: 'unknown',
      summary: `Failed to fetch status: ${error.message}`,
    };
  }
}
