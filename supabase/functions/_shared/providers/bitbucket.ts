import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchBitbucketStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://bitbucket.status.atlassian.com/api/v2/status.json');
}
