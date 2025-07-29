// Test utility to reset Alanna's password
export async function testPasswordReset() {
  console.log('Testing password reset...');
  
  try {
    const response = await fetch('https://hvyjvbdforunsjgqhhny.supabase.co/functions/v1/admin-password-management', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eWp2YmRmb3J1bnNqZ3FoaG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzM3MDksImV4cCI6MjA2MzE0OTcwOX0.USDrrMPieE3Twwou7ZkARUGttkrrQEyFsiTpMqrLUV4'
      },
      body: JSON.stringify({
        email: 'alanna_1989@hotmail.com',
        password: 'Scott1019!',
        action: 'create_or_update'
      })
    });

    const result = await response.json();
    console.log('Password reset response:', result);
    
    if (result.success) {
      console.log('✅ Password reset successful!');
    } else {
      console.error('❌ Password reset failed:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error calling password reset:', error);
    throw error;
  }
}

// Execute immediately
testPasswordReset();