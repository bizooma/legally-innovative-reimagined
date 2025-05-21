
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface PasswordChangeRequest {
  email: string;
  password: string;
  action: 'create_or_update';
}

serve(async (req) => {
  // Check for a proper request
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Create a Supabase client with the service role key for admin privileges
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Get the request body
    const requestData: PasswordChangeRequest = await req.json();
    const { email, password } = requestData;
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // First check if user exists by listing all users and filtering
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) throw userError;
    
    const existingUser = userData.users.find(u => u.email === email);
    
    let result;
    
    if (existingUser) {
      // If user exists, update their password
      result = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { password }
      );
    } else {
      // If user doesn't exist, create them
      result = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });
    }
    
    if (result.error) {
      throw result.error;
    }
    
    return new Response(JSON.stringify({ 
      success: true,
      message: existingUser ? 'Password updated successfully' : 'User created successfully'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
