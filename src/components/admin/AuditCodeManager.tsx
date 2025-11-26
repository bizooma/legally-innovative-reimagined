import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, Copy, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";

export const AuditCodeManager = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    websiteUrl: "",
    gbpUrl: "",
    expiresAt: "",
  });

  const { data: accessCodes, isLoading } = useQuery({
    queryKey: ["audit-access-codes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("audit_access_codes")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createCodeMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Generate random 8-character code
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      const { error } = await supabase
        .from("audit_access_codes")
        .insert({
          code,
          client_name: data.clientName,
          website_url: data.websiteUrl,
          gbp_url: data.gbpUrl || null,
          expires_at: data.expiresAt || null,
          created_by: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-access-codes"] });
      toast({ title: "Access code created successfully" });
      setIsDialogOpen(false);
      setFormData({ clientName: "", websiteUrl: "", gbpUrl: "", expiresAt: "" });
    },
    onError: (error) => {
      toast({ title: "Error creating access code", description: error.message, variant: "destructive" });
    },
  });

  const deleteCodeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("audit_access_codes")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-access-codes"] });
      toast({ title: "Access code deleted" });
    },
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Code copied to clipboard" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCodeMutation.mutate(formData);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">SEO Audit Access Codes</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Access Code</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="clientName">Client/Company Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="websiteUrl">Website URL *</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gbpUrl">Google Business Profile URL</Label>
                <Input
                  id="gbpUrl"
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={formData.gbpUrl}
                  onChange={(e) => setFormData({ ...formData, gbpUrl: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full" disabled={createCodeMutation.isPending}>
                {createCodeMutation.isPending ? "Creating..." : "Create Access Code"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading access codes...</div>
      ) : accessCodes && accessCodes.length > 0 ? (
        <div className="grid gap-4">
          {accessCodes.map((code) => (
            <div key={code.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{code.client_name}</h4>
                  <p className="text-sm text-muted-foreground">{code.website_url}</p>
                  {code.gbp_url && (
                    <p className="text-sm text-muted-foreground">GBP: {code.gbp_url}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(code.code)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteCodeMutation.mutate(code.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="font-mono bg-muted px-2 py-1 rounded">{code.code}</span>
                <span className={code.is_active ? "text-green-600" : "text-red-600"}>
                  {code.is_active ? "Active" : "Inactive"}
                </span>
                {code.expires_at && (
                  <span className="text-muted-foreground">
                    Expires: {format(new Date(code.expires_at), "MMM d, yyyy")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No access codes created yet. Click "Create Code" to get started.
        </div>
      )}
    </div>
  );
};
