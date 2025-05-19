
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ExternalLink, FolderOpen, Link2, Unlink } from 'lucide-react';
import { connectGoogleDriveFolder, disconnectGoogleDriveFolder, getGoogleDriveFolderInfo, handleGoogleAuthCallback } from '@/services/googleDriveService';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

interface GoogleDriveConnectorProps {
  clientId: string;
  clientName: string;
  folderId?: string | null;
  onFolderConnected: (folderId: string) => void;
  onFolderDisconnected: () => void;
}

const GoogleDriveConnector: React.FC<GoogleDriveConnectorProps> = ({
  clientId,
  clientName,
  folderId,
  onFolderConnected,
  onFolderDisconnected
}) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const location = useLocation();

  // Check for OAuth callback parameters
  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Check if current path is the OAuth callback path
      if (location.pathname === '/auth/google/callback') {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
          toast({
            title: "Authentication Error",
            description: `Google authentication failed: ${error}`,
            variant: "destructive",
          });
          return;
        }

        if (code && state) {
          setIsConnecting(true);
          try {
            const success = await handleGoogleAuthCallback(code, state);
            if (success) {
              // Re-fetch client details or redirect to client page
              // For now we'll use sessionStorage to pass the folder ID
              const folderId = sessionStorage.getItem('new_folder_id');
              if (folderId) {
                onFolderConnected(folderId);
                sessionStorage.removeItem('new_folder_id');
              }
            }
          } finally {
            setIsConnecting(false);
          }
        }
      }
    };

    handleOAuthCallback();
  }, [location, toast, onFolderConnected]);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectGoogleDriveFolder(clientId);
      // Note: The actual connection happens after OAuth redirect
    } catch (error) {
      setIsConnecting(false);
      toast({
        title: "Error",
        description: "Failed to start Google Drive connection process.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const success = await disconnectGoogleDriveFolder(clientId);
      if (success) {
        onFolderDisconnected();
      }
    } finally {
      setIsDisconnecting(false);
    }
  };

  // If folder is connected, show folder info
  if (folderId) {
    const folderInfo = getGoogleDriveFolderInfo(folderId);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderOpen className="mr-2 h-5 w-5" />
            Connected Drive Folder
          </CardTitle>
          <CardDescription>
            Files for this client are stored in Google Drive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <Label>Folder Name</Label>
              <div className="flex items-center">
                <span className="text-sm font-medium">{folderInfo.name}</span>
              </div>
            </div>
            <div>
              <Label>Folder ID</Label>
              <div className="flex items-center">
                <code className="text-xs bg-gray-100 p-1 rounded">{folderInfo.id}</code>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => window.open(folderInfo.webViewLink, '_blank')}
            className="flex items-center"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in Drive
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className="flex items-center"
          >
            <Unlink className="mr-2 h-4 w-4" />
            {isDisconnecting ? "Disconnecting..." : "Disconnect Folder"}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // If no folder is connected yet, show connection form
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Google Drive</CardTitle>
        <CardDescription>
          Connect a Google Drive folder to store client files
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          Clicking "Connect Drive Folder" will redirect you to Google to authorize access. 
          A folder will be created for this client's files.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConnect}
          disabled={isConnecting}
          className="flex items-center"
        >
          <Link2 className="mr-2 h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Drive Folder"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoogleDriveConnector;
