import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types/crm';
import { Building2, Mail, Phone, Calendar } from 'lucide-react';

interface CrmKanbanViewProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const statusColumns = [
  { id: 'new', title: 'New Leads', color: 'border-l-blue-500' },
  { id: 'contacted', title: 'Contacted', color: 'border-l-yellow-500' },
  { id: 'qualified', title: 'Qualified', color: 'border-l-orange-500' },
  { id: 'proposal_sent', title: 'Proposal Sent', color: 'border-l-purple-500' },
];

export const CrmKanbanView: React.FC<CrmKanbanViewProps> = ({ leads, onLeadClick }) => {
  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statusColumns.map((column) => {
        const columnLeads = getLeadsByStatus(column.id);
        return (
          <div key={column.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">{column.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {columnLeads.length}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {columnLeads.map((lead) => (
                <Card
                  key={lead.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${column.color}`}
                  onClick={() => onLeadClick(lead)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-3 w-3 text-muted-foreground" />
                            <p className="font-semibold text-sm line-clamp-1">
                              {lead.company_name}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {lead.contact_name}
                          </p>
                        </div>
                      </div>

                      {lead.estimated_value && (
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-xs text-muted-foreground">Value</span>
                          <span className="text-sm font-semibold text-green-600">
                            ${lead.estimated_value.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {lead.next_follow_up && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                          <Calendar className="h-3 w-3" />
                          <span>Follow-up: {new Date(lead.next_follow_up).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {columnLeads.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No leads in this stage
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
