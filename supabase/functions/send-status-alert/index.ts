import { Resend } from 'npm:resend@4.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StatusAlertRequest {
  providerName: string;
  oldStatus: string;
  newStatus: string;
  summary: string;
  adminEmails: string[];
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { providerName, oldStatus, newStatus, summary, adminEmails }: StatusAlertRequest = await req.json();

    console.log(`Sending status alert for ${providerName}: ${oldStatus} → ${newStatus}`);

    // Determine severity
    const severityEmoji = newStatus === 'major_outage' ? '🔴' : '⚠️';
    const severityText = newStatus === 'major_outage' ? 'MAJOR OUTAGE' : 'DEGRADED PERFORMANCE';
    const statusColor = newStatus === 'major_outage' ? '#ef4444' : '#f59e0b';

    // Send email to all admins
    const emailPromises = adminEmails.map(email =>
      resend.emails.send({
        from: 'Status Alerts <onboarding@resend.dev>',
        to: [email],
        subject: `${severityEmoji} ${providerName} Status Alert: ${severityText}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Status Alert</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                      <!-- Header -->
                      <tr>
                        <td style="background-color: ${statusColor}; padding: 30px 20px; text-align: center;">
                          <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">
                            ${severityEmoji} Provider Status Alert
                          </h1>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <div style="background-color: #fef3c7; border-left: 4px solid ${statusColor}; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                            <p style="margin: 0; color: #92400e; font-weight: 500;">
                              <strong>${providerName}</strong> status has changed
                            </p>
                          </div>
                          
                          <table width="100%" cellpadding="8" style="margin-bottom: 24px;">
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Provider:</td>
                              <td style="color: #111827; font-weight: 600; font-size: 14px; padding: 8px 0;">${providerName}</td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Previous Status:</td>
                              <td style="color: #10b981; font-weight: 600; font-size: 14px; padding: 8px 0;">✓ ${oldStatus.toUpperCase()}</td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Current Status:</td>
                              <td style="color: ${statusColor}; font-weight: 600; font-size: 14px; padding: 8px 0;">${severityEmoji} ${newStatus.toUpperCase().replace('_', ' ')}</td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding: 8px 0; vertical-align: top;">Summary:</td>
                              <td style="color: #111827; font-size: 14px; padding: 8px 0;">${summary}</td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Detected At:</td>
                              <td style="color: #111827; font-size: 14px; padding: 8px 0;">${new Date().toLocaleString('en-US', { 
                                dateStyle: 'medium', 
                                timeStyle: 'short' 
                              })}</td>
                            </tr>
                          </table>
                          
                          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                            <a href="https://hvyjvbdforunsjgqhhny.supabase.co/status-ticker" 
                               style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px;">
                              View Status Dashboard
                            </a>
                          </div>
                          
                          <p style="margin-top: 24px; color: #6b7280; font-size: 13px; line-height: 1.6;">
                            This alert was automatically generated when a provider status changed from operational to ${newStatus === 'major_outage' ? 'a major outage' : 'degraded performance'}. You're receiving this because you're an administrator.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0; color: #6b7280; font-size: 12px;">
                            Status Ticker Alert System | Powered by Supabase & Resend
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    const failureCount = results.filter(r => r.status === 'rejected').length;

    console.log(`Alert emails sent: ${successCount} succeeded, ${failureCount} failed`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent: successCount,
        failed: failureCount,
        message: `Status alert sent to ${successCount} admins` 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error sending status alert:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
