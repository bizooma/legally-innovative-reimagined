import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchLinodeStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://status.linode.com/api/v2/status.json');
}
