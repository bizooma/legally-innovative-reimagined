
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteDebug>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
