
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DIY from "./pages/DIY";
import Portal from "./pages/Portal";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ClientDetails from "./pages/ClientDetails";
import NotFound from "./pages/NotFound";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import { useEffect } from "react";

// Create a new query client
const queryClient = new QueryClient();

// Debug component to help troubleshoot routing issues
const RouteDebug = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    console.log("Current route:", window.location.pathname);
    console.log("Route component rendering");
  }, []);
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouteDebug>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diy" element={<DIY />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/portal/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/portal/client-dashboard" element={<ClientDashboard />} />
            <Route path="/portal/client/:id" element={<ClientDetails />} />
            
            {/* Google Auth callback routes - handle all variations */}
            <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
            <Route path="auth/google/callback" element={<GoogleAuthCallback />} />
            <Route path="*/auth/google/callback" element={<GoogleAuthCallback />} />
            
            {/* Fallback route for handling domain prefixed URLs */}
            <Route path="*" element={<GoogleAuthCallbackFallback />} />
          </Routes>
        </RouteDebug>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

// Fallback component to handle URLs with domain prefix
const GoogleAuthCallbackFallback = () => {
  const currentPath = window.location.pathname;
  
  useEffect(() => {
    console.log("Checking fallback path:", currentPath);
    
    // If the URL contains auth/google/callback, render the GoogleAuthCallback component
    if (currentPath.includes('auth/google/callback')) {
      console.log("Detected Google auth callback in fallback route");
      // Continue with auth flow
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      
      if (code && state) {
        // Manually trigger GoogleAuthCallback processing
        const callbackComponent = document.createElement('div');
        callbackComponent.id = 'google-auth-callback';
        document.body.appendChild(callbackComponent);
        
        // Render GoogleAuthCallback programmatically
        const event = new CustomEvent('google-auth-callback', { 
          detail: { code, state }
        });
        document.dispatchEvent(event);
      }
    }
  }, [currentPath]);

  // If it's a Google auth callback URL, show a processing message
  if (currentPath.includes('auth/google/callback')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Processing Authentication...</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
          <p className="mt-4 text-gray-600">
            Please wait while we complete the authentication process.
          </p>
        </div>
      </div>
    );
  }
  
  // For all other cases, render the NotFound component
  return <NotFound />;
};

export default App;
