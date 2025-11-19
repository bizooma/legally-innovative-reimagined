import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchGitLabStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://status.gitlab.com/api/v2/status.json');
}
