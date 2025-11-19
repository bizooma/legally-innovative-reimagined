import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchFlyIoStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://status.flyio.net/api/v2/status.json');
}
