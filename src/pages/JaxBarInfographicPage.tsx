import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JaxBarInfographicPage = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Legal Industry Statistics Infographic | Bizooma</title>
        <meta 
          name="description" 
          content="Printable infographic showing key statistics on business loss in the legal industry. Download and share with your firm." 
        />
      </Helmet>

      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden bg-muted/50 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/jax-bar-association')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
          <div className="flex gap-2">
            <Button onClick={handlePrint} className="bg-legal-primary hover:bg-legal-primary/90">
              <Printer className="mr-2 h-4 w-4" />
              Print Infographic
            </Button>
          </div>
        </div>
      </div>

      {/* Infographic Content - Optimized for print */}
      <div className="bg-white min-h-screen print:min-h-0">
        <div className="max-w-4xl mx-auto p-8 print:p-4">
          
          {/* Header */}
          <div className="text-center mb-8 print:mb-6">
            <h1 className="text-3xl print:text-2xl font-bold text-gray-900 mb-2">
              The Cost of Missed Opportunities
            </h1>
            <p className="text-lg print:text-base text-gray-600">
              Key Statistics Every Law Firm Should Know
            </p>
            <div className="mt-4 h-1 w-32 bg-gradient-to-r from-red-500 via-amber-500 to-green-500 mx-auto rounded-full"></div>
          </div>

          {/* Section 1: Unanswered Calls Crisis */}
          <div className="mb-8 print:mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">1</span>
              </div>
              <h2 className="text-xl print:text-lg font-bold text-gray-900">Unanswered Calls Crisis</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:gap-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-red-600">35%</p>
                <p className="text-xs text-gray-600 mt-1">of calls go unanswered during business hours</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-red-600">$109B</p>
                <p className="text-xs text-gray-600 mt-1">lost annually across legal industry</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-red-600">28%</p>
                <p className="text-xs text-gray-600 mt-1">missed call rate (2nd highest industry)</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-red-600">195M</p>
                <p className="text-xs text-gray-600 mt-1">calls unanswered each year</p>
              </div>
            </div>
          </div>

          {/* Section 2: Client Behavior */}
          <div className="mb-8 print:mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 font-bold text-sm">2</span>
              </div>
              <h2 className="text-xl print:text-lg font-bold text-gray-900">Client Behavior</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:gap-3">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-amber-600">78%</p>
                <p className="text-xs text-gray-600 mt-1">hire the first firm that responds</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-amber-600">72%</p>
                <p className="text-xs text-gray-600 mt-1">move on if no response in 24 hrs</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-amber-600">80%</p>
                <p className="text-xs text-gray-600 mt-1">hang up when reaching voicemail</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-amber-600">65%</p>
                <p className="text-xs text-gray-600 mt-1">contact 2-5 firms before choosing</p>
              </div>
            </div>
          </div>

          {/* Section 3: Online Lead Response */}
          <div className="mb-8 print:mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <h2 className="text-xl print:text-lg font-bold text-gray-900">Online Lead Response</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 print:gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-blue-600">26%</p>
                <p className="text-xs text-gray-600 mt-1">never respond to online leads</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-blue-600">39%</p>
                <p className="text-xs text-gray-600 mt-1">take 2+ hours or never respond</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-green-600">7x</p>
                <p className="text-xs text-gray-600 mt-1">more likely to convert within 1 hour</p>
              </div>
            </div>
          </div>

          {/* Section 4: Revenue Impact */}
          <div className="mb-8 print:mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">4</span>
              </div>
              <h2 className="text-xl print:text-lg font-bold text-gray-900">Revenue Impact (Personal Injury Example)</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 print:gap-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-green-600">$7.2M</p>
                <p className="text-xs text-gray-600 mt-1">potential annual revenue loss</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-green-600">$1.79M</p>
                <p className="text-xs text-gray-600 mt-1">conservative estimate lost/year</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-green-600">$649</p>
                <p className="text-xs text-gray-600 mt-1">avg cost per wasted lead</p>
              </div>
            </div>
          </div>

          {/* Section 5: Conversion Impact */}
          <div className="mb-8 print:mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">5</span>
              </div>
              <h2 className="text-xl print:text-lg font-bold text-gray-900">Conversion Impact</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 print:gap-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-purple-600">2.1%</p>
                <p className="text-xs text-gray-600 mt-1">avg website conversion rate</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-purple-600">98/100</p>
                <p className="text-xs text-gray-600 mt-1">visitors leave without action</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 print:p-3 text-center">
                <p className="text-3xl print:text-2xl font-bold text-purple-600">14%</p>
                <p className="text-xs text-gray-600 mt-1">attend consultations before retaining</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 print:pt-4 mt-8 print:mt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-gray-900">Bizooma</p>
                <p className="text-xs text-gray-500">Digital Marketing for Law Firms</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Jacksonville Bar Association CLE • December 9, 2025
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-xs text-gray-500">bizooma.com/jax-bar-association</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </>
  );
};

export default JaxBarInfographicPage;
