import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchRenderStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://status.render.com/api/v2/status.json');
}
