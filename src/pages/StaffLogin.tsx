
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StaffLoginForm from '@/components/staff/StaffLoginForm';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const StaffLogin = () => {
  const { data: session, isLoading } = useQuery({
    queryKey: ['staffSession'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  // If user is already logged in, redirect to dashboard
  if (session) {
    return <Navigate to="/staff/dashboard" />;
  }

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
