
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StatCard } from '@/components/dashboard/StatCard';
import { ClientDirectory } from '@/components/dashboard/ClientDirectory';
import { AdminHeader } from '@/components/dashboard/AdminHeader';
import { TimeTrackingSection } from '@/components/dashboard/TimeTrackingSection';
import { TimeTracker } from '@/components/dashboard/TimeTracker';
import { useDashboard } from '@/hooks/useDashboard';
import { useTimeTracker, formatDuration } from '@/hooks/useTimeTracker';
import { useAllProjectsWithClients } from '@/hooks/useAllProjectsWithClients';
import { AdminGanttChartView } from '@/components/dashboard/AdminGanttChartView';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CrmDashboard } from '@/components/crm/CrmDashboard';
import { BudgetTrackingSection } from '@/components/budget/BudgetTrackingSection';
import { ProviderStatusManager } from '@/components/admin/ProviderStatusManager';
import { IncidentManager } from '@/components/admin/IncidentManager';
import { AuditCodeManager } from '@/components/admin/AuditCodeManager';
import AdminPasswordReset from '@/components/auth/AdminPasswordReset';
import { ChatbotConversations } from '@/components/dashboard/ChatbotConversations';
import { ChatbotTrainingManager } from '@/components/dashboard/ChatbotTrainingManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDashboard = () => {
  const { clients, isLoading, stats, user, handleAddClient, handleLogout, isAdmin } = useDashboard();
  const { isRunning, elapsedSeconds } = useTimeTracker();
  const { projects: allProjects, isLoading: isLoadingProjects } = useAllProjectsWithClients();
  const [isTimeTrackingOpen, setIsTimeTrackingOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(true);
  const [isGanttOpen, setIsGanttOpen] = useState(true);
  const [isClientDirectoryOpen, setIsClientDirectoryOpen] = useState(true);

  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Admin Header */}
            <AdminHeader 
              onClientAdded={handleAddClient}
              onLogout={handleLogout}
              clients={clients}
              isAdmin={isAdmin}
            />

            {/* Time Tracking Section - Only show for admins */}
            {isAdmin && (
              <Collapsible 
                open={isTimeTrackingOpen} 
                onOpenChange={setIsTimeTrackingOpen}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-playfair font-bold">Time Tracking</h2>
                    {isRunning && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-mono">{formatDuration(elapsedSeconds)}</span>
                      </Badge>
                    )}
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      {isTimeTrackingOpen ? 'Collapse' : 'Expand'}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isTimeTrackingOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-4">
                  <TimeTracker clients={clients} />
                  <TimeTrackingSection clients={clients} />
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Budget Tracking Section - Only show for admins */}
            {isAdmin && (
              <Collapsible 
                open={isBudgetOpen} 
                onOpenChange={setIsBudgetOpen}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-playfair font-bold">Budget Tracking</h2>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      {isBudgetOpen ? 'Collapse' : 'Expand'}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isBudgetOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <BudgetTrackingSection />
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* CRM Pipeline - Only show for admins */}
            {isAdmin && <CrmDashboard />}

            {/* Master Project Timeline - Only show for admins */}
            {isAdmin && (
              <Collapsible 
                open={isGanttOpen} 
                onOpenChange={setIsGanttOpen}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-playfair font-bold">Master Project Timeline</h2>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      {isGanttOpen ? 'Collapse' : 'Expand'}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isGanttOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <AdminGanttChartView projects={allProjects} isLoading={isLoadingProjects} />
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Provider Status Management - Only show for admins */}
            {isAdmin && (
              <div className="mb-8 space-y-6">
                <ProviderStatusManager />
                <IncidentManager />
              </div>
            )}

            {/* SEO Audit Access Codes - Only show for admins */}
            {isAdmin && (
              <div className="mb-8">
                <AuditCodeManager />
              </div>
            )}

            {/* Admin Password Management - Only show for admins */}
            {isAdmin && (
              <div className="mb-8">
                <h2 className="text-2xl font-playfair font-bold mb-6">Password Management</h2>
                <AdminPasswordReset />
              </div>
            )}

            {/* Chatbot Management - Only show for admins */}
            {isAdmin && (
              <Collapsible className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-playfair font-bold">Chatbot Management</h2>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <Tabs defaultValue="conversations">
                    <TabsList>
                      <TabsTrigger value="conversations">Conversation History</TabsTrigger>
                      <TabsTrigger value="training">Training & Knowledge</TabsTrigger>
                    </TabsList>
                    <TabsContent value="conversations">
                      <ChatbotConversations />
                    </TabsContent>
                    <TabsContent value="training">
                      <ChatbotTrainingManager />
                    </TabsContent>
                  </Tabs>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Client Directory */}
            <Collapsible 
              open={isClientDirectoryOpen} 
              onOpenChange={setIsClientDirectoryOpen}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-playfair font-bold">Client Directory</h2>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    {isClientDirectoryOpen ? 'Collapse' : 'Expand'}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isClientDirectoryOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <ClientDirectory 
                  clients={clients} 
                  isLoading={isLoading}
                  onClientAdded={handleAddClient}
                  isAdmin={isAdmin}
                />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
