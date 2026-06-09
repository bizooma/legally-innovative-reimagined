import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, ArrowLeft, FileSpreadsheet } from "lucide-react";
import { useFileDownload } from "@/hooks/useFileDownload";

// TODO: replace these filenames once the actual spreadsheets are uploaded
// to the `downloads` bucket in Supabase Storage.
const FILES = [
  {
    fileName: "law-firm-ai-audit.xlsx",
    displayName: "Law-Firm-AI-Audit.xlsx",
    label: "Law Firm AI Audit",
  },
  {
    fileName: "ai-workflow-implementation-tracker.xlsx",
    displayName: "AI-Workflow-Implementation-Tracker.xlsx",
    label: "AI Workflow Implementation Tracker",
  },
];

export default function AiAuditSuccess() {
  const { isDownloading, downloadFile } = useFileDownload();

  return (
    <div className="min-h-screen bg-[#fbf8f3] flex items-center justify-center px-4 py-16">
      <Helmet>
        <title>Thank you — AI Audit + Implementation Toolkit</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-xl w-full bg-white rounded-2xl border-2 border-[#d97757] shadow-lg p-10 text-center">
        <div className="h-14 w-14 rounded-full bg-[#d97757]/15 text-[#d97757] inline-flex items-center justify-center mb-5">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-legal-dark mb-3">Payment received</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Download both spreadsheets below — you can return to this page anytime to grab them again.
        </p>

        <div className="space-y-3 mb-6">
          {FILES.map((f) => (
            <Button
              key={f.fileName}
              size="lg"
              disabled={isDownloading}
              className="w-full bg-[#d97757] hover:bg-[#b85d3f] text-white justify-between"
              onClick={() => downloadFile("downloads", f.fileName, f.displayName)}
            >
              <span className="inline-flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" /> {f.label}
              </span>
              <Download className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mb-6">
          A copy of your receipt has been sent to the email used at checkout.
        </p>
        <Link to="/ai-audit" className="text-sm text-[#d97757] hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Back to AI Audit
        </Link>
      </div>
    </div>
  );
}