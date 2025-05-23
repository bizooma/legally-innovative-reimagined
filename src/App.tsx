
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import DIY from "./pages/DIY";
import Portal from "./pages/Portal";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ClientDetails from "./pages/ClientDetails";
import NotFound from "./pages/NotFound";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import ProtectedRoute from "./components/staff/ProtectedRoute";
import DonutsPage from "./pages/DonutsPage";
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
      <HelmetProvider>
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
              
              {/* Donut page routes with multiple variations for maximum compatibility */}
              <Route path="/donuts" element={<DonutsPage />} />
              <Route path="/Donuts" element={<Navigate to="/donuts" replace />} />
              <Route path="donuts" element={<DonutsPage />} />
              <Route path="Donuts" element={<Navigate to="/donuts" replace />} />
              
              {/* Staff routes */}
              <Route path="/staff" element={<StaffLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/staff/dashboard" element={<StaffDashboard />} />
              </Route>
              
              {/* Google Auth callback routes */}
              <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
              <Route path="auth/google/callback" element={<GoogleAuthCallback />} />
              
              {/* Handle all auth callback variations and paths */}
              <Route path="*/auth/google/callback" element={<GoogleAuthCallback />} />
              
              {/* Create a catch-all route for all client routes to handle page refreshes */}
              <Route path="/portal/*" element={<Portal />} />
              
              {/* 404 page for truly non-existent routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteDebug>
        </TooltipProvider>
      </HelmetProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
