
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import ClientOverview from "./ClientOverview";
import ClientProjects from "./ClientProjects";
import ClientDocuments from "./ClientDocuments";
import ClientCommunication from "./ClientCommunication";
import ClientCampaigns from "./ClientCampaigns";
import ClientMarketingPlan from "./ClientMarketingPlan";
import { Client } from "@/types/database";

export type WorkspaceRole = 'admin' | 'client';

interface ClientDetailsTabsProps {
  client: Client;
  /** Decides what renders only. Access is enforced by RLS. Defaults to 'client' (fail closed). */
  role?: WorkspaceRole;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const ClientDetailsTabs = ({ client, role = "client", activeTab = "overview", onTabChange }: ClientDetailsTabsProps) => {
  const navigate = useNavigate();

  const handleValueChange = (value: string) => {
    if (value === 'communication') {
      // Navigate to the diagram page instead of showing a tab
      navigate(`/portal/client/${client.id}/diagram`);
      return;
    }
    
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <Tabs 
      defaultValue="overview" 
      value={activeTab}
      onValueChange={handleValueChange}
      className="w-full"
    >
      <div className="border-b">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger
            value="marketing-plan"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Marketing Plan
          </TabsTrigger>
          <TabsTrigger
            value="communication"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Diagram
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="overview" className="py-6">
        <ClientOverview client={client} role={role} />
      </TabsContent>
      <TabsContent value="projects" className="py-6">
        <ClientProjects clientId={client.id} role={role} />
      </TabsContent>
      <TabsContent value="campaigns" className="py-6">
        <ClientCampaigns clientId={client.id} role={role} />
      </TabsContent>
      <TabsContent value="documents" className="py-6">
        <ClientDocuments clientId={client.id} role={role} />
      </TabsContent>
      <TabsContent value="marketing-plan" className="py-6">
        <ClientMarketingPlan client={client} role={role} />
      </TabsContent>
    </Tabs>
  );
};

export default ClientDetailsTabs;
