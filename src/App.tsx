
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import StayInformed from "./pages/StayInformed";
import DeathOfTraditionalSeo from "./pages/DeathOfTraditionalSeo";
import AppleMapsMarketingPage from "./pages/AppleMapsMarketingPage";
import OpenAiWebBrowserPage from "./pages/OpenAiWebBrowserPage";
import VoiceSeoAeoStatsPage from "./pages/VoiceSeoAeoStatsPage";
import DIY from "./pages/DIY";
import Portal from "./pages/Portal";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ClientDetails from "./pages/ClientDetails";
import ClientDiagram from "./pages/ClientDiagram";
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
import GoogleBusinessProfilePage from "./pages/GoogleBusinessProfilePage";
import WhyReviewsMatterPage from "./pages/WhyReviewsMatterPage";
import LawFirmSeoAeoPage from "./pages/LawFirmSeoAeoPage";
import LawFirmLeadGenerationPage from "./pages/LawFirmLeadGenerationPage";
import LawFirmVoiceAssistantMarketingPage from "./pages/LawFirmVoiceAssistantMarketingPage";
import NpoBotsPage from "./pages/products/NpoBotsPage";
import AeoAnalyzerPage from "./pages/products/AeoAnalyzerPage";
import QuickieQrPage from "./pages/products/QuickieQrPage";
import LeadScraperCrmPage from "./pages/products/LeadScraperCrmPage";
import SupportBotsPage from "./pages/products/SupportBotsPage";
import SignaturePopPage from "./pages/products/SignaturePopPage";
import BrandedBooksPage from "./pages/products/BrandedBooksPage";
import { useEffect } from "react";
import GlobalSEO from "./components/SEO/GlobalSEO";
import CanonicalMeta from "./components/SEO/CanonicalMeta";
import ScrollToTop from "./components/ScrollToTop";

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
    <BrowserRouter>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* Global SEO and Canonical tags */}
          <GlobalSEO />
          <CanonicalMeta />
          <ScrollToTop />
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
              
              {/* Google Business Profile Optimization page */}
              <Route path="/google-business-profile-optimization" element={<GoogleBusinessProfilePage />} />
              <Route path="/google-business-profile" element={<GoogleBusinessProfilePage />} />
              
              {/* SEO/AEO/Voice SEO page */}
              <Route path="/law-firm-seo-aeo-voiceseo" element={<LawFirmSeoAeoPage />} />
              
              {/* Lead Generation page */}
              <Route path="/law-firm-lead-generation" element={<LawFirmLeadGenerationPage />} />
              
              {/* Voice Assistant Marketing page */}
              <Route path="/law-firm-voice-assistant-marketing" element={<LawFirmVoiceAssistantMarketingPage />} />
              
              {/* Product pages */}
              <Route path="/products/npo-bots" element={<NpoBotsPage />} />
              <Route path="/products/aeo-analyzer" element={<AeoAnalyzerPage />} />
          <Route path="/products/quickie-qr" element={<QuickieQrPage />} />
          <Route path="/products/lead-scraper-crm" element={<LeadScraperCrmPage />} />
          <Route path="/products/support-bots" element={<SupportBotsPage />} />
          <Route path="/products/signature-pop" element={<SignaturePopPage />} />
          <Route path="/products/branded-books" element={<BrandedBooksPage />} />
              
              {/* Main routes */}
              <Route path="/" element={<Index />} />
              <Route path="/stay-informed" element={<StayInformed />} />
              <Route path="/death-of-traditional-seo" element={<DeathOfTraditionalSeo />} />
              <Route path="/apple-maps-marketing" element={<AppleMapsMarketingPage />} />
              <Route path="/why-reviews-matter-for-law-firms" element={<WhyReviewsMatterPage />} />
              <Route path="/openai-web-browser" element={<OpenAiWebBrowserPage />} />
              <Route path="/voice-seo-aeo-stats" element={<VoiceSeoAeoStatsPage />} />
              <Route path="/diy" element={<DIY />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/portal/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/portal/client-dashboard" element={<ClientDashboard />} />
              <Route path="/portal/clients/:id" element={<ClientDetails />} />
              <Route path="/portal/client/:id" element={<ClientDetails />} />
              <Route path="/portal/client/:id/diagram" element={<ClientDiagram />} />
              
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
