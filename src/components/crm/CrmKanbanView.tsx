import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types/crm';
import { Building2, Mail, Phone, Calendar, GripVertical } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { DroppableColumn } from './DroppableColumn';

interface CrmKanbanViewProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

interface DraggableLeadCardProps {
  lead: Lead;
  color: string;
  onLeadClick: (lead: Lead) => void;
}

const DraggableLeadCard: React.FC<DraggableLeadCardProps> = ({
  lead,
  color,
  onLeadClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lead.id,
    data: {
      type: 'lead',
      lead,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${color} ${
        isDragging ? 'shadow-lg' : ''
      }`}
      onClick={() => onLeadClick(lead)}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
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
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {lead.estimated_value && (
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-xs text-muted-foreground">Value</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-green-600">
                  ${lead.estimated_value.toLocaleString()}
                </span>
                {lead.payment_type === 'monthly' && (
                  <Badge variant="secondary" className="text-xs">
                    Monthly
                  </Badge>
                )}
              </div>
            </div>
          )}

          {lead.next_follow_up && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
              <Calendar className="h-3 w-3" />
              <span>
                Follow-up: {new Date(lead.next_follow_up).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const statusColumns = [
  { id: 'new', title: 'New Leads', color: 'border-l-blue-500' },
  { id: 'contacted', title: 'Contacted', color: 'border-l-yellow-500' },
  { id: 'qualified', title: 'Qualified', color: 'border-l-orange-500' },
  { id: 'proposal_sent', title: 'Proposal Sent', color: 'border-l-purple-500' },
];

export const CrmKanbanView: React.FC<CrmKanbanViewProps> = ({
  leads,
  onLeadClick,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeLead, setActiveLead] = React.useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getLeadsByStatus = (status: string) => {
    return leads.filter((lead) => lead.status === status);
  };

  // Update lead status mutation
  const updateLeadStatusMutation = useMutation({
    mutationFn: async ({
      leadId,
      newStatus,
    }: {
      leadId: string;
      newStatus: string;
    }) => {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: 'Lead updated',
        description: 'Lead status has been updated successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update lead status.',
        variant: 'destructive',
      });
    },
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const lead = active.data.current?.lead as Lead;
    setActiveLead(lead);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveLead(null);

    if (!over) return;

    const leadId = active.id as string;
    const newStatus = over.id as string;
    const lead = leads.find((l) => l.id === leadId);

    if (lead && lead.status !== newStatus) {
      updateLeadStatusMutation.mutate({ leadId, newStatus });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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

              <DroppableColumn
                id={column.id}
                items={columnLeads.map((lead) => lead.id)}
              >
                {columnLeads.map((lead) => (
                  <DraggableLeadCard
                    key={lead.id}
                    lead={lead}
                    color={column.color}
                    onLeadClick={onLeadClick}
                  />
                ))}

                {columnLeads.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No leads in this stage
                  </div>
                )}
              </DroppableColumn>
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeLead ? (
          <Card className="cursor-grabbing border-l-4 border-l-primary opacity-90 shadow-xl">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3 w-3 text-muted-foreground" />
                  <p className="font-semibold text-sm">
                    {activeLead.company_name}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activeLead.contact_name}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
