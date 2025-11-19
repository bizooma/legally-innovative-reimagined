import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchVercelStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://www.vercel-status.com/api/v2/status.json');
}
