import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Plus, Edit, Trash2 } from "lucide-react";
import { ProviderConfigDialog } from "./ProviderConfigDialog";
import type { ProviderConfig } from "@/types/providerStatus";
import { formatDistanceToNow } from "date-fns";

export const ProviderStatusManager = () => {
  const [editingProvider, setEditingProvider] = useState<ProviderConfig | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: providers, isLoading } = useQuery({
    queryKey: ["provider-configs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("provider_status_configs")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as ProviderConfig[];
    },
  });

  const { data: statusCache } = useQuery({
    queryKey: ["provider-status-cache"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("provider_status_cache")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from("provider_status_configs")
        .update({ is_active: isActive })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-configs"] });
      toast({ title: "Provider updated successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error updating provider", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const refreshStatusMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-all-provider-status");
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-status-cache"] });
      queryClient.invalidateQueries({ queryKey: ["provider-status"] });
      toast({ title: "Provider statuses refreshed successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error refreshing statuses", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteProviderMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("provider_status_configs")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-configs"] });
      toast({ title: "Provider deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting provider", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const getLatestStatus = (providerId: string) => {
    return statusCache?.find(s => s.provider_id === providerId);
  };

  const statusBadgeColor = {
    operational: "bg-green-500",
    degraded: "bg-yellow-500",
    major_outage: "bg-red-500",
    unknown: "bg-gray-400",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Provider Status Management</CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={() => refreshStatusMutation.mutate()}
              disabled={refreshStatusMutation.isPending}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshStatusMutation.isPending ? 'animate-spin' : ''}`} />
              Refresh Status
            </Button>
            <Button
              onClick={() => {
                setEditingProvider(null);
                setIsDialogOpen(true);
              }}
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Loading providers...</p>
        ) : (
          <div className="space-y-2">
            {providers?.map((provider) => {
              const status = getLatestStatus(provider.id);
              return (
                <div
                  key={provider.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
                      {provider.icon_initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{provider.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {provider.slug}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {status && (
                          <>
                            <div className={`w-2 h-2 rounded-full ${statusBadgeColor[status.status as keyof typeof statusBadgeColor]}`} />
                            <span className="capitalize">{status.status.replace('_', ' ')}</span>
                            <span>•</span>
                            <span>
                              {formatDistanceToNow(new Date(status.last_checked), { addSuffix: true })}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Active</span>
                      <Switch
                        checked={provider.is_active}
                        onCheckedChange={(checked) =>
                          toggleActiveMutation.mutate({ id: provider.id, isActive: checked })
                        }
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingProvider(provider);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Delete ${provider.name}?`)) {
                          deleteProviderMutation.mutate(provider.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <ProviderConfigDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          provider={editingProvider}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["provider-configs"] });
            setIsDialogOpen(false);
            setEditingProvider(null);
          }}
        />
      </CardContent>
    </Card>
  );
};
