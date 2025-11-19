import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchGitHubStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://www.githubstatus.com/api/v2/status.json');
}
