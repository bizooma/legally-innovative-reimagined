import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchDigitalOceanStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://status.digitalocean.com/api/v2/status.json');
}
