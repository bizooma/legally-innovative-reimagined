
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useClientProjectsWithDates } from '@/hooks/useClientProjectsWithDates';
import ClientContactsModal from './ClientContactsModal';

interface ClientDetailsHeaderProps {
  clientName: string;
  clientId: string;
  clientStatus?: 'active' | 'paused' | 'terminated';
  logoUrl?: string | null;
  onBack: () => void;
}

const ClientDetailsHeader: React.FC<ClientDetailsHeaderProps> = ({
  clientName,
  clientId,
  clientStatus = 'active',
  logoUrl,
  onBack,
}) => {
  const [contactsModalOpen, setContactsModalOpen] = useState(false);
  const { projects, isLoading } = useClientProjectsWithDates(clientId);

  // Calculate project status summary
  const projectStats = {
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    onHold: projects.filter(p => p.status === 'On Hold').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    notStarted: projects.filter(p => p.status === 'Not Started').length,
  };

  // Smart status recommendation
  const shouldSuggestStatusChange = () => {
    if (clientStatus === 'paused' && projectStats.inProgress > 0) {
      return {
        show: true,
        message: `${clientName} has ${projectStats.inProgress} active project${projectStats.inProgress > 1 ? 's' : ''} but is marked as Paused. Consider updating client status to Active.`
      };
    }
    if (clientStatus === 'active' && projectStats.inProgress === 0 && projects.length > 0) {
      return {
        show: true,
        message: `${clientName} has no active projects (${projectStats.onHold} on hold, ${projectStats.completed} completed). Consider updating client status to Paused if no work is planned.`
      };
    }
    return { show: false, message: '' };
  };

  const statusSuggestion = shouldSuggestStatusChange();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            {logoUrl && (
              <div className="h-24 w-24 border border-gray-200 overflow-hidden">
                <img 
                  src={logoUrl} 
                  alt={`${clientName} logo`} 
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold font-playfair">{clientName}</h1>
              {!isLoading && projects.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  📊 Projects: {projectStats.inProgress > 0 && `${projectStats.inProgress} In Progress`}
                  {projectStats.inProgress > 0 && projectStats.onHold > 0 && ', '}
                  {projectStats.onHold > 0 && `${projectStats.onHold} On Hold`}
                  {(projectStats.inProgress > 0 || projectStats.onHold > 0) && projectStats.completed > 0 && ', '}
                  {projectStats.completed > 0 && `${projectStats.completed} Completed`}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setContactsModalOpen(true)}>
            <Mail className="mr-2 h-4 w-4" />
            Contact Client
          </Button>
        </div>
      </div>

      {/* Smart Status Recommendation Alert */}
      {statusSuggestion.show && (
        <Alert className="mb-4 border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            {statusSuggestion.message}
          </AlertDescription>
        </Alert>
      )}
      
      <ClientContactsModal
        open={contactsModalOpen}
        onOpenChange={setContactsModalOpen}
        clientId={clientId}
        clientName={clientName}
      />
    </>
  );
};

export default ClientDetailsHeader;
