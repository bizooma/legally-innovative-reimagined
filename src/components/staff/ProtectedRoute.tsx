
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('=== ProtectedRoute: Starting authentication check ===');
      console.log('ProtectedRoute: Current URL:', window.location.href);
      console.log('ProtectedRoute: Current pathname:', window.location.pathname);
      
      try {
        console.log('ProtectedRoute: Calling supabase.auth.getSession()...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('ProtectedRoute: Raw session response:', { data: { session }, error });
        console.log('ProtectedRoute: Session details:', {
          sessionExists: !!session,
          sessionIsNull: session === null,
          sessionIsUndefined: session === undefined,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          userId: session?.user?.id,
          accessToken: session?.access_token ? 'present' : 'missing',
          refreshToken: session?.refresh_token ? 'present' : 'missing',
          expiresAt: session?.expires_at,
          sessionValid: session ? new Date(session.expires_at * 1000) > new Date() : 'no session',
          currentTime: new Date().toISOString(),
          error: error
        });
        
        if (error) {
          console.error('ProtectedRoute: Session error details:', {
            message: error.message,
            status: error.status,
            name: error.name,
            stack: error.stack
          });
          console.log('ProtectedRoute: Setting authenticated to false due to error');
          setIsAuthenticated(false);
          return;
        }
        
        if (!session) {
          console.log('ProtectedRoute: No session found (session is null/undefined)');
          console.log('ProtectedRoute: Setting authenticated to false');
          setIsAuthenticated(false);
          return;
        }
        
        if (!session.user) {
          console.log('ProtectedRoute: Session exists but no user object');
          console.log('ProtectedRoute: Setting authenticated to false');
          setIsAuthenticated(false);
          return;
        }
        
        // Check if session is expired
        const sessionExpired = new Date(session.expires_at * 1000) <= new Date();
        if (sessionExpired) {
          console.log('ProtectedRoute: Session is expired');
          console.log('ProtectedRoute: Expires at:', new Date(session.expires_at * 1000));
          console.log('ProtectedRoute: Current time:', new Date());
          console.log('ProtectedRoute: Setting authenticated to false');
          setIsAuthenticated(false);
          return;
        }
        
        console.log('ProtectedRoute: ✅ Valid session and user found');
        console.log('ProtectedRoute: Setting authenticated to true');
        setIsAuthenticated(true);
        
      } catch (err) {
        console.error('ProtectedRoute: Unexpected error during auth check:', {
          error: err,
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : 'No stack trace'
        });
        console.log('ProtectedRoute: Setting authenticated to false due to exception');
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
    
    console.log('ProtectedRoute: Setting up auth state change listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('ProtectedRoute: 🔄 Auth state change event:', {
        event,
        timestamp: new Date().toISOString(),
        hasSession: !!session,
        hasUser: !!session?.user,
        userEmail: session?.user?.email,
        userId: session?.user?.id,
        sessionValid: session ? new Date(session.expires_at * 1000) > new Date() : 'no session'
      });
      
      if (session && session.user && new Date(session.expires_at * 1000) > new Date()) {
        console.log('ProtectedRoute: Auth state change - ✅ setting authenticated to true');
        setIsAuthenticated(true);
      } else {
        console.log('ProtectedRoute: Auth state change - ❌ setting authenticated to false');
        setIsAuthenticated(false);
      }
    });
    
    return () => {
      console.log('ProtectedRoute: Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  console.log('ProtectedRoute: 🎨 Render phase - isAuthenticated:', isAuthenticated, 'Current path:', window.location.pathname);

  if (isAuthenticated === null) {
    console.log('ProtectedRoute: Still checking authentication, showing loading...');
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: ❌ Not authenticated, redirecting to /staff');
    console.log('ProtectedRoute: About to render Navigate component to /staff');
    return <Navigate to="/staff" replace />;
  }

  console.log('ProtectedRoute: ✅ Authenticated, rendering Outlet');
  return <Outlet />;
};

export default ProtectedRoute;
