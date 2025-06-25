
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
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
import MichaelSalesPage from "./pages/MichaelSalesPage";
import JacksonvilleAttorneyPage from "./pages/JacksonvilleAttorneyPage";
import AiCustomerSupportChatbotsPage from "./pages/AiCustomerSupportChatbotsPage";
import LawFirmWebsiteDevelopmentPage from "./pages/LawFirmWebsiteDevelopmentPage";
import LawFirmMobileAppDevelopmentPage from "./pages/LawFirmMobileAppDevelopmentPage";
import AiConsultingPage from "./pages/AiConsultingPage";
import LawFirmDigitalMarketingPage from "./pages/LawFirmDigitalMarketingPage";
import { useEffect } from "react";

// Create a new query client
const queryClient = new QueryClient();

// Debug component to help troubleshoot routing issues
const RouteDebug = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    console.log("Current route:", window.location.pathname);
    console.log("Route component rendering");
    console.log("Hash:", window.location.hash);
    console.log("Search params:", window.location.search);
    console.log("Full URL:", window.location.href);
  }, []);
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Using HashRouter instead of BrowserRouter to support direct URL access */}
    <HashRouter>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouteDebug>
            <Routes>
              {/* Donut page with highest priority */}
              <Route path="/donuts" element={<DonutsPage />} />
              
              {/* Michael sales page */}
              <Route path="/michael" element={<MichaelSalesPage />} />
              
              {/* Jacksonville attorney lead capture page */}
              <Route path="/this-is-our-jax" element={<JacksonvilleAttorneyPage />} />
              
              {/* AI Customer Support Chatbots page */}
              <Route path="/ai-customer-support-chatbots" element={<AiCustomerSupportChatbotsPage />} />
              
              {/* AI Consulting page */}
              <Route path="/ai-consulting-for-law-firms" element={<AiConsultingPage />} />
              
              {/* Law Firm Website Development page */}
              <Route path="/law-firm-website-development" element={<LawFirmWebsiteDevelopmentPage />} />
              
              {/* Law Firm Mobile App Development page */}
              <Route path="/law-firm-mobile-app-development" element={<LawFirmMobileAppDevelopmentPage />} />
              
              {/* Law Firm Digital Marketing page */}
              <Route path="/law-firm-digital-marketing" element={<LawFirmDigitalMarketingPage />} />
              
              {/* Main routes */}
              <Route path="/" element={<Index />} />
              <Route path="/diy" element={<DIY />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/portal/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/portal/client-dashboard" element={<ClientDashboard />} />
              <Route path="/portal/client/:id" element={<ClientDetails />} />
              
              {/* Staff routes */}
              <Route path="/staff" element={<StaffLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/staff/dashboard" element={<StaffDashboard />} />
              </Route>
              
              {/* Google Auth callback routes */}
              <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
              
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
    </HashRouter>
  </QueryClientProvider>
);

export default App;
