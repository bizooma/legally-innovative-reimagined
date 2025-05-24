
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

  console.log('=== StaffDashboard: Component rendering ===');

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      console.log('StaffDashboard: Starting detailed auth check');
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('StaffDashboard: Session check result:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          userId: session?.user?.id,
          error: error
        });
        
        if (error) {
          console.error('StaffDashboard: Session error:', error);
          toast({
            title: "Authentication Error",
            description: "There was an error checking your authentication status",
            variant: "destructive",
          });
          navigate('/staff');
          return;
        }
        
        if (!session) {
          console.log('StaffDashboard: No session found, redirecting to /staff');
          toast({
            title: "Authentication Required",
            description: "Please log in to access the staff dashboard",
            variant: "destructive",
          });
          navigate('/staff');
          return;
        }
        
        console.log('StaffDashboard: Valid session found for user:', session.user.email);
        setUser(session.user);
        
        // Get user profile to determine if admin
        console.log('StaffDashboard: Checking admin status for user ID:', session.user.id);
        
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();
          
        console.log('StaffDashboard: User data query result:', {
          userData,
          userError,
          isAdmin: userData?.is_admin
        });
          
        if (userError) {
          console.error('Error fetching user data:', userError);
        }
          
        if (userData) {
          console.log('User admin status:', userData.is_admin);
          setIsAdmin(userData.is_admin);
        }
        
        // If not admin, find staff member by email
        if (!userData?.is_admin) {
          console.log('User is not admin, finding staff profile by email');
          const { data: staffData, error: staffError } = await supabase
            .from('staff_members')
            .select('*')
            .eq('email', session.user.email)
            .maybeSingle();
            
          console.log('StaffDashboard: Staff member query result:', {
            staffData,
            staffError
          });
            
          if (staffError) {
            console.error('Error fetching staff data:', staffError);
          } else if (staffData) {
            console.log('Found staff member data by email:', staffData);
            setCurrentStaffMember(staffData);
          } else {
            console.log('No staff profile found for user email, trying by user_id');
            
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
            }
          }
        }
        
        console.log('StaffDashboard: Auth check complete, setting loading to false');
        setLoading(false);
      } catch (err) {
        console.error('StaffDashboard: Unexpected error during auth check:', err);
        setLoading(false);
        navigate('/staff');
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('StaffDashboard: Auth state changed:', {
        event,
        hasSession: !!session,
        userEmail: session?.user?.email
      });
      
      if (event === 'SIGNED_OUT') {
        console.log('StaffDashboard: User signed out, redirecting');
        navigate('/staff');
      } else if (session) {
        console.log('StaffDashboard: User signed in, updating user state');
        setUser(session.user);
      }
    });
    
    return () => {
      console.log('StaffDashboard: Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    console.log('StaffDashboard: Logging out user');
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/staff');
  };

  if (loading) {
    console.log('StaffDashboard: Still loading, showing loading component');
    return <StaffDashboardLoading />;
  }

  console.log('StaffDashboard: Rendering dashboard content');
  console.log('StaffDashboard: Current state:', {
    hasUser: !!user,
    userEmail: user?.email,
    isAdmin,
    hasCurrentStaffMember: !!currentStaffMember
  });

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
