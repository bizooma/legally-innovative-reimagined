import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, ArrowLeft } from "lucide-react";

export default function ClaudeCoworkSuccess() {
  const [params] = useSearchParams();
  const product = params.get("product");
  const isLaw = product === "law";
  const productName = isLaw ? "Law Firm CoWork OS" : "Nonprofit CoWork OS";

  return (
    <div className="min-h-screen bg-[#fbf8f3] flex items-center justify-center px-4 py-16">
      <Helmet>
        <title>Thank you — {productName}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-xl w-full bg-white rounded-2xl border-2 border-[#d97757] shadow-lg p-10 text-center">
        <div className="h-14 w-14 rounded-full bg-[#d97757]/15 text-[#d97757] inline-flex items-center justify-center mb-5">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-legal-dark mb-3">Payment received</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for purchasing <span className="font-semibold text-legal-dark">{productName}</span>. Download your CoWork OS folder below and follow the setup guide inside.
        </p>
        <Button
          size="lg"
          className="w-full bg-[#d97757] hover:bg-[#b85d3f] text-white mb-3"
          onClick={() => {
            // TODO: replace with signed download URL once asset is uploaded
            alert("Download link coming soon. We'll email it to the address on your receipt.");
          }}
        >
          Download {productName} <Download className="h-4 w-4 ml-2" />
        </Button>
        <p className="text-xs text-muted-foreground mb-6">
          A copy of your receipt has been sent to the email used at checkout.
        </p>
        <Link to="/claude-cowork" className="text-sm text-[#d97757] hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Back to Claude Cowork
        </Link>
      </div>
    </div>
  );
}