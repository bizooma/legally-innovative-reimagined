import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortalHero from '@/components/portal/PortalHero';
import PortalFeatures from '@/components/portal/PortalFeatures';
import LoginForm from '@/components/portal/LoginForm';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/database';

const Portal = () => {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Check if user is admin
          const { data: userData } = await supabase
            .from('users')
            .select('is_admin')
            .eq('id', session.user.id)
            .maybeSingle();
            
          if (userData) {
            // Direct to appropriate dashboard
            if (userData.is_admin) {
              navigate('/portal/admin-dashboard');
            } else {
              navigate('/portal/client-dashboard');
            }
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        // If there's an error, we'll just show the login page
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkSession();
  }, [navigate]);

  if (isCheckingAuth) {
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
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <PortalHero />
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Marketing Copy */}
              <PortalFeatures />
              
              {/* Login Form */}
              <div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Portal;
