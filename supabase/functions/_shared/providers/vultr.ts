import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchVultrStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://status.vultr.com/api/v2/status.json');
}
