
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { resetJoePassword, createAngelaAffordAdmin } from '@/utils/resetAdminPassword';
import CreateClientUserButton from '@/components/admin/CreateClientUserButton';

const AdminPasswordReset = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [isCreatingAngela, setIsCreatingAngela] = useState(false);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await resetJoePassword();
      toast({
        title: "Success",
        description: "Password has been reset to 'admin123' for joe@bizooma.com",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  const handleCreateAngela = async () => {
    setIsCreatingAngela(true);
    try {
      await createAngelaAffordAdmin();
      toast({
        title: "Success",
        description: "Admin access created for angafford@yahoo.com with password 'Admin2025!'",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create admin user",
        variant: "destructive",
      });
    } finally {
      setIsCreatingAngela(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Admin Password Reset</CardTitle>
          <CardDescription>
            Reset password for joe@bizooma.com to 'admin123'
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleReset} 
            disabled={isResetting}
            className="w-full"
          >
            {isResetting ? "Resetting..." : "Reset Joe's Password"}
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Angela Admin Access</CardTitle>
          <CardDescription>
            Set up admin access for angafford@yahoo.com with password 'Admin2025!'
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleCreateAngela} 
            disabled={isCreatingAngela}
            className="w-full"
          >
            {isCreatingAngela ? "Creating..." : "Create Angela's Admin Access"}
          </Button>
        </CardContent>
      </Card>
      
      <CreateClientUserButton />
    </div>
  );
};

export default AdminPasswordReset;
