import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types/crm';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CrmTableViewProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-orange-100 text-orange-800',
  proposal_sent: 'bg-purple-100 text-purple-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-gray-100 text-gray-800',
};

export const CrmTableView: React.FC<CrmTableViewProps> = ({ leads, onLeadClick }) => {
  if (leads.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No leads found. Add your first lead to get started!</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead className="text-right">Deal Value</TableHead>
            <TableHead className="text-right">My Cut</TableHead>
            <TableHead className="text-right">Split</TableHead>
            <TableHead>Next Follow-up</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const hasPartnership = lead.estimated_value && lead.commission_value && 
              lead.commission_value < lead.estimated_value;
            const splitPercentage = hasPartnership
              ? Math.round((lead.commission_value! / lead.estimated_value!) * 100)
              : null;

            return (
              <TableRow
                key={lead.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onLeadClick(lead)}
              >
                <TableCell className="font-medium">{lead.company_name}</TableCell>
                <TableCell>{lead.contact_name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {lead.contact_email}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[lead.status]}>
                    {lead.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  {lead.payment_type ? (
                    <Badge variant="outline" className="text-xs">
                      {lead.payment_type === 'one_time' ? 'One-Time' : 'Monthly'}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {lead.estimated_value
                    ? `$${lead.estimated_value.toLocaleString()}`
                    : '-'}
                </TableCell>
                <TableCell className="text-right font-semibold text-green-600">
                  {lead.commission_value
                    ? `$${lead.commission_value.toLocaleString()}`
                    : lead.estimated_value
                    ? `$${lead.estimated_value.toLocaleString()}`
                    : '-'}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {hasPartnership ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="secondary" className="text-xs cursor-help">
                            {splitPercentage}% yours
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {splitPercentage}% yours / {100 - splitPercentage!}% partner
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-sm">
                  {lead.next_follow_up
                    ? new Date(lead.next_follow_up).toLocaleDateString()
                    : '-'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
