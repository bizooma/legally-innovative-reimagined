
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  StaffDirectory, 
  DocumentManagement,
  StaffDocumentsSection,
  StaffDashboardHeader,
  DashboardCards,
  StaffDashboardLoading
} from '@/components/staff';

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
      console.log('Current authenticated user:', session.user);
      
      // Get user profile to determine if admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
        
      if (userError) {
        console.error('Error fetching user data:', userError);
      }
        
      if (userData) {
        console.log('User data:', userData);
        setIsAdmin(userData.is_admin);
      }
      
      // If not admin, find staff member by email instead of user_id
      // since the data shows staff members without user_id associations
      if (!userData?.is_admin) {
        console.log('User is not admin, finding staff profile by email');
        const { data: staffData, error: staffError } = await supabase
          .from('staff_members')
          .select('*')
          .eq('email', session.user.email)
          .maybeSingle(); // Use maybeSingle instead of single to avoid errors
          
        if (staffError) {
          console.error('Error fetching staff data:', staffError);
          toast({
            title: "Staff Profile Error",
            description: "Could not find your staff profile",
            variant: "destructive",
          });
        } else if (staffData) {
          console.log('Found staff member data by email:', staffData);
          setCurrentStaffMember(staffData);
        } else {
          console.log('No staff profile found for user email');
          
          // Fall back to trying user_id if email doesn't match
          const { data: staffDataById, error: staffErrorById } = await supabase
            .from('staff_members')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();
            
          if (!staffErrorById && staffDataById) {
            console.log('Found staff member data by user_id:', staffDataById);
            setCurrentStaffMember(staffDataById);
          } else {
            console.log('No staff profile found for this user');
            toast({
              title: "Staff Profile Missing",
              description: "You're logged in but don't have a staff profile. Please contact an administrator.",
              variant: "destructive",
            });
          }
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
    return <StaffDashboardLoading />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <StaffDashboardHeader handleLogout={handleLogout} />
          <DashboardCards loading={loading} userEmail={user?.email} />
          
          {/* Staff Documents Section */}
          {!isAdmin && currentStaffMember && (
            <StaffDocumentsSection currentStaffMember={currentStaffMember} />
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
