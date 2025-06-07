
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accidentType: string;
  wantHighSettlement: boolean;
  description: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: LeadFormData = await req.json();
    console.log("Received lead form data:", formData);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">
          New Jacksonville Attorney Lead
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Case Details</h3>
          <p><strong>Accident Type:</strong> ${formData.accidentType}</p>
          <p><strong>Want to Win more than $250,000:</strong> ${formData.wantHighSettlement ? 'Yes' : 'No'}</p>
          <p><strong>Description:</strong></p>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #d4a574; margin-top: 10px;">
            ${formData.description || "No description provided"}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This lead was submitted from the Jacksonville Attorney page on Legally Innovative.</p>
          <p>Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Jacksonville Leads <onboarding@resend.dev>",
      to: ["joe@bizooma.com"],
      subject: `New Jacksonville Attorney Lead: ${formData.firstName} ${formData.lastName}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Lead submitted successfully",
        emailId: emailResponse.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-jacksonville-lead function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
