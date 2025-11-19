import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchNetlifyStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://www.netlifystatus.com/api/v2/status.json');
}
