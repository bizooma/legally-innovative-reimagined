
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import StaffDirectory from '@/components/staff/StaffDirectory';
import DocumentManagement from '@/components/staff/DocumentManagement';
import StaffDocuments from '@/components/staff/StaffDocuments';

const StaffDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentStaffMember, setCurrentStaffMember] = useState<any>(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the staff dashboard",
          variant: "destructive",
        });
        navigate('/staff');
        return;
      }
      
      setUser(session.user);
      
      // Get user profile to determine if admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
        
      if (!userError && userData) {
        setIsAdmin(userData.is_admin);
      }
      
      // Get staff member data for the current user
      if (!userData?.is_admin) {
        const { data: staffData, error: staffError } = await supabase
          .from('staff_members')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
          
        if (!staffError && staffData) {
          console.log('Found staff member data:', staffData);
          setCurrentStaffMember(staffData);
        } else {
          console.error('Error fetching staff data:', staffError);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/staff');
      } else if (session) {
        setUser(session.user);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/staff');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-playfair">
              Staff <span className="text-legal-accent">Dashboard</span>
            </h1>
            <Button onClick={handleLogout} variant="outline">
              Log Out
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Access company documents and forms</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Access internal documents, policies, and procedures.</p>
                <Button variant="outline" className="w-full" disabled={loading}>
                  View Documents
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Latest company news and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Stay updated with the latest company news and announcements.</p>
                <Button variant="outline" className="w-full" disabled>Read Updates</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {user?.email}</CardTitle>
                <CardDescription>Your staff portal dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This is your personalized staff dashboard. Here you can access important
                  company resources, view announcements, and connect with team members.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Staff Documents Section */}
          {!isAdmin && currentStaffMember && (
            <div className="mb-8">
              <StaffDocuments staffMemberId={currentStaffMember.id} />
              {/* Fix for void expression cannot be tested for truthiness */}
              <div className="hidden">
                {console.log('Rendering StaffDocuments with ID:', currentStaffMember.id)}
              </div>
            </div>
          )}
          
          {/* Admin Only: Document Management Section */}
          {isAdmin && (
            <div className="mb-8">
              <DocumentManagement />
            </div>
          )}
          
          <div className="mb-8">
            <StaffDirectory />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffDashboard;
