
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientOverview from "./ClientOverview";
import ClientProjects from "./ClientProjects";
import ClientDocuments from "./ClientDocuments";
import ClientCommunication from "./ClientCommunication";
import ClientCampaigns from "./ClientCampaigns";
import { Client } from "@/types/database";

interface ClientDetailsTabsProps {
  client: Client;
}

const ClientDetailsTabs = ({ client }: ClientDetailsTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
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
            value="communication"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Communication
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="overview" className="py-6">
        <ClientOverview client={client} />
      </TabsContent>
      <TabsContent value="projects" className="py-6">
        <ClientProjects client={client} />
      </TabsContent>
      <TabsContent value="campaigns" className="py-6">
        <ClientCampaigns />
      </TabsContent>
      <TabsContent value="documents" className="py-6">
        <ClientDocuments client={client} />
      </TabsContent>
      <TabsContent value="communication" className="py-6">
        <ClientCommunication client={client} />
      </TabsContent>
    </Tabs>
  );
};

export default ClientDetailsTabs;
