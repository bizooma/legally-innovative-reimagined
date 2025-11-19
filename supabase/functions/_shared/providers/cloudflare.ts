import { fetchStatuspageStatus } from './statuspage-helper.ts';

export async function fetchCloudflareStatus(): Promise<{ status: string; summary: string }> {
  return fetchStatuspageStatus('https://www.cloudflarestatus.com/api/v2/status.json');
}
