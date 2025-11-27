import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FileDown, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateAuditPDF } from "@/utils/pdfGenerator";
import { LocalSeoResults } from "./LocalSeoResults";
import { AeoResults } from "./AeoResults";
import { VoiceSeoResults } from "./VoiceSeoResults";
import { GbpResults } from "./GbpResults";
import { AuditScoreCard } from "./AuditScoreCard";
import { PreAuditQuestionnaire } from "./PreAuditQuestionnaire";
import { AuditProgressIndicator } from "./AuditProgressIndicator";
import { AuditSummaryStats } from "./AuditSummaryStats";
import { AuditScoreChart } from "./AuditScoreChart";
import { AuditChatWindow } from "./AuditChatWindow";

interface AuditDashboardProps {
  accessCode: string;
  onLogout: () => void;
}

export const AuditDashboard = ({ accessCode, onLogout }: AuditDashboardProps) => {
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  // Determine current progress step
  const getCurrentStep = (): 1 | 2 | 3 => {
    if (hasResults) return 3;
    if (accessCodeData.questionnaire_completed) return 2;
    return 1;
  };

  const handleQuestionnaireComplete = () => {
    // Invalidate and refetch the access code data
    queryClient.invalidateQueries({ queryKey: ["audit-access-code", accessCode] });
  };

  const handleRunAudit = async () => {
    setIsRunningAudit(true);
    try {
      toast({
        title: "Audit Starting",
        description: "The comprehensive SEO audit is now running. This may take a few minutes.",
      });

      const { data, error } = await supabase.functions.invoke('run-seo-audit', {
        body: { access_code_id: accessCodeData.id },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Audit Complete",
        description: `Successfully analyzed ${data.results_count} audit items. Refresh to see results.`,
      });

      // Refresh the audit results
      window.location.reload();
    } catch (error) {
      console.error('Audit error:', error);
      toast({
        title: "Error",
        description: "Failed to start the audit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRunningAudit(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!auditResults || auditResults.length === 0) {
      toast({
        title: "No Results",
        description: "Please run an audit first before downloading the report.",
        variant: "destructive",
      });
      return;
    }

    try {
      generateAuditPDF(auditResults, accessCodeData, overallScore);
      toast({
        title: "PDF Downloaded",
        description: "Your audit report has been downloaded successfully.",
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

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
          <Button onClick={handleRunAudit} disabled={isRunningAudit} size="sm">
            <PlayCircle className="w-4 h-4 mr-2" />
            {isRunningAudit ? "Running..." : hasResults ? "Re-run Audit" : "Run Audit"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadPDF} disabled={!hasResults}>
            <FileDown className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <AuditProgressIndicator currentStep={getCurrentStep()} isRunning={isRunningAudit} />

      {hasResults ? (
        <>
          <AuditScoreCard score={overallScore} grade={getGrade(overallScore)} />
          
          <AuditSummaryStats results={auditResults || []} />

          <AuditScoreChart results={auditResults || []} />

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
      ) : !accessCodeData.questionnaire_completed ? (
        <PreAuditQuestionnaire 
          accessCodeId={accessCodeData.id} 
          onComplete={handleQuestionnaireComplete}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Ready to Audit</CardTitle>
            <CardDescription>
              Click the button below to start the comprehensive SEO, AEO, and Voice SEO audit for this website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm space-y-1">
                <p><strong>Website:</strong> {accessCodeData.website_url}</p>
                {accessCodeData.gbp_url && (
                  <p><strong>Google Business Profile:</strong> {accessCodeData.gbp_url}</p>
                )}
              </div>
              <Button 
                onClick={handleRunAudit} 
                disabled={isRunningAudit} 
                size="lg" 
                className="w-full"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                {isRunningAudit ? "Running Audit..." : "Start Audit"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Chat Assistant - only show when results exist */}
      {hasResults && <AuditChatWindow accessCodeId={accessCodeData.id} />}
    </div>
  );
};
