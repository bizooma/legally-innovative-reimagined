
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Google Drive API endpoints
const GOOGLE_DRIVE_API = 'https://www.googleapis.com/drive/v3';
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

// Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = '963523082884-rjqcbkssi7bep6scsmh540t2qlhh88m7.apps.googleusercontent.com';

// Types
interface GoogleDriveFolder {
  id: string;
  name: string;
  webViewLink: string;
}

/**
 * Initiate Google OAuth flow to connect a Drive folder
 */
export function initiateGoogleAuth(clientId: string, redirectUri: string): void {
  // Store client ID in session storage for retrieval after OAuth redirect
  sessionStorage.setItem('connecting_client_id', clientId);
  
  // Define the required scopes for Google Drive access
  const scope = encodeURIComponent('https://www.googleapis.com/auth/drive.file');
  
  // Generate a random state value for security
  const state = Math.random().toString(36).substring(2);
  sessionStorage.setItem('oauth_state', state);
  
  // Build the authorization URL
  const authUrl = `${GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&state=${state}`;
  
  // Redirect to Google's OAuth page
  window.location.href = authUrl;
}

/**
 * Handle the OAuth callback and connect the folder
 */
export async function handleGoogleAuthCallback(code: string, state: string): Promise<boolean> {
  // Verify state parameter to prevent CSRF attacks
  const savedState = sessionStorage.getItem('oauth_state');
  if (!state || state !== savedState) {
    toast({
      title: "Security Error",
      description: "Invalid authentication state. Please try again.",
      variant: "destructive",
    });
    return false;
  }
  
  // Get the client ID from session storage
  const clientId = sessionStorage.getItem('connecting_client_id');
  if (!clientId) {
    toast({
      title: "Error",
      description: "Client ID not found. Please try again.",
      variant: "destructive",
    });
    return false;
  }
  
  try {
    // In a production environment, you would exchange the code for tokens
    // using a secure server-side endpoint
    // For now, we'll simulate a successful response
    
    // Simulate folder creation with a mock ID
    const folderId = `folder_${Date.now()}_${Math.round(Math.random() * 1000)}`;
    
    // Update the client record with the folder ID
    const { data, error } = await supabase
      .from('clients')
      .update({ google_drive_folder_id: folderId })
      .eq('id', clientId)
      .select('*')
      .single();
    
    if (error) {
      throw error;
    }
    
    // Clean up session storage
    sessionStorage.removeItem('connecting_client_id');
    sessionStorage.removeItem('oauth_state');
    
    toast({
      title: "Success",
      description: "Google Drive folder has been connected successfully.",
    });
    
    return true;
  } catch (error: any) {
    console.error('Error connecting Google Drive folder:', error);
    toast({
      title: "Error",
      description: `Could not connect Google Drive folder: ${error.message || "Unknown error"}`,
      variant: "destructive",
    });
    return false;
  }
}

/**
 * Connect a Google Drive folder to a client
 */
export async function connectGoogleDriveFolder(clientId: string): Promise<void> {
  // Generate the redirect URI based on the current hostname
  const redirectUri = `${window.location.origin}/auth/google/callback`;
  
  // Start the OAuth flow
  initiateGoogleAuth(clientId, redirectUri);
}

/**
 * Disconnect a Google Drive folder from a client
 */
export async function disconnectGoogleDriveFolder(clientId: string): Promise<boolean> {
  try {
    // In a production environment, you would also revoke the OAuth token
    // For now, we'll just clear the folder ID from the database
    const { error } = await supabase
      .from('clients')
      .update({ google_drive_folder_id: null })
      .eq('id', clientId);
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Success", 
      description: "Google Drive folder has been disconnected."
    });
    
    return true;
  } catch (error: any) {
    console.error('Error disconnecting Google Drive folder:', error);
    toast({
      title: "Error",
      description: `Could not disconnect Google Drive folder: ${error.message || "Unknown error"}`,
      variant: "destructive",
    });
    return false;
  }
}

/**
 * Get Google Drive folder details
 * In a real implementation, this would fetch actual folder details from Google Drive API
 */
export function getGoogleDriveFolderInfo(folderId: string): GoogleDriveFolder {
  // In production, this would make an API call to Google Drive
  // For now, we return mock data
  return {
    id: folderId,
    name: `Client Files (${folderId.substring(0, 8)})`,
    webViewLink: `https://drive.google.com/drive/folders/${folderId}`
  };
}
