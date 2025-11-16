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
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Est. Value</TableHead>
            <TableHead>Next Follow-up</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
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
              <TableCell className="text-sm text-muted-foreground">
                {lead.contact_phone || '-'}
              </TableCell>
              <TableCell>
                <Badge className={statusColors[lead.status]}>
                  {lead.status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-semibold">
                {lead.estimated_value
                  ? `$${lead.estimated_value.toLocaleString()}`
                  : '-'}
              </TableCell>
              <TableCell className="text-sm">
                {lead.next_follow_up
                  ? new Date(lead.next_follow_up).toLocaleDateString()
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
