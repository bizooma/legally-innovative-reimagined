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
import { Proposal } from '@/types/crm';
import { ExternalLink } from 'lucide-react';

interface CrmProposalsViewProps {
  proposals: Proposal[];
  onProposalClick: (proposal: Proposal) => void;
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export const CrmProposalsView: React.FC<CrmProposalsViewProps> = ({
  proposals,
  onProposalClick,
}) => {
  if (proposals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No proposals yet. Create proposals for your leads!
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sent Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow
              key={proposal.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onProposalClick(proposal)}
            >
              <TableCell className="font-medium">{proposal.title}</TableCell>
              <TableCell className="font-semibold text-green-600">
                ${proposal.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge className={statusColors[proposal.status]}>
                  {proposal.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {proposal.sent_date
                  ? new Date(proposal.sent_date).toLocaleDateString()
                  : '-'}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {proposal.due_date
                  ? new Date(proposal.due_date).toLocaleDateString()
                  : '-'}
              </TableCell>
              <TableCell className="text-right">
                {proposal.document_url && (
                  <a
                    href={proposal.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3" />
                    View
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
