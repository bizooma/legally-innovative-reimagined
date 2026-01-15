import { Helmet } from "react-helmet-async";
import { ReactNode } from "react";
import Footer from "@/components/Footer";

interface ProposalLayoutProps {
  clientName: string;
  children: ReactNode;
  pageTitle?: string;
}

/**
 * ProposalLayout - A reusable template for client proposal pages
 * 
 * Features:
 * - Automatic noindex/nofollow meta tags (keeps proposals private from search engines)
 * - Consistent pink background styling
 * - Footer included automatically
 * 
 * Usage:
 * ```tsx
 * <ProposalLayout clientName="Client Name">
 *   <ProposalHero clientName="Client Name" subtitle="..." />
 *   <GoogleGrantSection />
 *   <VideoChatbotSection />
 *   <ProposalValueProp />
 *   <ProposalDownloadCTA bucketName="proposals" fileName="..." displayName="..." />
 * </ProposalLayout>
 * ```
 */
const ProposalLayout = ({ clientName, children, pageTitle }: ProposalLayoutProps) => {
  const title = pageTitle || `Proposal for ${clientName} | Bizooma`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-pink-50">
        {children}
        <Footer />
      </div>
    </>
  );
};

export default ProposalLayout;
