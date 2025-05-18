
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientProjects from '@/components/client-workspace/ClientProjects';
import ClientDocuments from '@/components/client-workspace/ClientDocuments';
import ClientCommunication from '@/components/client-workspace/ClientCommunication';
import ClientOverview from '@/components/client-workspace/ClientOverview';
import { Client } from '@/types/database';

interface ClientDetailsTabsProps {
  client: Client;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ClientDetailsTabs: React.FC<ClientDetailsTabsProps> = ({ 
  client, 
  activeTab,
  onTabChange 
}) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="communication">Communication</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <ClientOverview client={client} />
      </TabsContent>
      
      <TabsContent value="projects">
        <ClientProjects clientId={client.id} />
      </TabsContent>
      
      <TabsContent value="documents">
        <ClientDocuments clientId={client.id} />
      </TabsContent>
      
      <TabsContent value="communication">
        <ClientCommunication clientId={client.id} clientName={client.company_name} />
      </TabsContent>
    </Tabs>
  );
};

export default ClientDetailsTabs;
