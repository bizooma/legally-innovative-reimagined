
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
import ProjectTimeline from "./pages/ProjectTimeline";
import ClientDiagram from "./pages/ClientDiagram";
import NotFound from "./pages/NotFound";
import PhillipsProposalPage from "./pages/proposals/PhillipsProposalPage";
import JaxReferralsProposalPage from "./pages/proposals/JaxReferralsProposalPage";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import ProtectedRoute from "./components/staff/ProtectedRoute";
import DonutsPage from "./pages/DonutsPage";
import MichaelSalesPage from "./pages/MichaelSalesPage";
import JacksonvilleAttorneyPage from "./pages/JacksonvilleAttorneyPage";
import AiCustomerSupportChatbotsPage from "./pages/AiCustomerSupportChatbotsPage";
import ChatbotsPage from "./pages/ChatbotsPage";
import LawFirmWebsiteDevelopmentPage from "./pages/LawFirmWebsiteDevelopmentPage";
import LawFirmMobileAppDevelopmentPage from "./pages/LawFirmMobileAppDevelopmentPage";
import AiConsultingPage from "./pages/AiConsultingPage";
import LawFirmDigitalMarketingPage from "./pages/LawFirmDigitalMarketingPage";
import GoogleBusinessProfilePage from "./pages/GoogleBusinessProfilePage";
import WhyReviewsMatterPage from "./pages/WhyReviewsMatterPage";
import LawFirmSeoAeoPage from "./pages/LawFirmSeoAeoPage";
import MobileAppsMarketingToolPage from "./pages/MobileAppsMarketingToolPage";
import LawFirmLeadGenerationPage from "./pages/LawFirmLeadGenerationPage";
import LawFirmVoiceAssistantMarketingPage from "./pages/LawFirmVoiceAssistantMarketingPage";
import NpoBotsPage from "./pages/products/NpoBotsPage";
import AeoAnalyzerPage from "./pages/products/AeoAnalyzerPage";
import QuickieQrPage from "./pages/products/QuickieQrPage";
import LeadScraperCrmPage from "./pages/products/LeadScraperCrmPage";
import SupportBotsPage from "./pages/products/SupportBotsPage";
import SignaturePopPage from "./pages/products/SignaturePopPage";
import BrandedBooksPage from "./pages/products/BrandedBooksPage";
import MvpSoftLaunchPage from "./pages/products/MvpSoftLaunchPage";
import InstallPWA from "./pages/InstallPWA";
import RouteToResultsNewsletter from "./pages/RouteToResultsNewsletter";
import StatusTicker from "./pages/StatusTicker";
import StatusTickerEmbed from "./pages/StatusTickerEmbed";
import IncidentHistory from "./pages/IncidentHistory";
import CloudDevStatusExtensionPrivacy from "./pages/CloudDevStatusExtensionPrivacy";
import AIMarketingLawFirms2025 from "./pages/AIMarketingLawFirms2025";
import GbpOptimization2026Page from "./pages/GbpOptimization2026Page";
import GoogleMarch2026UpdatePage from "./pages/GoogleMarch2026UpdatePage";
import SchemaMarkupFeaturedSnippetsPage from "./pages/SchemaMarkupFeaturedSnippetsPage";
import AlexaSkillsLawFirmsPage from "./pages/AlexaSkillsLawFirmsPage";
import WebsiteConversionLawFirmsPage from "./pages/WebsiteConversionLawFirmsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import SeoAuditPage from "./pages/SeoAuditPage";
import JaxBarAssociationResourcesPage from "./pages/JaxBarAssociationResourcesPage";
import JaxBarInfographicPage from "./pages/JaxBarInfographicPage";
import SupportPage from "./pages/SupportPage";
import MomentumCampaignsPage from "./pages/MomentumCampaignsPage";
import MarketingSectionPage from "./pages/MarketingSectionPage";
import CodeSectionPage from "./pages/CodeSectionPage";
import AiSectionPage from "./pages/AiSectionPage";
import InsightsSectionPage from "./pages/InsightsSectionPage";
import { useEffect } from "react";
import GlobalSEO from "./components/SEO/GlobalSEO";
import CanonicalMeta from "./components/SEO/CanonicalMeta";
import ScrollToTop from "./components/ScrollToTop";
import { SmartChatbot } from "./components/chatbot/SmartChatbot";

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
          <SmartChatbot />
          <RouteDebug>
            <Routes>
              {/* Donut page with highest priority */}
              <Route path="/donuts" element={<DonutsPage />} />
              
              {/* Michael sales page */}
              <Route path="/michael" element={<MichaelSalesPage />} />
              
              {/* Proposal pages */}
              <Route path="/proposals/phillips" element={<PhillipsProposalPage />} />
              <Route path="/proposals/jaxreferrals" element={<JaxReferralsProposalPage />} />
              
              {/* Newsletter page */}
              <Route path="/route-to-results-newsletter" element={<RouteToResultsNewsletter />} />
              
              {/* Jacksonville attorney lead capture page */}
              <Route path="/this-is-our-jax" element={<JacksonvilleAttorneyPage />} />
              
              {/* AI Customer Support Chatbots page */}
              <Route path="/ai-customer-support-chatbots" element={<AiCustomerSupportChatbotsPage />} />
              
              {/* Custom Chatbots types page */}
              <Route path="/chatbots" element={<ChatbotsPage />} />
              
              {/* AI Consulting page */}
              <Route path="/ai-consulting-for-law-firms" element={<AiConsultingPage />} />
              
              {/* Law Firm Website Development page */}
              <Route path="/law-firm-website-development" element={<LawFirmWebsiteDevelopmentPage />} />
              
              {/* Law Firm Mobile App Development page */}
              <Route path="/law-firm-mobile-app-development" element={<LawFirmMobileAppDevelopmentPage />} />
              <Route path="/mobile-app-development" element={<Navigate to="/law-firm-mobile-app-development" replace />} />
              
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
              <Route path="/products/mvp-soft-launch" element={<MvpSoftLaunchPage />} />
              
              {/* Main routes */}
              <Route path="/" element={<Index />} />
              <Route path="/stay-informed" element={<StayInformed />} />
              <Route path="/death-of-traditional-seo" element={<DeathOfTraditionalSeo />} />
              <Route path="/apple-maps-marketing" element={<AppleMapsMarketingPage />} />
              <Route path="/why-reviews-matter-for-law-firms" element={<WhyReviewsMatterPage />} />
              <Route path="/openai-web-browser" element={<OpenAiWebBrowserPage />} />
              <Route path="/voice-seo-aeo-stats" element={<VoiceSeoAeoStatsPage />} />
              <Route path="/mobile-apps-marketing-tool" element={<MobileAppsMarketingToolPage />} />
              <Route path="/diy" element={<DIY />} />
              <Route path="/install" element={<InstallPWA />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/portal/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/portal/client-dashboard" element={<ClientDashboard />} />
              <Route path="/portal/project-timeline" element={<ProjectTimeline />} />
              <Route path="/portal/clients/:id" element={<ClientDetails />} />
              <Route path="/portal/client/:id" element={<ClientDetails />} />
              <Route path="/portal/client/:id/diagram" element={<ClientDiagram />} />
              
              {/* Status Ticker Routes */}
              <Route path="/status-ticker" element={<StatusTicker />} />
              <Route path="/embed/status-ticker" element={<StatusTickerEmbed />} />
              <Route path="/incident-history" element={<IncidentHistory />} />
              
              {/* Privacy Policy for Chrome Extension */}
              <Route path="/privacy/cloud-dev-status-extension" element={<CloudDevStatusExtensionPrivacy />} />
              
              {/* Blog Posts */}
              <Route path="/ai-marketing-law-firms-2025" element={<AIMarketingLawFirms2025 />} />
              <Route path="/gbp-optimization-2026" element={<GbpOptimization2026Page />} />
              <Route path="/schema-markup-featured-snippets" element={<SchemaMarkupFeaturedSnippetsPage />} />
              <Route path="/alexa-skills-law-firms" element={<AlexaSkillsLawFirmsPage />} />
              <Route path="/website-conversion-law-firms" element={<WebsiteConversionLawFirmsPage />} />
              <Route path="/google-march-2026-update" element={<GoogleMarch2026UpdatePage />} />
              
              {/* Privacy Policy */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              
              {/* SEO Audit Tool */}
              <Route path="/seo-audit" element={<SeoAuditPage />} />
              
              {/* Jacksonville Bar Association CLE Resources */}
              <Route path="/jax-bar-association" element={<JaxBarAssociationResourcesPage />} />
              <Route path="/jax-bar-association/infographic" element={<JaxBarInfographicPage />} />
              
              {/* Support */}
              <Route path="/support" element={<SupportPage />} />
              
              {/* Momentum Campaigns */}
              <Route path="/momentum-campaigns" element={<MomentumCampaignsPage />} />
              
              {/* Newsletter Section Pages */}
              <Route path="/marketing" element={<MarketingSectionPage />} />
              <Route path="/code" element={<CodeSectionPage />} />
              <Route path="/ai" element={<AiSectionPage />} />
              <Route path="/insights" element={<InsightsSectionPage />} />
              
              {/* 404 page for truly non-existent routes */}
              <Route path="*" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteDebug>
        </TooltipProvider>
      </HelmetProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
