import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { createPugetLawGroupUser } from '@/utils/createClientUser';

const CreateClientUserButton = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateUser = async () => {
    setIsCreating(true);
    try {
      await createPugetLawGroupUser();
      toast({
        title: "Success",
        description: "User dmontgomery@pugetlawgroup.com has been created and linked to Puget Law Group",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Puget Law Group User</CardTitle>
        <CardDescription>
          Create user dmontgomery@pugetlawgroup.com with access only to Puget Law Group workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleCreateUser} 
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? "Creating User..." : "Create Puget Law User"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateClientUserButton;