
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortalHero from '@/components/portal/PortalHero';
import PortalFeatures from '@/components/portal/PortalFeatures';
import LoginForm from '@/components/portal/LoginForm';
import AdminPasswordReset from '@/components/auth/AdminPasswordReset';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Portal = () => {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  console.log('Portal component rendering, current pathname:', window.location.pathname);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Checking session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session check result:', session ? 'Session found' : 'No session');
        
        if (session) {
          // Only redirect if we're on the portal page itself, not on a client workspace
          if (window.location.pathname === '/portal' || window.location.hash === '#/portal') {
            console.log('User is authenticated, redirecting from portal page...');
            // Check if user is admin
            const { data: userData, error } = await supabase
              .from('users')
              .select('is_admin, client_id')
              .eq('id', session.user.id)
              .single();
              
            if (userData && !error) {
              // Direct to appropriate dashboard
              if (userData.is_admin) {
                navigate('/portal/admin-dashboard');
              } else if (userData.client_id) {
                navigate(`/portal/clients/${userData.client_id}`);
              } else {
                navigate('/portal/admin-dashboard');
              }
            } else {
              console.log('User data error or no data:', error);
              setIsCheckingAuth(false);
            }
          } else {
            // User is authenticated but on a different portal page, stop loading
            setIsCheckingAuth(false);
          }
        } else {
          // No session, stop loading state
          console.log('No session found, showing login page');
          setIsCheckingAuth(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast({
          title: "Authentication Error",
          description: "There was a problem verifying your login status.",
          variant: "destructive",
        });
        // If there's an error, show the login page
        setIsCheckingAuth(false);
      }
    };
    
    // Run the session check
    checkSession();
  }, [navigate]);

  // Debug HTML element to help identify if the component is rendering
  const debugElement = (
    <div style={{display: 'none', position: 'fixed', bottom: '0', right: '0'}}>
      Portal Component Active: {new Date().toISOString()}
    </div>
  );

  if (isCheckingAuth) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <p className="text-xl">Loading...</p>
            <p className="text-sm text-gray-500 mt-2">Verifying authentication status...</p>
          </div>
        </div>
        {debugElement}
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <PortalHero />
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Marketing Copy */}
              <PortalFeatures />
              
              {/* Login Form */}
              <div className="space-y-6">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      {debugElement}
      <Footer />
    </>
  );
};

export default Portal;
