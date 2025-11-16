import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus } from 'lucide-react';
import { CrmPipelineStats } from './CrmPipelineStats';
import { CrmKanbanView } from './CrmKanbanView';
import { CrmTableView } from './CrmTableView';
import { CrmProposalsView } from './CrmProposalsView';
import { Lead, Proposal } from '@/types/crm';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const CrmDashboard: React.FC = () => {
  const [isCrmOpen, setIsCrmOpen] = useState(true);
  const [selectedView, setSelectedView] = useState('kanban');

  // Fetch leads
  const { data: leads = [], isLoading: isLoadingLeads } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Lead[];
    },
  });

  // Fetch proposals
  const { data: proposals = [], isLoading: isLoadingProposals } = useQuery({
    queryKey: ['proposals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Proposal[];
    },
  });

  const handleLeadClick = (lead: Lead) => {
    console.log('Lead clicked:', lead);
    // TODO: Open lead detail dialog
  };

  const handleProposalClick = (proposal: Proposal) => {
    console.log('Proposal clicked:', proposal);
    // TODO: Open proposal detail dialog
  };

  const handleAddLead = () => {
    console.log('Add lead clicked');
    // TODO: Open add lead dialog
  };

  if (isLoadingLeads || isLoadingProposals) {
    return (
      <div className="mb-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Collapsible open={isCrmOpen} onOpenChange={setIsCrmOpen} className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-playfair font-bold">CRM Pipeline</h2>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddLead} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              {isCrmOpen ? 'Collapse' : 'Expand'}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isCrmOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent>
        {/* Pipeline Stats Cards */}
        <CrmPipelineStats leads={leads} proposals={proposals} />

        {/* Tab Navigation */}
        <Tabs value={selectedView} onValueChange={setSelectedView}>
          <TabsList className="mb-4">
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="mt-0">
            <CrmKanbanView leads={leads} onLeadClick={handleLeadClick} />
          </TabsContent>

          <TabsContent value="table" className="mt-0">
            <CrmTableView leads={leads} onLeadClick={handleLeadClick} />
          </TabsContent>

          <TabsContent value="proposals" className="mt-0">
            <CrmProposalsView
              proposals={proposals}
              onProposalClick={handleProposalClick}
            />
          </TabsContent>
        </Tabs>
      </CollapsibleContent>
    </Collapsible>
  );
};
