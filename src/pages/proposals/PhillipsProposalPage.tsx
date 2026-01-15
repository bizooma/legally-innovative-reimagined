import ProposalLayout from "@/components/proposals/ProposalLayout";
import ProposalHero from "@/components/proposals/ProposalHero";
import GoogleGrantSection from "@/components/proposals/GoogleGrantSection";
import VideoChatbotSection from "@/components/proposals/VideoChatbotSection";
import ProposalValueProp from "@/components/proposals/ProposalValueProp";
import ProposalDownloadCTA from "@/components/proposals/ProposalDownloadCTA";

const PhillipsProposalPage = () => {
  return (
    <ProposalLayout clientName="Phillips Law Group Foundation">
      <ProposalHero 
        clientName="Phillips Law Group Foundation"
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
    </ProposalLayout>
  );
};

export default PhillipsProposalPage;
