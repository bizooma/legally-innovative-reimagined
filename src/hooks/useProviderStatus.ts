import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ProviderStatusRecord } from "@/types/providerStatus";

export const useProviderStatus = (refetchInterval = 60000) => {
  return useQuery({
    queryKey: ["provider-status"],
    queryFn: async () => {
      console.log("Fetching provider status...");
      
      const { data, error } = await supabase.functions.invoke("provider-status", {
        method: "GET",
      });

      if (error) {
        console.error("Error fetching provider status:", error);
        throw error;
      }

      return data.providers as ProviderStatusRecord[];
    },
    refetchInterval,
    refetchOnWindowFocus: true,
  });
};
