import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, FileText, TrendingUp } from 'lucide-react';
import { Lead, Proposal } from '@/types/crm';

interface CrmPipelineStatsProps {
  leads: Lead[];
  proposals: Proposal[];
}

export const CrmPipelineStats: React.FC<CrmPipelineStatsProps> = ({ leads, proposals }) => {
  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => !['won', 'lost'].includes(l.status)).length;
  
  // Use commission_value if available, otherwise fall back to estimated_value
  const pipelineValue = leads
    .filter(l => !['won', 'lost'].includes(l.status))
    .reduce((sum, lead) => {
      const value = lead.commission_value ?? lead.estimated_value ?? 0;
      return sum + value;
    }, 0);
  
  // Calculate MRR (Monthly Recurring Revenue) from active monthly leads
  const mrr = leads
    .filter(l => !['won', 'lost'].includes(l.status) && l.payment_type === 'monthly')
    .reduce((sum, lead) => {
      const value = lead.commission_value ?? lead.estimated_value ?? 0;
      return sum + value;
    }, 0);
  
  // Count leads with 'proposal_sent' status as pending proposals
  const pendingProposals = leads.filter(l => l.status === 'proposal_sent').length;
  
  const wonLeads = leads.filter(l => l.status === 'won').length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  const stats = [
    {
      title: 'Active Leads',
      value: activeLeads.toString(),
      description: `${totalLeads} total`,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Pipeline Value',
      value: `$${pipelineValue.toLocaleString()}`,
      description: `MRR: $${mrr.toLocaleString()}/mo`,
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Proposals Pending',
      value: pendingProposals.toString(),
      description: `${proposals.length} total`,
      icon: FileText,
      color: 'text-orange-500',
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      description: `${wonLeads} won`,
      icon: TrendingUp,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className={`text-xs mt-1 font-medium ${
                  stat.title === 'Pipeline Value' 
                    ? (mrr >= 20000 ? 'text-green-600' : 'text-red-600')
                    : 'text-muted-foreground'
                }`}>
                  {stat.description}
                </p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
