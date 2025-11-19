export async function fetchAzureIncidents() {
  try {
    // Azure incidents could be parsed from their RSS feed
    // For now, return empty array
    console.log('Azure incident fetching not yet implemented');
    return [];
  } catch (error) {
    console.error(`Error fetching Azure incidents: ${error.message}`);
    return [];
  }
}
