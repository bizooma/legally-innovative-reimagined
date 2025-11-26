import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { AuditAccessModal } from "@/components/audit/AuditAccessModal";
import { AuditDashboard } from "@/components/audit/AuditDashboard";

export default function SeoAuditPage() {
  const [accessCode, setAccessCode] = useState<string | null>(null);

  useEffect(() => {
    // Check if code exists in sessionStorage
    const storedCode = sessionStorage.getItem("audit_access_code");
    if (storedCode) {
      setAccessCode(storedCode);
    }
  }, []);

  const handleAccessGranted = (code: string) => {
    sessionStorage.setItem("audit_access_code", code);
    setAccessCode(code);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("audit_access_code");
    setAccessCode(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {!accessCode ? (
          <AuditAccessModal onAccessGranted={handleAccessGranted} />
        ) : (
          <AuditDashboard accessCode={accessCode} onLogout={handleLogout} />
        )}
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
}
