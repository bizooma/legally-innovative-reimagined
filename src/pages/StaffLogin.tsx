
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
  
  const { data: session, isLoading, error } = useQuery({
    queryKey: ['staffSession'],
    queryFn: async () => {
      console.log('StaffLogin: 🔍 Fetching session via useQuery...');
      const { data, error } = await supabase.auth.getSession();
      
      console.log('StaffLogin: Session fetch result:', {
        hasSession: !!data.session,
        sessionIsNull: data.session === null,
        hasUser: !!data.session?.user,
        userEmail: data.session?.user?.email,
        accessToken: data.session?.access_token ? 'present' : 'missing',
        error: error
      });
      
      if (error) {
        console.error('StaffLogin: Session fetch error:', error);
      }
      
      return data.session;
    },
  });

  console.log('StaffLogin: Query state:', { 
    hasSession: !!session, 
    isLoading, 
    hasError: !!error,
    error: error 
  });

  // If user is already logged in, redirect to dashboard
  if (session && !isLoading) {
    console.log('StaffLogin: ✅ User already logged in, redirecting to dashboard');
    console.log('StaffLogin: Session details:', {
      userEmail: session.user?.email,
      userId: session.user?.id,
      sessionValid: new Date(session.expires_at * 1000) > new Date()
    });
    return <Navigate to="/staff/dashboard" />;
  }

  if (isLoading) {
    console.log('StaffLogin: ⏳ Still loading session...');
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
              <div className="text-center py-8">Loading...</div>
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
