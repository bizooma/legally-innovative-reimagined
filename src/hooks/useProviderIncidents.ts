import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ProviderIncident } from "@/types/providerIncident";

export const useProviderIncidents = (providerId: string, limit = 10) => {
  return useQuery({
    queryKey: ["provider-incidents", providerId],
    queryFn: async () => {
      console.log(`Fetching incidents for provider ${providerId}...`);
      
      const { data, error } = await supabase
        .from("provider_incidents")
        .select("*")
        .eq("provider_id", providerId)
        .order("started_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching provider incidents:", error);
        throw error;
      }

      return data as ProviderIncident[];
    },
    enabled: !!providerId,
  });
};

export const useAllProviderIncidents = (limit = 50) => {
  return useQuery({
    queryKey: ["all-provider-incidents", limit],
    queryFn: async () => {
      console.log("Fetching all provider incidents...");
      
      const { data, error } = await supabase
        .from("provider_incidents")
        .select(`
          *,
          provider:provider_status_configs(name, slug, logo_url, brand_color)
        `)
        .order("started_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching all incidents:", error);
        throw error;
      }

      return data;
    },
  });
};
