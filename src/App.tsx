
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
import WhyReviewsMatterPage from "./pages/WhyReviewsMatterPage";
import InstallPWA from "./pages/InstallPWA";
import RouteToResultsNewsletter from "./pages/RouteToResultsNewsletter";
import StatusTicker from "./pages/StatusTicker";
import StatusTickerEmbed from "./pages/StatusTickerEmbed";
import IncidentHistory from "./pages/IncidentHistory";
import CloudDevStatusExtensionPrivacy from "./pages/CloudDevStatusExtensionPrivacy";
import AIMarketingLawFirms2025 from "./pages/AIMarketingLawFirms2025";
import GoogleMarch2026UpdatePage from "./pages/GoogleMarch2026UpdatePage";
import SchemaMarkupFeaturedSnippetsPage from "./pages/SchemaMarkupFeaturedSnippetsPage";
import SchemaForExactMatchDomainsPage from "./pages/SchemaForExactMatchDomainsPage";
import LcrPage from "./pages/LcrPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import JaxBarAssociationResourcesPage from "./pages/JaxBarAssociationResourcesPage";
import JaxBarInfographicPage from "./pages/JaxBarInfographicPage";
import SupportPage from "./pages/SupportPage";
import WordpressPluginsPage from "./pages/WordpressPluginsPage";
import LawFirmStartupsPage from "./pages/LawFirmStartupsPage";
import AccessibilityLayerPage from "./pages/AccessibilityLayerPage";
import ClaudeCoworkPage from "./pages/ClaudeCoworkPage";
import ClaudeCoworkSuccess from "./pages/ClaudeCoworkSuccess";
import AiAuditPage from "./pages/AiAuditPage";
import AiAuditSuccess from "./pages/AiAuditSuccess";
import AiExplainedPage from "./pages/AiExplainedPage";
import OrderOfOperationsPage, { OrderOfOperationsNonprofitsPage } from "./pages/OrderOfOperationsPage";
import LabsPage from "./pages/LabsPage";
import ProductPage from "./pages/products/ProductLayout";
import ProductsOverviewPage from "./pages/products/ProductsOverviewPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import { datarightsos } from "./content/products/datarightsos";
import { lexguild } from "./content/products/lexguild";
import { amicusEdge } from "./content/products/amicusEdge";
import ServicesOverviewPage from "./pages/services/ServicesOverviewPage";
import ServicePage from "./pages/services/ServicePage";
import { aiMarketing } from "./content/services/aiMarketing";
import { seoAeo } from "./content/services/seoAeo";
import { websitesAndApps } from "./content/services/websitesAndApps";
import { leadGeneration } from "./content/services/leadGeneration";
import AIReceptionist from "./pages/AIReceptionist";
import AccessibilityLayout from "./pages/accessibility/AccessibilityLayout";
import AccessibilityDashboard from "./pages/accessibility/AccessibilityDashboard";
import AccessibilityWebsites from "./pages/accessibility/AccessibilityWebsites";
import AccessibilityScans from "./pages/accessibility/AccessibilityScans";
import AccessibilityIssues from "./pages/accessibility/AccessibilityIssues";
import AccessibilityAi from "./pages/accessibility/AccessibilityAi";
import AccessibilityWidgetPage from "./pages/accessibility/AccessibilityWidgetPage";
import AccessibilitySignup from "./pages/accessibility/AccessibilitySignup";
import AccessibilityResetPassword from "./pages/accessibility/AccessibilityResetPassword";
import AccessibilityCheckoutSuccess from "./pages/accessibility/AccessibilityCheckoutSuccess";
import AccessibilityProfile from "./pages/accessibility/AccessibilityProfile";
import AccessibilityBilling from "./pages/accessibility/AccessibilityBilling";
import AccessibilityReports from "./pages/accessibility/AccessibilityReports";
import AccessibilityCompliance from "./pages/accessibility/AccessibilityCompliance";
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

              {/* Claude Cowork landing page */}
              <Route path="/claude-cowork" element={<ClaudeCoworkPage />} />
              <Route path="/claude-cowork/success" element={<ClaudeCoworkSuccess />} />

              {/* AI Audit landing page */}
              <Route path="/ai-audit" element={<AiAuditPage />} />
              <Route path="/ai-audit/success" element={<AiAuditSuccess />} />

              {/* AI Explained glossary page */}
              <Route path="/ai-explained" element={<AiExplainedPage />} />
              <Route path="/order-of-operations" element={<OrderOfOperationsPage />} />
              <Route path="/order-of-operations/nonprofits" element={<OrderOfOperationsNonprofitsPage />} />
              <Route path="/labs" element={<LabsPage />} />
              <Route path="/products" element={<ProductsOverviewPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/products/datarightsos" element={<ProductPage content={datarightsos} />} />
              <Route path="/products/lexguild" element={<ProductPage content={lexguild} />} />
              <Route path="/products/amicus-edge" element={<ProductPage content={amicusEdge} />} />
              <Route path="/services" element={<ServicesOverviewPage />} />
              <Route path="/services/ai-marketing" element={<ServicePage content={aiMarketing} />} />
              <Route path="/services/seo-aeo" element={<ServicePage content={seoAeo} />} />
              <Route path="/services/websites-and-apps" element={<ServicePage content={websitesAndApps} />} />
              <Route path="/services/lead-generation" element={<ServicePage content={leadGeneration} />} />

              {/* AI Receptionist service page */}
              <Route path="/ai-receptionist" element={<AIReceptionist />} />
              
              {/* Michael sales page */}
              <Route path="/michael" element={<MichaelSalesPage />} />
              
              {/* Proposal pages */}
              <Route path="/proposals/phillips-gku0mza5" element={<PhillipsProposalPage />} />
              <Route path="/proposals/jaxreferrals-xzq68ois" element={<JaxReferralsProposalPage />} />
              
              {/* Newsletter page */}
              <Route path="/route-to-results-newsletter" element={<RouteToResultsNewsletter />} />
              
              {/* Jacksonville attorney lead capture page */}
              <Route path="/this-is-our-jax" element={<JacksonvilleAttorneyPage />} />
              
              {/* AI Customer Support Chatbots page */}
              
              {/* Custom Chatbots types page */}
              
              {/* AI Consulting page */}
              
              {/* Law Firm Website Development page */}
              
              {/* Law Firm Mobile App Development page */}
              
              {/* Law Firm Digital Marketing page */}
              
              {/* Google Business Profile Optimization page */}
              
              {/* SEO/AEO/Voice SEO page */}
              
              {/* Lead Generation page */}
              
              {/* Voice Assistant Marketing page */}
              
              {/* Product pages */}
              
              {/* Main routes */}
              <Route path="/" element={<Index />} />
              <Route path="/stay-informed" element={<StayInformed />} />
              <Route path="/death-of-traditional-seo" element={<DeathOfTraditionalSeo />} />
              <Route path="/apple-maps-marketing" element={<AppleMapsMarketingPage />} />
              <Route path="/why-reviews-matter-for-law-firms" element={<WhyReviewsMatterPage />} />
              <Route path="/openai-web-browser" element={<OpenAiWebBrowserPage />} />
              <Route path="/voice-seo-aeo-stats" element={<VoiceSeoAeoStatsPage />} />
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
              <Route path="/schema-markup-featured-snippets" element={<SchemaMarkupFeaturedSnippetsPage />} />
              <Route path="/google-march-2026-update" element={<GoogleMarch2026UpdatePage />} />
              <Route path="/schema-for-exact-match-domains" element={<SchemaForExactMatchDomainsPage />} />

              {/* LCR Mobile Game */}
              <Route path="/lcr" element={<LcrPage />} />
              
              {/* Privacy Policy */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              
              {/* SEO Audit Tool */}
              
              {/* Jacksonville Bar Association CLE Resources */}
              <Route path="/jax-bar-association" element={<JaxBarAssociationResourcesPage />} />
              <Route path="/jax-bar-association/infographic" element={<JaxBarInfographicPage />} />
              
              {/* Support */}
              <Route path="/support" element={<SupportPage />} />

              {/* WordPress Plugins */}
              <Route path="/wordpress-plugins" element={<WordpressPluginsPage />} />

              {/* Law Firm Startups Playbook */}
              <Route path="/law-firm-startups" element={<LawFirmStartupsPage />} />

              {/* Bizooma Accessibility Layer */}
              <Route path="/accessibility-layer" element={<AccessibilityLayerPage />} />
              <Route path="/accessibility/signup" element={<AccessibilitySignup />} />
              <Route path="/accessibility/reset-password" element={<AccessibilityResetPassword />} />
              <Route path="/accessibility/checkout-success" element={<AccessibilityCheckoutSuccess />} />
              <Route path="/accessibility" element={<AccessibilityLayout />}>
                <Route index element={<AccessibilityDashboard />} />
                <Route path="dashboard" element={<AccessibilityDashboard />} />
                <Route path="websites" element={<AccessibilityWebsites />} />
                <Route path="scans" element={<AccessibilityScans />} />
                <Route path="compliance" element={<AccessibilityCompliance />} />
                <Route path="widget" element={<AccessibilityWidgetPage />} />
                <Route path="issues" element={<AccessibilityIssues />} />
                <Route path="ai" element={<AccessibilityAi />} />
                <Route path="reports" element={<AccessibilityReports />} />
                <Route path="profile" element={<AccessibilityProfile />} />
                <Route path="billing" element={<AccessibilityBilling />} />
              </Route>
              
              {/* Momentum Campaigns */}
              
              {/* Newsletter Section Pages */}
              <Route path="/marketing" element={<MarketingSectionPage />} />
              <Route path="/code" element={<CodeSectionPage />} />
              <Route path="/ai" element={<AiSectionPage />} />
              <Route path="/insights" element={<InsightsSectionPage />} />
              
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
