
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MessageSquare } from 'lucide-react';

const ClientCampaigns = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Marketing Campaigns</h2>
        <Button className="flex items-center gap-1">
          <PlusCircle className="w-4 h-4" />
          <span>New Campaign</span>
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Active Campaigns</CardTitle>
          <CardDescription>
            Currently running marketing initiatives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No active campaigns</h3>
            <p className="text-muted-foreground max-w-sm">
              No marketing campaigns have been created yet. Click the "New Campaign" 
              button above to create your first marketing campaign.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Past Campaigns</CardTitle>
          <CardDescription>
            Previously completed marketing campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No past campaigns</h3>
            <p className="text-muted-foreground max-w-sm">
              There are no completed campaigns to display.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientCampaigns;
