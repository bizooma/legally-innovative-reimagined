import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message }: ContactFormRequest = await req.json();

    console.log('Received contact form submission:', { name, email, company: company || 'Not provided' });

    // Send notification email to joe@bizooma.com
    const notificationEmail = await resend.emails.send({
      from: 'Legally Innovative <onboarding@resend.dev>',
      to: ['joe@bizooma.com'],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #1e3a8a;">Message:</h3>
            <p style="white-space: pre-wrap; padding: 15px; background-color: #ffffff; border-left: 4px solid #1e3a8a;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the Legally Innovative contact form.</p>
            <p>To reply, simply respond to this email or click the email address above.</p>
          </div>
        </div>
      `,
    });

    console.log('Notification email sent:', notificationEmail);

    // Send confirmation email to customer
    const confirmationEmail = await resend.emails.send({
      from: 'Legally Innovative <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for contacting Legally Innovative',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>
          
          <p style="margin: 20px 0; line-height: 1.6;">
            Hi ${name},
          </p>
          
          <p style="margin: 20px 0; line-height: 1.6;">
            Thank you for contacting Legally Innovative. We have received your message and will get back to you as soon as possible.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f0f9ff; border-left: 4px solid #1e3a8a; border-radius: 5px;">
            <p style="margin: 0; font-weight: bold; color: #1e3a8a;">Your message:</p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="margin: 20px 0; line-height: 1.6;">
            In the meantime, feel free to explore our services or call us directly at <a href="tel:8452046343" style="color: #1e3a8a; text-decoration: none; font-weight: bold;">845-204-6343</a>.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 5px;">
            <p style="margin: 0; font-weight: bold;">Legally Innovative</p>
            <p style="margin: 5px 0;">200 N Laura St</p>
            <p style="margin: 5px 0;">Jacksonville, FL 32202</p>
            <p style="margin: 5px 0;">📞 <a href="tel:8452046343" style="color: #1e3a8a;">845-204-6343</a></p>
            <p style="margin: 5px 0;">✉️ <a href="mailto:joe@bizooma.com" style="color: #1e3a8a;">joe@bizooma.com</a></p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; text-align: center;">
            <p>© 2025 Legally Innovative. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log('Confirmation email sent:', confirmationEmail);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Emails sent successfully',
      notificationId: notificationEmail.id,
      confirmationId: confirmationEmail.id
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to send email'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
