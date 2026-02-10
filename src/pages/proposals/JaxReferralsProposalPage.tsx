import ProposalLayout from "@/components/proposals/ProposalLayout";
import ProposalHero from "@/components/proposals/ProposalHero";
import WebsiteUpdatesSection from "@/components/proposals/WebsiteUpdatesSection";
import JaxReferralsValueProp from "@/components/proposals/JaxReferralsValueProp";
import ProposalDownloadCTA from "@/components/proposals/ProposalDownloadCTA";

const JaxReferralsProposalPage = () => {
  return (
    <ProposalLayout clientName="JaxReferrals">
      <ProposalHero 
        clientName="JaxReferrals"
        subtitle="Version 2"
      />
      <WebsiteUpdatesSection />
      <JaxReferralsValueProp />
      <ProposalDownloadCTA 
        bucketName="proposals"
        fileName="jaxreferrals-proposal.pdf"
        displayName="JaxReferrals Proposal.pdf"
      />
    </ProposalLayout>
  );
};

export default JaxReferralsProposalPage;
