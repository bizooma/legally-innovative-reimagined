
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('=== ProtectedRoute: Starting authentication check ===');
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('ProtectedRoute: getSession result:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          error: error
        });
        
        if (error) {
          console.error('ProtectedRoute: Session error:', error);
          setIsAuthenticated(false);
          return;
        }
        
        const authenticated = !!session;
        console.log('ProtectedRoute: Setting authenticated to:', authenticated);
        setIsAuthenticated(authenticated);
      } catch (err) {
        console.error('ProtectedRoute: Unexpected error during auth check:', err);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('ProtectedRoute: Auth state change event:', {
        event,
        hasSession: !!session,
        userEmail: session?.user?.email
      });
      setIsAuthenticated(!!session);
    });
    
    return () => {
      console.log('ProtectedRoute: Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  console.log('ProtectedRoute: Render - isAuthenticated:', isAuthenticated);

  if (isAuthenticated === null) {
    console.log('ProtectedRoute: Still checking authentication, showing loading...');
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Not authenticated, redirecting to /staff');
    return <Navigate to="/staff" replace />;
  }

  console.log('ProtectedRoute: Authenticated, rendering Outlet');
  return <Outlet />;
};

export default ProtectedRoute;
