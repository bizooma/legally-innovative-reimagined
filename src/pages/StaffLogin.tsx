
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StaffLoginForm from '@/components/staff/StaffLoginForm';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const StaffLogin = () => {
  console.log('StaffLogin: 🎬 Component rendering');
  console.log('StaffLogin: Current URL:', window.location.href);
  console.log('StaffLogin: Current pathname:', window.location.pathname);
  
  const { data: session, isLoading, error } = useQuery({
    queryKey: ['staffSession'],
    queryFn: async () => {
      console.log('StaffLogin: 🔍 Starting session fetch via useQuery...');
      
      try {
        const result = await supabase.auth.getSession();
        console.log('StaffLogin: Session fetch completed');
        console.log('StaffLogin: Raw result:', result);
        
        const { data, error } = result;
        
        console.log('StaffLogin: Session fetch result details:', {
          hasData: !!data,
          hasSession: !!data.session,
          sessionIsNull: data.session === null,
          sessionIsUndefined: data.session === undefined,
          hasUser: !!data.session?.user,
          userEmail: data.session?.user?.email,
          accessToken: data.session?.access_token ? 'present' : 'missing',
          sessionExpired: data.session ? new Date(data.session.expires_at * 1000) <= new Date() : 'no session',
          currentTime: new Date().toISOString(),
          expiresAt: data.session?.expires_at ? new Date(data.session.expires_at * 1000).toISOString() : 'no expiry',
          error: error
        });
        
        if (error) {
          console.error('StaffLogin: Session fetch error:', error);
          throw error;
        }
        
        return data.session;
      } catch (err) {
        console.error('StaffLogin: Exception during session fetch:', err);
        throw err;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log('StaffLogin: Query state details:', { 
    hasSession: !!session,
    sessionDetails: session ? {
      hasUser: !!session.user,
      userEmail: session.user?.email,
      userId: session.user?.id,
      isExpired: new Date(session.expires_at * 1000) <= new Date(),
      expiresAt: new Date(session.expires_at * 1000).toISOString()
    } : 'no session',
    isLoading, 
    hasError: !!error,
    error: error 
  });

  // If user is already logged in, redirect to dashboard
  if (session && !isLoading) {
    const isExpired = new Date(session.expires_at * 1000) <= new Date();
    if (!isExpired) {
      console.log('StaffLogin: ✅ User already logged in with valid session, redirecting to dashboard');
      console.log('StaffLogin: Session details for redirect:', {
        userEmail: session.user?.email,
        userId: session.user?.id,
        sessionValid: new Date(session.expires_at * 1000) > new Date(),
        expiresAt: new Date(session.expires_at * 1000).toISOString(),
        currentTime: new Date().toISOString()
      });
      return <Navigate to="/staff/dashboard" />;
    } else {
      console.log('StaffLogin: Session exists but is expired, staying on login page');
    }
  }

  if (isLoading) {
    console.log('StaffLogin: ⏳ Still loading session...');
  }

  if (error) {
    console.log('StaffLogin: ❌ Error loading session, showing login form');
  }

  console.log('StaffLogin: 🎨 Rendering login form');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 font-playfair">
              Staff <span className="text-legal-accent">Portal</span>
            </h1>
            {isLoading ? (
              <div className="text-center py-8">
                <div>Loading...</div>
                <div className="text-sm text-gray-500 mt-2">Checking authentication status...</div>
              </div>
            ) : (
              <StaffLoginForm />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffLogin;
