
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ExternalLink, FolderOpen, Link2, Unlink } from 'lucide-react';
import { connectGoogleDriveFolder, disconnectGoogleDriveFolder, getGoogleDriveFolderInfo } from '@/services/googleDriveService';
import { useToast } from '@/hooks/use-toast';

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
  const [folderInfo, setFolderInfo] = useState<{ name: string, id: string, webViewLink: string } | null>(null);
  const [isFolderLoading, setIsFolderLoading] = useState(false);

  // Fetch folder info when folderId changes
  useEffect(() => {
    const fetchFolderInfo = async () => {
      if (folderId) {
        setIsFolderLoading(true);
        try {
          const info = await getGoogleDriveFolderInfo(folderId);
          setFolderInfo(info);
        } catch (error) {
          console.error('Error fetching folder info:', error);
          toast({
            title: "Error",
            description: "Could not load folder information",
            variant: "destructive",
          });
        } finally {
          setIsFolderLoading(false);
        }
      } else {
        setFolderInfo(null);
      }
    };

    fetchFolderInfo();
  }, [folderId, toast]);

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
          {isFolderLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : folderInfo ? (
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
          ) : (
            <div className="text-yellow-600 text-sm">
              Folder information could not be loaded
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => folderInfo && window.open(folderInfo.webViewLink, '_blank')}
            className="flex items-center"
            disabled={!folderInfo}
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
          A folder will be created for this client's files in your Google Drive.
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
