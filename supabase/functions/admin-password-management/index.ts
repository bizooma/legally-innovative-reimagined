
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface PasswordChangeRequest {
  email: string;
  password: string;
  action: 'create' | 'update';
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
    const { email, password, action } = requestData;
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    let result;
    
    if (action === 'create') {
      // Create a new user
      result = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });
    } else {
      // First fetch the user by email
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
      
      if (userError) throw userError;
      
      const user = userData.users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Update the user's password
      result = await supabase.auth.admin.updateUserById(
        user.id,
        { password }
      );
    }
    
    if (result.error) {
      throw result.error;
    }
    
    return new Response(JSON.stringify({ 
      success: true,
      message: action === 'create' ? 'User created successfully' : 'Password updated successfully'
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
