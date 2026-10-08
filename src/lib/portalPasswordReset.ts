import { supabase } from '@/integrations/supabase/client';

/** Sends a Supabase recovery email that lands on the portal reset page. */
export async function sendPortalResetEmail(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/portal/reset-password`,
  });
}
