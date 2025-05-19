
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Client } from '@/types/database';
import { useClientDocumentCount } from '@/hooks/useClientDocumentCount';
import { useClientProjectsWithDates } from '@/hooks/useClientProjectsWithDates';
import ClientGanttChart from './ClientGanttChart';
import GoogleDriveConnector from './GoogleDriveConnector';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ClientOverviewProps {
  client: Client;
}

const ClientOverview: React.FC<ClientOverviewProps> = ({ client: initialClient }) => {
  const [client, setClient] = useState(initialClient);
  const { documentCount, isLoading: isLoadingDocuments } = useClientDocumentCount(client.id);
  const { projects, isLoading: isLoadingProjects } = useClientProjectsWithDates(client.id);

  // Handler for when a Google Drive folder is connected or disconnected
  const handleFolderConnected = (folderId: string) => {
    setClient({ ...client, google_drive_folder_id: folderId });
  };

  const handleFolderDisconnected = () => {
    setClient({ ...client, google_drive_folder_id: null });
  };

  return (
    <div className="space-y-6">
      {/* Gantt Chart - Added at the top */}
      <ClientGanttChart 
        projects={projects} 
        isLoading={isLoadingProjects} 
      />

      {/* Google Drive Connector */}
      <GoogleDriveConnector 
        clientId={client.id}
        clientName={client.company_name}
        folderId={client.google_drive_folder_id}
        onFolderConnected={handleFolderConnected}
        onFolderDisconnected={handleFolderDisconnected}
      />

      {/* Account Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="font-medium text-gray-700 mb-1">Projects</h3>
                <p className="text-2xl font-bold">{isLoadingProjects ? "..." : projects.length}</p>
                <p className="text-sm text-gray-500">
                  {projects.length === 0 ? "No active projects" :
                   projects.length === 1 ? "1 active project" :
                   `${projects.length} active projects`}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="font-medium text-gray-700 mb-1">Documents</h3>
                <p className="text-2xl font-bold">
                  {isLoadingDocuments ? "..." : documentCount}
                </p>
                <p className="text-sm text-gray-500">
                  {documentCount === 0 ? "No documents" : 
                   documentCount === 1 ? "1 document uploaded" : 
                   `${documentCount} documents uploaded`}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="font-medium text-gray-700 mb-1">Messages</h3>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">No messages yet</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">Contact Name</p>
                <p>{client.contact_name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Email</p>
                <p>{client.contact_email}</p>
              </div>
              {client.contact_phone && (
                <div>
                  <p className="font-medium text-gray-700">Phone</p>
                  <p>{client.contact_phone}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">Client ID</p>
                <p className="text-sm font-mono">{client.id}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Date Added</p>
                <p>{new Date(client.date_added).toLocaleDateString()}</p>
              </div>
              {client.notes && (
                <div>
                  <p className="font-medium text-gray-700">Notes</p>
                  <p className="whitespace-pre-wrap">{client.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientOverview;
