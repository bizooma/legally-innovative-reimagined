
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const [folderName, setFolderName] = useState(`${clientName} Files`);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const newFolderId = await connectGoogleDriveFolder(clientId, folderName);
      if (newFolderId) {
        toast({
          title: "Folder Connected",
          description: "Google Drive folder has been connected successfully.",
        });
        onFolderConnected(newFolderId);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const success = await disconnectGoogleDriveFolder(clientId);
      if (success) {
        toast({
          title: "Folder Disconnected",
          description: "Google Drive folder has been disconnected.",
        });
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
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="folder-name">Folder Name</Label>
          <Input 
            id="folder-name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Enter folder name"
          />
          <p className="text-sm text-gray-500">
            A folder with this name will be created in Google Drive
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConnect}
          disabled={isConnecting || !folderName.trim()}
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
