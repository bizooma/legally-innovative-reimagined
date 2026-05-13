import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Row = {
  org_id: string;
  org_name: string;
  plan: string;
  subscription_status: string | null;
  org_created_at: string;
  owner_email: string | null;
  owner_joined_at: string | null;
  member_count: number;
};

export default function AdminSubscribersPanel() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: orgs } = await supabase
        .from("acc_organizations")
        .select("id, name, plan, subscription_status, created_at, created_by")
        .order("created_at", { ascending: false });
      const { data: members } = await supabase
        .from("acc_organization_members")
        .select("organization_id, user_id, role, joined_at, created_at");
      const userIds = Array.from(new Set([...(orgs ?? []).map((o: any) => o.created_by), ...(members ?? []).map((m: any) => m.user_id)].filter(Boolean)));
      const { data: users } = userIds.length
        ? await supabase.from("users").select("id, email").in("id", userIds)
        : { data: [] as any[] };
      const emailById = new Map((users ?? []).map((u: any) => [u.id, u.email]));
      const out: Row[] = (orgs ?? []).map((o: any) => {
        const orgMembers = (members ?? []).filter((m: any) => m.organization_id === o.id);
        const owner = orgMembers.find((m: any) => m.role === "owner") ?? orgMembers[0];
        return {
          org_id: o.id,
          org_name: o.name,
          plan: o.plan,
          subscription_status: o.subscription_status,
          org_created_at: o.created_at,
          owner_email: owner ? emailById.get(owner.user_id) ?? null : emailById.get(o.created_by) ?? null,
          owner_joined_at: owner?.joined_at ?? owner?.created_at ?? null,
          member_count: orgMembers.length,
        };
      });
      setRows(out);
      setLoading(false);
    })();
  }, []);

  const fmt = (iso: string | null) =>
    iso ? new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Admin · Widget subscribers
          </h3>
          <Badge variant="secondary">{rows.length} orgs</Badge>
        </div>
        {loading ? (
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : rows.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-8 border rounded-lg">
            No subscribers yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground border-b">
                <tr>
                  <th className="text-left py-2 pr-4">Organization</th>
                  <th className="text-left py-2 pr-4">Owner email</th>
                  <th className="text-left py-2 pr-4">Plan</th>
                  <th className="text-left py-2 pr-4">Status</th>
                  <th className="text-left py-2 pr-4">Members</th>
                  <th className="text-left py-2 pr-4">Signed up</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r) => (
                  <tr key={r.org_id}>
                    <td className="py-2 pr-4 font-medium">{r.org_name}</td>
                    <td className="py-2 pr-4">{r.owner_email ?? "—"}</td>
                    <td className="py-2 pr-4 capitalize">{r.plan}</td>
                    <td className="py-2 pr-4">
                      <Badge variant={r.subscription_status === "active" ? "default" : "secondary"}>
                        {r.subscription_status ?? "none"}
                      </Badge>
                    </td>
                    <td className="py-2 pr-4 tabular-nums">{r.member_count}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{fmt(r.org_created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}