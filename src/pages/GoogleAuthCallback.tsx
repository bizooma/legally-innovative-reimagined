
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { handleGoogleAuthCallback } from '@/services/googleDriveService';
import { toast } from '@/hooks/use-toast';

const GoogleAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    const processAuthCallback = async () => {
      // Enhanced debugging for callback route issues
      console.log("Processing callback at path:", location.pathname);
      console.log("Full URL:", window.location.href);
      console.log("Search params:", Array.from(searchParams.entries()));
      
      // Extract code and state from search params or from URL if needed
      let code = searchParams.get('code');
      let state = searchParams.get('state');
      const error = searchParams.get('error');

      // If params weren't found in the normal searchParams, try to parse them from the URL
      // This helps with redirects where the domain is included in the path
      if (!code || !state) {
        const url = new URL(window.location.href);
        code = url.searchParams.get('code') || null;
        state = url.searchParams.get('state') || null;
        console.log("Extracted from URL:", { code: code?.substring(0, 5) + "...", state: state?.substring(0, 5) + "..." });
      }

      if (error) {
        console.error("Google auth error:", error);
        setStatus('error');
        toast({
          title: "Authentication Error",
          description: `Google authentication failed: ${error}`,
          variant: "destructive",
        });
        // Redirect back after a short delay
        setTimeout(() => {
          navigate('/portal/admin-dashboard');
        }, 3000);
        return;
      }

      if (code && state) {
        try {
          console.log("Processing Google auth callback with code");
          const success = await handleGoogleAuthCallback(code, state);
          if (success) {
            setStatus('success');
            
            // Get the client ID from session storage
            const clientId = sessionStorage.getItem('connecting_client_id');
            if (clientId) {
              // Redirect back to the client page after a short delay
              setTimeout(() => {
                navigate(`/portal/client/${clientId}`);
              }, 1500);
            } else {
              // If client ID not found, redirect to dashboard
              setTimeout(() => {
                navigate('/portal/admin-dashboard');
              }, 1500);
            }
          } else {
            setStatus('error');
            setTimeout(() => {
              navigate('/portal/admin-dashboard');
            }, 3000);
          }
        } catch (error) {
          console.error("Error processing Google auth callback:", error);
          setStatus('error');
          // Redirect back after a short delay
          setTimeout(() => {
            navigate('/portal/admin-dashboard');
          }, 3000);
        }
      } else {
        console.error("Missing required parameters for Google authentication");
        setStatus('error');
        toast({
          title: "Invalid Auth Request",
          description: "Missing required parameters for Google authentication.",
          variant: "destructive",
        });
        // Redirect back after a short delay
        setTimeout(() => {
          navigate('/portal/admin-dashboard');
        }, 3000);
      }
    };

    processAuthCallback();
  }, [searchParams, navigate, location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          {status === 'processing' && 'Processing Google Authentication...'}
          {status === 'success' && 'Google Drive Connected Successfully!'}
          {status === 'error' && 'Authentication Error'}
        </h1>
        
        {status === 'processing' && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {status === 'success' && (
          <p className="text-green-600">
            You will be redirected back to the client workspace shortly.
          </p>
        )}
        
        {status === 'error' && (
          <p className="text-red-600">
            There was a problem connecting your Google Drive account. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
