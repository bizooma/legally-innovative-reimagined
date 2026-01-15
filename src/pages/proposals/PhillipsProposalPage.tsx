import { Helmet } from "react-helmet-async";
import ProposalHero from "@/components/proposals/ProposalHero";
import GoogleGrantSection from "@/components/proposals/GoogleGrantSection";
import VideoChatbotSection from "@/components/proposals/VideoChatbotSection";
import ProposalValueProp from "@/components/proposals/ProposalValueProp";
import ProposalDownloadCTA from "@/components/proposals/ProposalDownloadCTA";
import Footer from "@/components/Footer";

const PhillipsProposalPage = () => {
  return (
    <>
      <Helmet>
        <title>Proposal for Phillips Foundation | Bizooma</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-pink-50">
        <ProposalHero 
          clientName="Phillips Foundation"
          subtitle="A Strategic Partnership for Digital Growth & Community Impact"
        />
        <GoogleGrantSection />
        <VideoChatbotSection />
        <ProposalValueProp />
        <ProposalDownloadCTA 
          bucketName="proposals"
          fileName="phillips-proposal.pdf"
          displayName="Phillips Foundation Proposal.pdf"
        />
        <Footer />
      </div>
    </>
  );
};

export default PhillipsProposalPage;
