import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Google Drive API endpoints
const GOOGLE_DRIVE_API = 'https://www.googleapis.com/drive/v3';
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';

// Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = '963523082884-rjqcbkssi7bep6scsmh540t2qlhh88m7.apps.googleusercontent.com';
// IMPORTANT: The client secret should never be included in client-side code
// This must be handled by a secure backend service (Supabase Edge Function)

// Define the production redirect URI
const PROD_REDIRECT_URI = 'https://legallyinnovative.com/auth/google/callback';

// Types
interface GoogleDriveFolder {
  id: string;
  name: string;
  webViewLink: string;
}

/**
 * Initiate Google OAuth flow to connect a Drive folder
 */
export function initiateGoogleAuth(clientId: string, redirectUri?: string): void {
  // Store client ID in session storage for retrieval after OAuth redirect
  sessionStorage.setItem('connecting_client_id', clientId);
  
  // Define the required scopes for Google Drive access
  const scope = encodeURIComponent('https://www.googleapis.com/auth/drive.file');
  
  // Generate a random state value for security
  const state = Math.random().toString(36).substring(2);
  sessionStorage.setItem('oauth_state', state);
  
  // Use the production redirect URI by default
  const finalRedirectUri = redirectUri || PROD_REDIRECT_URI;
  
  // Build the authorization URL
  const authUrl = `${GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(finalRedirectUri)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&state=${state}`;
  
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
    // This should be handled by a Supabase Edge Function in production
    // Call the token exchange Edge Function
    const { data: tokenData, error: tokenError } = await supabase.functions.invoke('exchange-google-token', {
      body: { 
        code, 
        redirectUri: PROD_REDIRECT_URI 
      }
    });
    
    if (tokenError) {
      throw new Error(`Token exchange failed: ${tokenError.message}`);
    }
    
    // Store the folder ID from the response
    const folderId = tokenData?.folderId;
    
    if (!folderId) {
      throw new Error('No folder ID returned from token exchange');
    }
    
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
  // Start the OAuth flow with the production redirect URI
  initiateGoogleAuth(clientId, PROD_REDIRECT_URI);
}

/**
 * Disconnect a Google Drive folder from a client
 */
export async function disconnectGoogleDriveFolder(clientId: string): Promise<boolean> {
  try {
    // In production, you would also call an Edge Function to revoke the OAuth token
    const { data: revokeData, error: revokeError } = await supabase.functions.invoke('revoke-google-token', {
      body: { clientId }
    });
    
    if (revokeError) {
      console.warn('Error revoking Google token:', revokeError);
      // Continue with disconnecting the folder even if token revocation fails
    }
    
    // Clear the folder ID from the database
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
 * In production, this would fetch actual folder details from Google Drive API
 */
export async function getGoogleDriveFolderInfo(folderId: string): Promise<GoogleDriveFolder> {
  try {
    // In production, call an Edge Function to get folder details securely
    const { data, error } = await supabase.functions.invoke('get-google-drive-folder', {
      body: { folderId }
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching Google Drive folder info:', error);
    // Fallback to a mock response if the API call fails
    return {
      id: folderId,
      name: `Client Files (${folderId.substring(0, 8)})`,
      webViewLink: `https://drive.google.com/drive/folders/${folderId}`
    };
  }
}
