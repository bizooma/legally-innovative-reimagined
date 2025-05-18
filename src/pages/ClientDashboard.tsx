
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to access your dashboard",
          variant: "destructive",
        });
        navigate('/portal');
        return;
      }
      
      setUser(session.user);
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/portal');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-playfair font-bold">Client Dashboard</h1>
              <p className="text-gray-600">Welcome, {user?.email}</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/portal')}
                className="bg-white hover:bg-gray-100"
              >
                Back to Portal
              </Button>
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="bg-white hover:bg-gray-100"
              >
                Logout
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Client Portal</CardTitle>
              <CardDescription>Welcome to your personalized client area</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your marketing resources and reports will be available here.</p>
              <p className="mt-4 text-muted-foreground">This area is under development. Check back soon for content!</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDashboard;
