import React from 'react';
import { Card } from '@/components/ui/card';
import { ProjectTask } from '@/types/task';
import { CheckCircle2, Circle, Clock, AlertTriangle } from 'lucide-react';

interface KanbanStatsProps {
  tasks: ProjectTask[];
}

export const KanbanStats: React.FC<KanbanStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const urgentTasks = tasks.filter(t => t.priority === 'urgent').length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: Circle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Urgent',
      value: urgentTasks,
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
  ];

  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-3">
              <div className="flex items-center gap-3">
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <Card className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Completion Rate</span>
          <span className="text-sm font-bold">{completionRate}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </Card>
    </div>
  );
};
