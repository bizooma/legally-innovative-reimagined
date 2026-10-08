import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@/types/database';
import { usePortal } from '@/components/portal-shell/PortalLayout';
import { TodaySection } from '@/components/dashboard/TodaySection';
import { ClientDirectory } from '@/components/dashboard/ClientDirectory';
import { AdminGanttChartView } from '@/components/dashboard/AdminGanttChartView';
import { TimeTracker } from '@/components/dashboard/TimeTracker';
import { TimeTrackingSection } from '@/components/dashboard/TimeTrackingSection';
import { CrmDashboard } from '@/components/crm/CrmDashboard';
import { BudgetTrackingSection } from '@/components/budget/BudgetTrackingSection';
import { ProviderStatusManager } from '@/components/admin/ProviderStatusManager';
import { IncidentManager } from '@/components/admin/IncidentManager';
import { AuditCodeManager } from '@/components/admin/AuditCodeManager';
import { ChatbotConversations } from '@/components/dashboard/ChatbotConversations';
import { ChatbotTrainingManager } from '@/components/dashboard/ChatbotTrainingManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAllProjectsWithClients } from '@/hooks/useAllProjectsWithClients';

/** Clients list, fetched only by the views that need it (same query as useDashboard). */
function useClients() {
  const { user, clientsVersion } = usePortal();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('clients').select('*').order('date_added', { ascending: false });
      if (cancelled) return;
      if (error) {
        toast({ title: 'Error', description: 'Could not load client data: ' + (error.message || 'Unknown error'), variant: 'destructive' });
        setClients([]);
      } else setClients((data || []) as Client[]);
      setIsLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user, clientsVersion, toast]);
  return { clients, setClients, isLoading };
}

export const TodayView = () => <TodaySection hideHeading />;

export const ClientsView = () => {
  const { isAdmin } = usePortal();
  const { clients, setClients, isLoading } = useClients();
  const onAdded = (c: Client) => setClients((prev) => {
    const i = prev.findIndex((x) => x.id === c.id);
    if (i === -1) return [c, ...prev];
    const n = [...prev]; n[i] = c; return n;
  });
  return <ClientDirectory clients={clients} isLoading={isLoading} onClientAdded={onAdded} isAdmin={isAdmin} />;
};

export const ProjectsView = () => {
  const { projects, isLoading } = useAllProjectsWithClients();
  return <AdminGanttChartView projects={projects} isLoading={isLoading} />;
};

export const TimeView = () => {
  const { clients } = useClients();
  return (
    <div className="space-y-4">
      <TimeTracker clients={clients} />
      <TimeTrackingSection clients={clients} />
    </div>
  );
};

export const PipelineView = () => <CrmDashboard />;
export const BudgetView = () => <BudgetTrackingSection />;

export const StatusView = () => (
  <div className="space-y-6">
    <ProviderStatusManager />
    <IncidentManager />
  </div>
);

export const AuditCodesView = () => <AuditCodeManager />;

export const ChatbotView = () => (
  <Tabs defaultValue="conversations">
    <TabsList>
      <TabsTrigger value="conversations">Conversation History</TabsTrigger>
      <TabsTrigger value="training">Training & Knowledge</TabsTrigger>
    </TabsList>
    <TabsContent value="conversations"><ChatbotConversations /></TabsContent>
    <TabsContent value="training"><ChatbotTrainingManager /></TabsContent>
  </Tabs>
);

export { UsersView } from './UsersView';
