
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientOverview from "./ClientOverview";
import ClientProjects from "./ClientProjects";
import ClientDocuments from "./ClientDocuments";
import ClientCommunication from "./ClientCommunication";
import ClientCampaigns from "./ClientCampaigns";
import ClientSocialPosts from "./ClientSocialPosts";
import { Client } from "@/types/database";

interface ClientDetailsTabsProps {
  client: Client;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const ClientDetailsTabs = ({ client, activeTab = "overview", onTabChange }: ClientDetailsTabsProps) => {
  const handleValueChange = (value: string) => {
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
            value="socialposts"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Social Posts
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Documents
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
        <ClientOverview client={client} />
      </TabsContent>
      <TabsContent value="projects" className="py-6">
        <ClientProjects clientId={client.id} />
      </TabsContent>
      <TabsContent value="campaigns" className="py-6">
        <ClientCampaigns clientId={client.id} />
      </TabsContent>
      <TabsContent value="socialposts" className="py-6">
        <ClientSocialPosts clientId={client.id} />
      </TabsContent>
      <TabsContent value="documents" className="py-6">
        <ClientDocuments clientId={client.id} />
      </TabsContent>
      <TabsContent value="communication" className="py-6">
        <ClientCommunication clientId={client.id} clientName={client.company_name} />
      </TabsContent>
    </Tabs>
  );
};

export default ClientDetailsTabs;
