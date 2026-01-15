import { Download, FileText, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFileDownload } from "@/hooks/useFileDownload";

interface ProposalDownloadCTAProps {
  bucketName: string;
  fileName: string;
  displayName: string;
}

const ProposalDownloadCTA = ({ bucketName, fileName, displayName }: ProposalDownloadCTAProps) => {
  const { isDownloading, downloadFile } = useFileDownload();

  const handleDownload = async () => {
    await downloadFile(bucketName, fileName, displayName);
  };

  return (
    <section className="py-20 px-4 bg-pink-50">
      <div className="max-w-4xl mx-auto">
        {/* Download card */}
        <Card className="bg-gradient-to-br from-legal-primary/10 via-rose-100 to-pink-100 border-legal-primary/20 mb-12 shadow-sm">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-legal-primary/20 border border-legal-primary/30 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-legal-primary" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Download Your Complete Proposal
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Get a detailed PDF with full pricing, terms, and additional information about our partnership.
            </p>
            
            <Button 
              onClick={handleDownload}
              disabled={isDownloading}
              size="lg"
              className="bg-legal-primary hover:bg-legal-primary/90 text-white px-8 py-6 text-lg"
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Proposal (PDF)
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Contact section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Ready to Get Started?</h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a 
              href="mailto:hello@bizooma.com" 
              className="flex items-center gap-2 text-gray-400 hover:text-legal-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>hello@bizooma.com</span>
            </a>
            <span className="hidden sm:inline text-gray-600">|</span>
            <a 
              href="tel:+19042586The" 
              className="flex items-center gap-2 text-gray-400 hover:text-legal-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>(904) 258-6397</span>
            </a>
          </div>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-legal-primary/50 text-legal-primary hover:bg-legal-primary/10"
            asChild
          >
            <a href="https://calendly.com/bizooma" target="_blank" rel="noopener noreferrer">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Consultation
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProposalDownloadCTA;
