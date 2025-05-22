
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

interface PasswordChangeRequest {
  email: string;
  password: string;
  action: 'create_or_update';
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  // Check for a proper request
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), { 
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    // Create a Supabase client with the service role key for admin privileges
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Get the request body
    const requestData: PasswordChangeRequest = await req.json();
    const { email, password } = requestData;
    
    if (!email || !password) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email and password are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Check if the password meets minimum requirements
    if (password.length < 8) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Password must be at least 8 characters'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // First check if user exists by listing all users and filtering
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('Error listing users:', userError);
      throw userError;
    }
    
    const existingUser = userData.users.find(u => u.email === email);
    
    let result;
    
    if (existingUser) {
      // If user exists, update their password
      console.log(`Updating password for existing user: ${email}`);
      result = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { password }
      );
    } else {
      // If user doesn't exist, create them
      console.log(`Creating new user with email: ${email}`);
      result = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });
    }
    
    if (result.error) {
      console.error('Error in password management:', result.error);
      return new Response(JSON.stringify({ 
        success: false,
        error: result.error.message
      }), {
        status: 400,
        headers: corsHeaders
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true,
      message: existingUser ? 'Password updated successfully' : 'User created successfully'
    }), {
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Unexpected error in admin-password-management:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
});
