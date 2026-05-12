import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AccOrg = { id: string; name: string; slug: string; plan: string };

export function useAccessibilityOrg() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [org, setOrg] = useState<AccOrg | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user?.id ?? null;
    setUserId(uid);
    if (!uid) { setLoading(false); return; }
    const { data: mems } = await supabase
      .from("acc_organization_members")
      .select("organization_id, role")
      .eq("user_id", uid)
      .limit(1);
    if (mems && mems.length) {
      const { data: o } = await supabase
        .from("acc_organizations")
        .select("id, name, slug, plan")
        .eq("id", mems[0].organization_id)
        .maybeSingle();
      setOrg((o as any) ?? null);
    } else {
      setOrg(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const createOrg = useCallback(async (name: string) => {
    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user?.id;
    if (!uid) { setError("Not signed in"); return null; }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 6);
    const { data: o, error: e1 } = await supabase
      .from("acc_organizations")
      .insert({ name, slug, created_by: uid })
      .select().single();
    if (e1 || !o) { setError(e1?.message ?? "Failed to create org"); return null; }
    const { error: e2 } = await supabase
      .from("acc_organization_members")
      .insert({ organization_id: o.id, user_id: uid, role: "owner" });
    if (e2) { setError(e2.message); return null; }
    await load();
    return o as AccOrg;
  }, [load]);

  return { loading, userId, org, error, reload: load, createOrg };
}