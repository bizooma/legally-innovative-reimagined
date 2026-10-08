import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/** Paid downloads: asks the issue-download function to verify the Stripe session and return a short-lived signed URL. */
export const usePaidDownload = (sessionId: string) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async (fileName: string, displayName?: string): Promise<boolean> => {
    setIsDownloading(true);
    try {
      const { data, error } = await supabase.functions.invoke("issue-download", { body: { session_id: sessionId, file: fileName } });
      const url = (data as { url?: string } | null)?.url;
      if (error || !url) {
        let message = "We couldn't verify this purchase.";
        try {
          const ctx = (error as { context?: Response })?.context;
          const b = ctx ? await ctx.json() : null;
          if (b?.error) message = b.error;
        } catch { /* keep default */ }
        toast({ title: "Download failed", description: message, variant: "destructive" });
        return false;
      }
      window.location.assign(url);
      toast({ title: "Download started", description: `${displayName || fileName} is downloading.` });
      return true;
    } catch {
      toast({ title: "Download failed", description: "An unexpected error occurred during download", variant: "destructive" });
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, downloadFile };
};

export const UNVERIFIED_PURCHASE_MESSAGE =
  "We couldn't verify this purchase. Check the link in your receipt email, or contact support.";
