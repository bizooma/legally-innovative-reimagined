import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Mail,
  Phone,
  Building2,
  DollarSign,
  Calendar,
  UserCheck,
  FileText,
  Plus,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { Lead, Proposal, CrmActivity } from '@/types/crm';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ConvertToClientDialog } from './ConvertToClientDialog';

interface CrmLeadDetailDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CrmLeadDetailDialog: React.FC<CrmLeadDetailDialogProps> = ({
  lead,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activityType, setActivityType] = useState<string>('note');
  const [activitySummary, setActivitySummary] = useState('');
  const [activityNotes, setActivityNotes] = useState('');
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);

  // Fetch activities for this lead
  const { data: activities = [] } = useQuery({
    queryKey: ['crm-activities', lead?.id],
    queryFn: async () => {
      if (!lead?.id) return [];
      const { data, error } = await supabase
        .from('crm_activities')
        .select('*')
        .eq('lead_id', lead.id)
        .order('activity_date', { ascending: false });

      if (error) throw error;
      return data as CrmActivity[];
    },
    enabled: !!lead?.id && open,
  });

  // Fetch proposals for this lead
  const { data: proposals = [] } = useQuery({
    queryKey: ['proposals', lead?.id],
    queryFn: async () => {
      if (!lead?.id) return [];
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('lead_id', lead.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Proposal[];
    },
    enabled: !!lead?.id && open,
  });

  // Add activity mutation
  const addActivityMutation = useMutation({
    mutationFn: async (newActivity: {
      lead_id: string;
      activity_type: string;
      summary: string;
      notes?: string;
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { error } = await supabase.from('crm_activities').insert({
        ...newActivity,
        created_by: userData.user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-activities', lead?.id] });
      setActivitySummary('');
      setActivityNotes('');
      toast({
        title: 'Activity added',
        description: 'The activity has been logged successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add activity.',
        variant: 'destructive',
      });
    },
  });

  const handleAddActivity = () => {
    if (!lead || !activitySummary.trim()) return;

    addActivityMutation.mutate({
      lead_id: lead.id,
      activity_type: activityType,
      summary: activitySummary,
      notes: activityNotes || undefined,
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      contacted: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      qualified: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      proposal_sent: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      won: 'bg-green-500/10 text-green-500 border-green-500/20',
      lost: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    return colors[status] || 'bg-muted';
  };

  const handleConvertToClient = () => {
    setIsConvertDialogOpen(true);
  };

  const handleConvertSuccess = (clientId: string) => {
    // Optionally close the lead dialog after successful conversion
    onOpenChange(false);
    toast({
      title: 'Success!',
      description: 'You can now find this client in the Client Directory.',
    });
  };

  const getProposalStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-muted text-muted-foreground',
      sent: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      accepted: 'bg-green-500/10 text-green-500 border-green-500/20',
      rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    return colors[status] || 'bg-muted';
  };

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-playfair">
              {lead.company_name}
            </DialogTitle>
            <Badge className={getStatusColor(lead.status)} variant="outline">
              {lead.status.replace('_', ' ')}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">
              Activities ({activities.length})
            </TabsTrigger>
            <TabsTrigger value="proposals">
              Proposals ({proposals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <ScrollArea className="h-[500px] pr-4">
              {/* Contact Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Contact Name
                        </p>
                        <p className="font-medium">{lead.contact_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p className="font-medium">{lead.company_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a
                          href={`mailto:${lead.contact_email}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {lead.contact_email}
                        </a>
                      </div>
                    </div>
                    {lead.contact_phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <a
                            href={`tel:${lead.contact_phone}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {lead.contact_phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Lead Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Lead Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {lead.source && (
                      <div>
                        <p className="text-sm text-muted-foreground">Source</p>
                        <p className="font-medium">{lead.source}</p>
                      </div>
                    )}
                    {lead.payment_type && (
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Type</p>
                        <p className="font-medium capitalize">
                          {lead.payment_type === 'one_time' ? 'One Time Fee' : 'Monthly'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Financial Breakdown */}
                  {(lead.estimated_value || lead.commission_value) && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Financial Breakdown
                      </h4>
                      
                      {lead.estimated_value && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total Deal Value:</span>
                          <span className="font-medium">
                            ${lead.estimated_value.toLocaleString()}
                          </span>
                        </div>
                      )}
                      
                      {lead.commission_value && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">My Cut (Commission):</span>
                            <span className="font-semibold text-green-600">
                              ${lead.commission_value.toLocaleString()}
                            </span>
                          </div>
                          
                          {lead.estimated_value && lead.commission_value < lead.estimated_value && (
                            <div className="pt-2 border-t border-border">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">Partnership Split:</span>
                                <span className="text-muted-foreground">
                                  {Math.round((lead.commission_value / lead.estimated_value) * 100)}% yours / {' '}
                                  {Math.round(((lead.estimated_value - lead.commission_value) / lead.estimated_value) * 100)}% partner
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {lead.next_follow_up && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Next Follow-up
                          </p>
                          <p className="font-medium">
                            {format(new Date(lead.next_follow_up), 'PPP')}
                          </p>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Created On
                      </p>
                      <p className="font-medium">
                        {format(new Date(lead.created_at), 'PPP')}
                      </p>
                    </div>
                  </div>
                </div>

                {lead.notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Notes</h3>
                      <p className="text-sm text-muted-foreground">
                        {lead.notes}
                      </p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Log Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Create Proposal
                    </Button>
                    {lead.status !== 'won' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-500/10 hover:bg-green-500/20 text-green-700 border-green-500/20"
                        onClick={handleConvertToClient}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Convert to Client
                      </Button>
                    )}
                    {lead.status === 'won' && lead.converted_to_client_id && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-500/10 text-green-700 border-green-500/20"
                        disabled
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Converted to Client
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <ScrollArea className="h-[500px] pr-4">
              {/* Add Activity Form */}
              <div className="space-y-4 mb-6 p-4 border rounded-lg bg-muted/30">
                <h3 className="text-lg font-semibold">Add Activity</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activity-type">Activity Type</Label>
                    <Select value={activityType} onValueChange={setActivityType}>
                      <SelectTrigger id="activity-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="note">Note</SelectItem>
                        <SelectItem value="follow_up">Follow-up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="activity-summary">Summary</Label>
                  <Input
                    id="activity-summary"
                    placeholder="Brief summary of the activity"
                    value={activitySummary}
                    onChange={(e) => setActivitySummary(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="activity-notes">Notes (Optional)</Label>
                  <Textarea
                    id="activity-notes"
                    placeholder="Additional details..."
                    value={activityNotes}
                    onChange={(e) => setActivityNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleAddActivity}
                  disabled={!activitySummary.trim() || addActivityMutation.isPending}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Activity Timeline</h3>
                {activities.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No activities yet. Add your first activity above.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="p-4 border rounded-lg bg-card"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {activity.activity_type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {format(
                                new Date(activity.activity_date),
                                'PPp'
                              )}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-medium mb-1">{activity.summary}</h4>
                        {activity.notes && (
                          <p className="text-sm text-muted-foreground">
                            {activity.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-4">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Proposals</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Proposal
                  </Button>
                </div>

                {proposals.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No proposals yet. Create your first proposal.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {proposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{proposal.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              ${proposal.amount.toLocaleString()}
                            </p>
                          </div>
                          <Badge
                            className={getProposalStatusColor(proposal.status)}
                            variant="outline"
                          >
                            {proposal.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {proposal.sent_date && (
                            <span>
                              Sent: {format(new Date(proposal.sent_date), 'PP')}
                            </span>
                          )}
                          {proposal.due_date && (
                            <span>
                              Due: {format(new Date(proposal.due_date), 'PP')}
                            </span>
                          )}
                        </div>
                        {proposal.document_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            asChild
                          >
                            <a
                              href={proposal.document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Document
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>

      <ConvertToClientDialog
        lead={lead}
        open={isConvertDialogOpen}
        onOpenChange={setIsConvertDialogOpen}
        onSuccess={handleConvertSuccess}
      />
    </Dialog>
  );
};
