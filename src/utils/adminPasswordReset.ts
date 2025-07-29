import { adminSetPassword } from '@/services/contactService';

export async function resetUserPassword(email: string, newPassword: string): Promise<void> {
  try {
    await adminSetPassword(email, newPassword);
    console.log(`Password reset successfully for ${email}`);
  } catch (error) {
    console.error('Failed to reset password:', error);
    throw error;
  }
}

// Execute the password reset for alanna_1989@hotmail.com
resetUserPassword('alanna_1989@hotmail.com', 'Scott1019!')
  .then(() => console.log('Password reset completed'))
  .catch(error => console.error('Password reset failed:', error));