export async function fetchAWSIncidents() {
  try {
    // AWS RSS feed doesn't provide good incident history
    // For now, return empty array - could be enhanced to parse RSS feed
    console.log('AWS incident fetching not yet implemented');
    return [];
  } catch (error) {
    console.error(`Error fetching AWS incidents: ${error.message}`);
    return [];
  }
}
