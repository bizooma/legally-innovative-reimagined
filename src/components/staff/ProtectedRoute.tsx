
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('ProtectedRoute: Checking authentication...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('ProtectedRoute: Session found:', !!session);
      console.log('ProtectedRoute: User email:', session?.user?.email);
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('ProtectedRoute: Auth state changed:', !!session);
      setIsAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  console.log('ProtectedRoute: Current auth state:', isAuthenticated);

  if (isAuthenticated === null) {
    // Still checking authentication
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Not authenticated, redirecting to /staff');
    return <Navigate to="/staff" />;
  }

  console.log('ProtectedRoute: Authenticated, rendering dashboard');
  return <Outlet />;
};

export default ProtectedRoute;
