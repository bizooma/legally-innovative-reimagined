import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FileDown } from "lucide-react";
import { LocalSeoResults } from "./LocalSeoResults";
import { AeoResults } from "./AeoResults";
import { VoiceSeoResults } from "./VoiceSeoResults";
import { GbpResults } from "./GbpResults";
import { AuditScoreCard } from "./AuditScoreCard";

interface AuditDashboardProps {
  accessCode: string;
  onLogout: () => void;
}

export const AuditDashboard = ({ accessCode, onLogout }: AuditDashboardProps) => {
  const { data: accessCodeData, isLoading: isLoadingCode } = useQuery({
    queryKey: ["audit-access-code", accessCode],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("audit_access_codes")
        .select("*")
        .eq("code", accessCode)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: auditResults, isLoading: isLoadingResults } = useQuery({
    queryKey: ["audit-results", accessCodeData?.id],
    queryFn: async () => {
      if (!accessCodeData?.id) return [];

      const { data, error } = await supabase
        .from("audit_results")
        .select("*")
        .eq("access_code_id", accessCodeData.id);

      if (error) throw error;
      return data;
    },
    enabled: !!accessCodeData?.id,
  });

  if (isLoadingCode) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading audit dashboard...</p>
        </div>
      </div>
    );
  }

  if (!accessCodeData) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Invalid or expired access code.</p>
        <Button onClick={onLogout} variant="outline" className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  const calculateOverallScore = () => {
    if (!auditResults || auditResults.length === 0) return 0;
    const total = auditResults.reduce((sum, result) => sum + result.score, 0);
    return Math.round(total / auditResults.length);
  };

  const getGrade = (score: number) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  const overallScore = calculateOverallScore();
  const hasResults = auditResults && auditResults.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{accessCodeData.client_name}</h1>
          <p className="text-muted-foreground">{accessCodeData.website_url}</p>
          {accessCodeData.gbp_url && (
            <p className="text-sm text-muted-foreground">GBP: {accessCodeData.gbp_url}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {hasResults ? (
        <>
          <AuditScoreCard score={overallScore} grade={getGrade(overallScore)} />

          <Tabs defaultValue="local-seo" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="local-seo">Local SEO</TabsTrigger>
              <TabsTrigger value="aeo">AEO</TabsTrigger>
              <TabsTrigger value="voice-seo">Voice SEO</TabsTrigger>
              <TabsTrigger value="gbp">GBP Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="local-seo">
              <LocalSeoResults results={auditResults?.filter(r => r.audit_type === "local_seo") || []} />
            </TabsContent>

            <TabsContent value="aeo">
              <AeoResults results={auditResults?.filter(r => r.audit_type === "aeo") || []} />
            </TabsContent>

            <TabsContent value="voice-seo">
              <VoiceSeoResults results={auditResults?.filter(r => r.audit_type === "voice_seo") || []} />
            </TabsContent>

            <TabsContent value="gbp">
              <GbpResults results={auditResults?.filter(r => r.audit_type === "gbp") || []} />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Audit Results Yet</CardTitle>
            <CardDescription>
              Audit results will appear here once the analysis is complete. Please check back soon.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};
