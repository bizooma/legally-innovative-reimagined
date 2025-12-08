import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMarketingKPIs } from "@/hooks/useMarketingKPIs";
import { useMarketingPlan } from "@/hooks/useMarketingPlan";
import { MarketingAIChat } from "./MarketingAIChat";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart as RechartsBarChart, Bar } from "recharts";
import { 
  FileText, BookOpen, Grid, BarChart, Users, Target, Lightbulb, 
  Share2, DollarSign, TrendingUp, Calendar, CheckCircle, AlertCircle, 
  Sparkles, AlertTriangle, Megaphone, Search, MousePointerClick, Star,
  BookMarked, Trophy, Palette, ImageIcon, Type, Award, Building2, Globe, X, Download, Presentation
} from "lucide-react";
import { generateMarketingPlanPdf } from "@/utils/marketingPlanPdfExport";
import { toast } from "sonner";

interface ClientMarketingPlanProps {
  client: any;
}

const ClientMarketingPlan = ({ client }: ClientMarketingPlanProps) => {
  const [activeSection, setActiveSection] = useState<string>("executive-summary");
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  
  // Fetch real-time KPI data from Supabase
  const { 
    kpis, 
    isLoading: kpisLoading, 
    getMetricByName, 
    getMetricsByBrand,
    calculateProgress 
  } = useMarketingKPIs({ 
    clientId: client.id, 
    autoRefresh: true 
  });

  // Fetch marketing plan from database
  const { marketingPlan, isLoading: planLoading, hasMarketingPlan } = useMarketingPlan({ 
    clientId: client.id 
  });

  // Show loading state
  if (planLoading || kpisLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Loading marketing plan...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If no marketing plan exists for this client, show placeholder
  if (!hasMarketingPlan || !marketingPlan) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Megaphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Marketing Plan Not Available</h3>
            <p className="text-sm text-muted-foreground">
              This client does not have a marketing plan configured yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sections = [
    { id: "executive-summary", label: "Summary", icon: FileText },
    { id: "kpi-dashboard", label: "KPIs", icon: BarChart },
    { id: "swot", label: "SWOT", icon: Grid },
    { id: "market-analysis", label: "Market", icon: BarChart },
    { id: "objectives", label: "Objectives", icon: Target },
    { id: "brand-guidelines", label: "Brand", icon: Palette },
    { id: "budget", label: "Budget", icon: DollarSign },
    { id: "timeline", label: "Timeline", icon: Calendar },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Use marketing plan data from database
  const swotData = {
    strengths: marketingPlan.swot_analysis.strengths || [],
    weaknesses: marketingPlan.swot_analysis.weaknesses || [],
    opportunities: marketingPlan.swot_analysis.opportunities || [],
    threats: marketingPlan.swot_analysis.threats || []
  };

  const objectives = [
    { title: "Increase qualified leads", target: "50 leads/month", progress: 65 },
    { title: "Top-3 rankings", target: "10 high-value keywords", progress: 40 },
    { title: "Grow website traffic", target: "40% increase", progress: 55 },
    { title: "Boost brand authority", target: "50% branded search increase", progress: 30 },
    { title: "Win With Casey launch", target: "First-page rankings for 5 PI keywords", progress: 20 }
  ];

  const budgetItems = [
    { category: "PLG SEO & Content", monthly: "$3,000", annual: "$36,000", description: "Content creation, link building" },
    { category: "Win With Casey SEO & Content", monthly: "$4,000", annual: "$48,000", description: "Multi-domain content strategy" },
    { category: "PLG PPC", monthly: "$4,000", annual: "$48,000", description: "Google Ads, Local Services Ads" },
    { category: "Win With Casey PPC", monthly: "$5,000", annual: "$60,000", description: "Personal injury ad campaigns" },
    { category: "Website & Tech Stack", monthly: "$1,000", annual: "$12,000", description: "Hosting, plugins, analytics" },
    { category: "Video Production", monthly: "$2,000", annual: "$24,000", description: "Quarterly video shoots" }
  ];

  const kpiDefinitions = [
    { name: "Leads", description: "Total number of qualified leads generated per month" },
    { name: "Cost Per Lead (CPL)", description: "The average cost to acquire a new lead" },
    { name: "Conversion Rate", description: "The percentage of website visitors who contact the firm" },
    { name: "Search Engine Rankings", description: "The firm's position on Google for target keywords" },
    { name: "Organic Traffic", description: "The number of visitors from organic search results" },
    { name: "Branded Search Volume", description: "Number of people searching for 'Puget Law Group'" },
    { name: "Client Acquisition Cost (CAC)", description: "Total marketing cost to acquire a new client, tracked separately for PLG and Win With Casey" },
    { name: "Win With Casey Launch Metrics", description: "Track domain authority, keyword rankings, and lead generation for the four new personal injury domains" }
  ];

  const competitors = [
    { firm: "Nate Webb (Webb Law Firm)", years: "20+", size: "Solo", focus: "DUI/DWI, Criminal Defense", usp: "98% claimed success rate", rating: "4.9/5.0" },
    { firm: "Will & Will", years: "18", size: "2", focus: "Criminal Defense, DUI, DV", usp: "Husband-wife team, former prosecutor", rating: "5.0/5.0" },
    { firm: "Tim Milios Defense", years: "25+", size: "2", focus: "DUI Defense (primary)", usp: "Exclusive DUI focus since 1996", rating: "5.0/5.0" },
    { firm: "Aaron J. Wolff", years: "26", size: "Solo", focus: "DUI Defense, DWI", usp: "Former DUI prosecutor, hyper-specialized", rating: "5.0/5.0" },
    { firm: "Black & Askerov", years: "16", size: "3", focus: "Federal Crimes, White Collar", usp: "Federal and appellate expertise", rating: "4.9/5.0" },
    { firm: "Hale Law Enterprises", years: "27", size: "Solo", focus: "Criminal Defense, DUI, DV", usp: "27+ years, thousands of cases", rating: "5.0/5.0" },
    { firm: "JGR Law Offices", years: "8", size: "Solo", focus: "DUI/Traffic, Criminal Defense", usp: "Focus on military/clearances", rating: "4.9/5.0" },
    { firm: "Quietus Law Group", years: "1", size: "1-2", focus: "Family Law, DUI", usp: "LGBTQIA+ Ally, transparent fees", rating: "5.0/5.0" },
    { firm: "Ashbach Law Offices", years: "17", size: "Small", focus: "DUI/DWI, Domestic Violence", usp: "55% DV specialization", rating: "4.5/5.0" },
    { firm: "Blair & Kim", years: "20", size: "3", focus: "Criminal Defense, DUI, DV", usp: "Former prosecutor, Judge Pro-Tempore", rating: "4.8/5.0" }
  ];

  // Market share data
  const marketShareData = [
    { name: "Puget Law Group", value: 18, color: "hsl(var(--primary))" },
    { name: "Competitor A", value: 25, color: "hsl(0,37%,25%)" },
    { name: "Competitor B", value: 22, color: "hsl(0,37%,35%)" },
    { name: "Competitor C", value: 15, color: "hsl(0,37%,45%)" },
    { name: "Other Firms", value: 20, color: "hsl(var(--muted))" },
  ];

  // Client acquisition trends data
  const acquisitionTrendsData = [
    { month: "Jan", criminalDefense: 12, personalInjury: 5, total: 17 },
    { month: "Feb", criminalDefense: 15, personalInjury: 7, total: 22 },
    { month: "Mar", criminalDefense: 18, personalInjury: 10, total: 28 },
    { month: "Apr", criminalDefense: 20, personalInjury: 14, total: 34 },
    { month: "May", criminalDefense: 22, personalInjury: 18, total: 40 },
    { month: "Jun", criminalDefense: 25, personalInjury: 22, total: 47 },
    { month: "Jul", criminalDefense: 27, personalInjury: 26, total: 53 },
    { month: "Aug", criminalDefense: 28, personalInjury: 30, total: 58 },
    { month: "Sep", criminalDefense: 30, personalInjury: 35, total: 65 },
    { month: "Oct", criminalDefense: 32, personalInjury: 40, total: 72 },
    { month: "Nov", criminalDefense: 33, personalInjury: 45, total: 78 },
    { month: "Dec", criminalDefense: 35, personalInjury: 50, total: 85 },
  ];

  // Budget allocation data
  const budgetAllocationData = [
    { category: "Website & SEO", plg: 48000, winWithCasey: 42000, total: 90000 },
    { category: "Content Marketing", plg: 18000, winWithCasey: 24000, total: 42000 },
    { category: "Paid Advertising", plg: 12000, winWithCasey: 18000, total: 30000 },
    { category: "Social Media", plg: 9000, winWithCasey: 12000, total: 21000 },
    { category: "Email Marketing", plg: 4800, winWithCasey: 7200, total: 12000 },
    { category: "Analytics & Tools", plg: 4200, winWithCasey: 4800, total: 9000 },
  ];

  const timelinePhases = [
    {
      phase: "Months 1-3: Foundation and Setup",
      color: "bg-primary/5 border-primary/20",
      activities: [
        "Conduct comprehensive website audit for technical SEO issues",
        "Optimize Google Business Profile with updated info and photos",
        "Complete keyword research for highest-value search terms",
        "Develop 6-month content calendar for both PLG and Win With Casey",
        "Launch initial PPC campaigns for high-priority keywords",
        "Domain acquisition and hosting setup for Win With Casey domains"
      ]
    },
    {
      phase: "Months 4-6: Content Development and SEO Expansion",
      color: "bg-primary/10 border-primary/30",
      activities: [
        "Produce comprehensive legal guides as lead magnets",
        "Establish regular blog publishing schedule (2+ posts/week)",
        "Create first round of professional video content",
        "Launch winwithcasey.com and develop core service pages",
        "Implement cross-domain linking strategy for Win With Casey ecosystem",
        "Initial PPC campaigns for personal injury keywords"
      ]
    },
    {
      phase: "Months 7-9: Optimization and Expansion",
      color: "bg-[hsl(0,37%,15%)]/5 border-[hsl(0,37%,15%)]/20",
      activities: [
        "Analyze and optimize PPC campaigns based on performance data",
        "Launch retargeting campaigns for non-converting visitors",
        "Launch caseyfights.com, caseyatbat.com, and caseyarbenz.com",
        "Voice search optimization across all Win With Casey domains",
        "Expand content strategy to include guest posting"
      ]
    },
    {
      phase: "Months 10-12: Scaling and Refinement",
      color: "bg-[hsl(0,37%,15%)]/10 border-[hsl(0,37%,15%)]/30",
      activities: [
        "Scale successful initiatives and allocate resources to high-performing content",
        "Enhance presence on legal directories (Avvo, Justia, Super Lawyers)",
        "Develop and launch formal client referral program",
        "Comprehensive performance analysis of Win With Casey initiative",
        "Update marketing plan based on year-long insights"
      ]
    }
  ];

  const handleDownloadPdf = () => {
    try {
      toast.loading('Generating PDF...');
      generateMarketingPlanPdf({
        marketingPlan,
        clientName: client.company_name,
        kpis
      });
      toast.dismiss();
      toast.success('Marketing plan PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.dismiss();
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className={`${isPresentationMode ? 'fixed inset-0 z-50 bg-background overflow-y-auto' : 'space-y-8 bg-background'}`}>
      {/* Professional Header */}
      <div className="border-b bg-card">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">
                {marketingPlan.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(marketingPlan.updated_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setIsPresentationMode(!isPresentationMode)}
                variant={isPresentationMode ? "default" : "outline"}
                className="gap-2 h-10"
              >
                {isPresentationMode ? (
                  <>
                    <X className="h-4 w-4" />
                    Exit
                  </>
                ) : (
                  <>
                    <Presentation className="h-4 w-4" />
                    Present
                  </>
                )}
              </Button>
              <Button 
                onClick={handleDownloadPdf}
                variant="outline"
                className="gap-2 h-10"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Section Navigation */}
      {!isPresentationMode && (
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
          <div className="px-8 py-3">
            <div className="flex gap-1 overflow-x-auto">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                      activeSection === section.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="px-8 space-y-8">

        {/* AI Marketing Strategist Chat */}
        {!isPresentationMode && <MarketingAIChat clientId={client.id} />}

        {/* Executive Summary */}
        {(isPresentationMode || activeSection === "executive-summary") && (
        <div id="executive-summary">
          <Card className="border">
            <CardHeader className="border-b bg-muted/20">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-foreground" />
                <CardTitle className="text-xl font-semibold">Executive Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-foreground">
                {marketingPlan.executive_summary.strengths}
              </p>
              {marketingPlan.executive_summary.gaps && (
                <div className="p-5 border-l-4 border-primary bg-muted/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Areas for Improvement</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {marketingPlan.executive_summary.gaps}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {marketingPlan.target_audiences && marketingPlan.target_audiences.length > 0 && (
                  <div className="p-5 border bg-card">
                    <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Target Audiences</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {marketingPlan.target_audiences.slice(0, 3).map((audience, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{audience.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {marketingPlan.marketing_objectives && marketingPlan.marketing_objectives.length > 0 && (
                  <div className="p-5 border bg-card">
                    <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Key Objectives</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {marketingPlan.marketing_objectives.slice(0, 3).map((obj, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{obj.objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        )}

        {/* KPI Dashboard */}
        {!isPresentationMode && activeSection === "kpi-dashboard" && (
        <div id="kpi-dashboard">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Key Performance Indicators
              {kpisLoading && <span className="text-sm text-muted-foreground font-normal">(Loading...)</span>}
            </h2>
          </div>
          
          {/* Live Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Monthly Leads */}
            {(() => {
              const metric = getMetricByName('monthly_leads');
              const value = metric?.metric_value || 42;
              const target = metric?.target_value || 50;
              const progress = calculateProgress(value, target);
              const changePct = metric?.metadata?.change_pct || 15;
              return (
                <Card className="border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <Badge variant="outline" className={changePct >= 0 ? "border-success text-success" : "border-destructive text-destructive"}>
                        {changePct >= 0 ? '+' : ''}{changePct}%
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
                    <div className="text-sm text-muted-foreground">Monthly Leads</div>
                  <div className="text-xs text-muted-foreground">Target: {target}</div>
                  <Progress value={progress} className="mt-2 h-1.5" />
                </CardContent>
              </Card>
            );
          })()}

          {/* Conversion Rate */}
          {(() => {
            const metric = getMetricByName('conversion_rate');
            const value = metric?.metric_value || 4.2;
            const target = metric?.target_value || 5.0;
            const progress = calculateProgress(value, target);
            const changePct = metric?.metadata?.change_pct || 8;
            return (
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="outline" className={changePct >= 0 ? "border-success text-success" : "border-destructive text-destructive"}>
                      {changePct >= 0 ? '+' : ''}{changePct}%
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{value}%</div>
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  <div className="text-xs text-muted-foreground">Target: {target}%</div>
                  <Progress value={progress} className="mt-3 h-1.5" />
                </CardContent>
              </Card>
            );
          })()}

          {/* Organic Traffic */}
          {(() => {
            const metric = getMetricByName('organic_traffic');
            const value = metric?.metric_value || 8420;
            const target = metric?.target_value || 12000;
            const progress = calculateProgress(value, target);
            const changePct = metric?.metadata?.change_pct || 32;
            return (
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="outline" className={changePct >= 0 ? "border-success text-success" : "border-destructive text-destructive"}>
                      {changePct >= 0 ? '+' : ''}{changePct}%
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{value.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Monthly Visitors</div>
                  <div className="text-xs text-muted-foreground">Target: {target.toLocaleString()}</div>
                  <Progress value={progress} className="mt-3 h-1.5" />
                </CardContent>
              </Card>
            );
          })()}

          {/* Cost Per Lead */}
          {(() => {
            const metric = getMetricByName('cost_per_lead');
            const value = metric?.metric_value || 185;
            const target = metric?.target_value || 150;
            const progress = calculateProgress(target, value);
            const changePct = metric?.metadata?.change_pct || -5;
            return (
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="outline" className={changePct <= 0 ? "border-success text-success" : "border-destructive text-destructive"}>
                      {changePct >= 0 ? '+' : ''}{changePct}%
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">${value}</div>
                  <div className="text-sm text-muted-foreground">Cost Per Lead</div>
                  <div className="text-xs text-muted-foreground">Target: ${target}</div>
                  <Progress value={progress} className="mt-3 h-1.5" />
                </CardContent>
              </Card>
            );
          })()}
        </div>

        {/* Goal Trackers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Puget Law Group Goals */}
          <Card className="border">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Building2 className="h-5 w-5" />
                Puget Law Group - Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const plgKpis = getMetricsByBrand('plg');
                const top3 = getMetricByName('plg_top3_rankings');
                const rating = getMetricByName('google_rating');
                const reviews = getMetricByName('monthly_reviews');
                const searches = getMetricByName('branded_searches');
                
                return [
                  { 
                    goal: "Top 3 Rankings", 
                    current: top3?.metric_value || 4, 
                    target: top3?.target_value || 10, 
                    unit: "keywords", 
                    progress: calculateProgress(top3?.metric_value || 4, top3?.target_value || 10) 
                  },
                  { 
                    goal: "Google Rating", 
                    current: rating?.metric_value || 4.8, 
                    target: rating?.target_value || 5.0, 
                    unit: "stars", 
                    progress: calculateProgress(rating?.metric_value || 4.8, rating?.target_value || 5.0) 
                  },
                  { 
                    goal: "Monthly Reviews", 
                    current: reviews?.metric_value || 28, 
                    target: reviews?.target_value || 40, 
                    unit: "reviews", 
                    progress: calculateProgress(reviews?.metric_value || 28, reviews?.target_value || 40) 
                  },
                  { 
                    goal: "Branded Searches", 
                    current: searches?.metric_value || 1850, 
                    target: searches?.target_value || 3000, 
                    unit: "searches", 
                    progress: calculateProgress(searches?.metric_value || 1850, searches?.target_value || 3000) 
                  },
                ];
              })().map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.goal}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.current} / {item.target} {item.unit}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.progress} className="h-2 flex-1" />
                    <span className="text-xs font-medium text-primary">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Win With Casey Goals */}
          <Card className="border">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Trophy className="h-5 w-5" />
                Win With Casey - Launch Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const wwcKpis = getMetricsByBrand('wwc');
                const domainAuth = getMetricByName('wwc_domain_authority');
                const keywords = getMetricByName('wwc_keyword_rankings');
                const leads = getMetricByName('wwc_monthly_leads');
                const content = getMetricByName('wwc_content_published');
                
                return [
                  { 
                    goal: "Domain Authority", 
                    current: domainAuth?.metric_value || 12, 
                    target: domainAuth?.target_value || 30, 
                    unit: "DA", 
                    progress: calculateProgress(domainAuth?.metric_value || 12, domainAuth?.target_value || 30) 
                  },
                  { 
                    goal: "PI Keyword Rankings", 
                    current: keywords?.metric_value || 2, 
                    target: keywords?.target_value || 5, 
                    unit: "top 10", 
                    progress: calculateProgress(keywords?.metric_value || 2, keywords?.target_value || 5) 
                  },
                  { 
                    goal: "Monthly PI Leads", 
                    current: leads?.metric_value || 8, 
                    target: leads?.target_value || 25, 
                    unit: "leads", 
                    progress: calculateProgress(leads?.metric_value || 8, leads?.target_value || 25) 
                  },
                  { 
                    goal: "Content Published", 
                    current: content?.metric_value || 24, 
                    target: content?.target_value || 50, 
                    unit: "articles", 
                    progress: calculateProgress(content?.metric_value || 24, content?.target_value || 50) 
                  },
                ];
              })().map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.goal}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.current} / {item.target} {item.unit}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.progress} className="h-2 flex-1" />
                    <span className="text-xs font-medium">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Indicators */}
        <Card className="border">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Target className="h-5 w-5" />
              Performance Summary - Current vs Target
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Traffic Performance */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 border bg-muted/30">
                    <TrendingUp className="h-4 w-4 text-foreground" />
                  </div>
                  <h4 className="font-semibold">Traffic Growth</h4>
                </div>
                <div className="space-y-2">
                  {(() => {
                    const metric = getMetricByName('organic_traffic');
                    const current = metric?.metric_value || 8420;
                    const target = metric?.target_value || 12000;
                    const gap = target - current;
                    const progress = calculateProgress(current, target);
                    return (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current</span>
                          <span className="font-semibold">{current.toLocaleString()}/month</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Target</span>
                          <span className="font-semibold">{target.toLocaleString()}/month</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Gap</span>
                          <span className="font-semibold text-primary">+{gap.toLocaleString()} needed</span>
                        </div>
                        <Progress value={progress} className="mt-2" />
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Lead Generation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-foreground/10">
                    <Users className="h-4 w-4" />
                  </div>
                  <h4 className="font-semibold">Lead Generation</h4>
                </div>
                <div className="space-y-2">
                  {(() => {
                    const metric = getMetricByName('monthly_leads');
                    const current = metric?.metric_value || 42;
                    const target = metric?.target_value || 50;
                    const gap = target - current;
                    const progress = calculateProgress(current, target);
                    return (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current</span>
                          <span className="font-semibold">{current}/month</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Target</span>
                          <span className="font-semibold">{target}/month</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Gap</span>
                          <span className="font-semibold text-primary">+{gap} needed</span>
                        </div>
                        <Progress value={progress} className="mt-2" />
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Brand Authority */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="font-semibold">Brand Authority</h4>
                </div>
                <div className="space-y-2">
                  {(() => {
                    const metric = getMetricByName('branded_searches');
                    const current = metric?.metric_value || 1850;
                    const target = metric?.target_value || 3000;
                    const gap = target - current;
                    const progress = calculateProgress(current, target);
                    return (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current</span>
                          <span className="font-semibold">{current.toLocaleString()} searches</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Target</span>
                          <span className="font-semibold">{target.toLocaleString()} searches</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Gap</span>
                          <span className="font-semibold text-primary">+{gap.toLocaleString()} needed</span>
                        </div>
                        <Progress value={progress} className="mt-2" />
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
              {(() => {
                const seoScore = getMetricByName('seo_score');
                const loadTime = getMetricByName('page_load_time');
                const reviews = getMetricByName('monthly_reviews');
                const rating = getMetricByName('google_rating');
                
                return (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{seoScore?.metric_value || 92}%</div>
                      <div className="text-xs text-muted-foreground mt-1">On-Page SEO Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{loadTime?.metric_value || 3.2}s</div>
                      <div className="text-xs text-muted-foreground mt-1">Avg. Load Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-xs text-muted-foreground mt-1">Total Reviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{rating?.metric_value || 4.8}/5.0</div>
                      <div className="text-xs text-muted-foreground mt-1">Avg. Rating</div>
                    </div>
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
      )}

      {/* SWOT Analysis */}
      {(isPresentationMode || activeSection === "swot") && (
      <div id="swot">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Grid className="h-6 w-6 text-primary" />
          SWOT Analysis
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Strengths */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {swotData.strengths.map((item, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="border-[hsl(0,37%,15%)]/30 bg-[hsl(0,37%,15%)]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "hsl(0,37%,15%)" }}>
                <AlertCircle className="h-5 w-5" />
                Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {swotData.weaknesses.map((item, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="mt-0.5" style={{ color: "hsl(0,37%,15%)" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Opportunities */}
          <Card className="border-primary/20 bg-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {swotData.opportunities.map((item, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Threats */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {swotData.threats.map((item, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      )}

      {/* Accordion Sections */}
      {(isPresentationMode || ["market-analysis", "objectives", "brand-guidelines"].includes(activeSection)) && (
      <Accordion type="multiple" defaultValue={isPresentationMode ? ["introduction", "market-analysis", "objectives", "brand-guidelines"] : ["introduction", "market-analysis"]} className="space-y-4">
        {/* Introduction */}
        <AccordionItem value="introduction" className="border bg-card">
          <AccordionTrigger className="hover:no-underline px-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-foreground" />
              <span className="text-lg font-semibold">2. Introduction</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              Puget Law Group (PLG) has established itself as a premier criminal defense firm in the Puget Sound region, with a strong focus on DUI and serious criminal cases. With over 150 years of combined experience and a team that includes nine former prosecutors, the firm possesses a significant competitive advantage.
            </p>
            <p className="leading-relaxed">
              This marketing plan aims to build upon this strong foundation by implementing a <strong>dual-brand strategy</strong>. The primary Puget Law Group brand will continue to solidify its position as the top criminal defense firm, while the new Win With Casey vanity brand will be launched to specifically target and capture the personal injury market.
            </p>
            <div className="bg-muted/30 p-5 border-l-4 border-l-primary mt-4">
              <h4 className="font-semibold mb-3 text-foreground">Integrated Strategic Objectives:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Solidify PLG's position as the top criminal defense firm in the Seattle metropolitan area</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Increase market share in the lucrative DUI and serious felony defense sectors</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Enhance brand recognition and authority throughout Washington State</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Drive consistent, high-quality lead generation to support growth objectives</span></li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Market Analysis */}
        <AccordionItem value="market-analysis" id="market-analysis" className="border bg-card">
          <AccordionTrigger className="hover:no-underline px-6">
            <div className="flex items-center gap-3">
              <BarChart className="h-5 w-5 text-foreground" />
              <span className="text-lg font-semibold">4. Market Analysis</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 space-y-6">
            {/* Market Share Distribution Chart */}
            <Card className="border">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5" />
                  Market Share Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="hsl(var(--primary))"
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)"
                      }}
                      formatter={(value: number) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Strategic Position:</strong> Puget Law Group currently holds 18% market share with significant growth opportunity. The dual-brand strategy targets expanding into personal injury market while maintaining criminal defense dominance.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Client Acquisition Trends Chart */}
            <Card className="border">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5" />
                  Client Acquisition Trends (12-Month Projection)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={acquisitionTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 14 }} />
                    <Line 
                      type="monotone" 
                      dataKey="criminalDefense" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Criminal Defense"
                      dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="personalInjury" 
                      stroke="hsl(var(--foreground))" 
                      strokeWidth={2}
                      name="Personal Injury"
                      dot={{ fill: "hsl(var(--foreground))", r: 4 }}
                      opacity={0.7}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2}
                      name="Total Clients"
                      dot={{ fill: "hsl(var(--muted-foreground))", r: 4 }}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-6 p-5 bg-muted/30 border-l-4 border-l-primary">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Growth Trajectory:</strong> Projected 400% growth in personal injury clients over 12 months through Win With Casey brand launch, while maintaining steady 192% growth in criminal defense practice.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Market Size and Growth</h4>
                <p className="text-sm">
                  The global legal services market was valued at over $1 trillion in 2024 and is projected to grow steadily. The U.S. market accounts for approximately $292 billion. The Seattle legal market is experiencing rapid growth, driven by the city's booming technology sector and status as a hub for global commerce, with starting salaries for new associates exceeding $200,000.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Competitive Landscape</h4>
                <p className="text-sm">
                  The Seattle criminal defense market is fragmented, with a mix of solo practitioners, small boutique firms, and a few mid-sized firms. Research identified 12 key competitors. Puget Law Group's combination of firm size, number of former prosecutors, and outstanding online reputation provides a significant competitive advantage.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Market Trends</h4>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  <Badge variant="secondary" className="justify-start p-3">Digital Transformation</Badge>
                  <Badge variant="secondary" className="justify-start p-3">Increased Specialization</Badge>
                  <Badge variant="secondary" className="justify-start p-3">Client-Centered Service</Badge>
                  <Badge variant="secondary" className="justify-start p-3">AI & Automation</Badge>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Target Audience */}
        <AccordionItem value="target-audience" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">5. Target Audience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Primary Target Audience</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Segment A: High-Stakes Defendant</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p><strong>Ages:</strong> 30-60</p>
                      <p><strong>Profile:</strong> Established professionals, business owners</p>
                      <p><strong>Needs:</strong> Experienced legal team for complex challenges, serious felonies, white-collar crimes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Segment B: DUI Defendant</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p><strong>Ages:</strong> 21-45 (concentrate 21-35)</p>
                      <p><strong>Profile:</strong> First-time offenders, employed, 3:1 male ratio</p>
                      <p><strong>Needs:</strong> Deep DUI expertise, clear guidance through the process</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Win With Casey Target Audience (Personal Injury)</h4>
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      Segment C: The Injured Individual
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Demographics:</strong> All ages, genders, and backgrounds</p>
                    <p><strong>Profile:</strong> Individuals who have suffered injuries in car accidents, truck accidents, workplace incidents, or other situations caused by negligence</p>
                    <p><strong>Psychographics:</strong> In physical and emotional distress, often facing financial hardship due to medical bills and lost wages</p>
                    <p><strong>Needs:</strong> An experienced personal injury attorney who can navigate the complexities of insurance claims and litigation. A firm that handles all aspects, allowing them to focus on recovery</p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Secondary Target Audience</h4>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Segment D: Families of Juveniles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Profile:</strong> Parents/guardians of individuals under 18 facing criminal charges</p>
                    <p><strong>Location:</strong> Typically middle-to-upper class, suburban areas</p>
                    <p><strong>Needs:</strong> Compassionate yet aggressive juvenile defense</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Marketing Objectives */}
        <AccordionItem value="objectives" id="objectives" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">6. Marketing Objectives</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-6">
            {objectives.map((obj, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{obj.title}</span>
                  <Badge variant="outline">{obj.target}</Badge>
                </div>
                <Progress value={obj.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">Progress: {obj.progress}%</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Marketing Strategies */}
        <AccordionItem value="strategies" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">7. Marketing Strategies</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-6">
            <div>
              <h4 className="font-semibold mb-3">7.1 Dual-Brand Content Strategy</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Megaphone className="h-4 w-4" />
                      Puget Law Group (Criminal Defense)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>• In-depth legal guides as lead magnets</p>
                    <p>• Professional video content featuring attorneys</p>
                    <p>• Regular blog posts on criminal justice topics</p>
                    <p>• Client testimonials and case results</p>
                  </CardContent>
                </Card>
                <Card className="border-foreground/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Trophy className="h-4 w-4" />
                      Win With Casey (Personal Injury)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>• winwithcasey.com: Conversion-focused content</p>
                    <p>• caseyfights.com: Results-focused case studies</p>
                    <p>• caseyatbat.com: Educational content with sports metaphors</p>
                    <p>• caseyarbenz.com: Authority-building professional content</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">7.2 SEO and Digital Ecosystem</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Search className="h-4 w-4" />
                      Puget Law Group SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>• On-page optimization for criminal defense keywords</p>
                    <p>• Local SEO & Google Business Profile enhancement</p>
                    <p>• Strategic link-building from legal associations</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Trophy className="h-4 w-4" />
                      Win With Casey Multi-Domain SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>• Cross-domain linking for authority</p>
                    <p>• Voice search and AEO optimization</p>
                    <p>• Comprehensive schema markup across all domains</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MousePointerClick className="h-4 w-4" />
                    Paid Advertising (PPC)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• Google Ads for high-value keywords</p>
                  <p>• Retargeting campaigns</p>
                  <p>• Local Services Ads with Google Guaranteed</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Star className="h-4 w-4" />
                    Reputation Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• Proactive review generation</p>
                  <p>• Showcase testimonials prominently</p>
                  <p>• Monitor and respond to all reviews</p>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Marketing Channels */}
        <AccordionItem value="channels" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">8. Marketing Channels</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm py-2 px-3">Website (Central Hub)</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3">Google Search & Bing</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3">Avvo</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3">Justia</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3">Super Lawyers</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3">LinkedIn</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3">Facebook</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3">YouTube</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3">Email Marketing</Badge>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Guidelines */}
        <AccordionItem value="brand-guidelines" id="brand-guidelines" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">9. Brand Guidelines</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-8">
            <p className="text-muted-foreground">
              Comprehensive brand guidelines ensure consistent visual identity across all marketing materials and touchpoints for both brands.
            </p>

            {/* Puget Law Group Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <Building2 className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Puget Law Group</h3>
              </div>

              {/* PLG Logo Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ImageIcon className="h-5 w-5" />
                    Logo Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge variant="secondary">Primary Logo</Badge>
                      <div className="bg-muted p-6 rounded-lg flex items-center justify-center min-h-[120px]">
                        <span className="text-2xl font-bold text-foreground">PLG</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Use on light backgrounds</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary">Reverse Logo</Badge>
                      <div className="bg-foreground p-6 rounded-lg flex items-center justify-center min-h-[120px]">
                        <span className="text-2xl font-bold text-background">PLG</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Use on dark backgrounds</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Logo Guidelines
                    </h4>
                    <ul className="text-sm space-y-1 ml-6 text-muted-foreground">
                      <li>• Maintain clear space equal to the height of "P" around logo</li>
                      <li>• Minimum size: 100px width for digital, 1" for print</li>
                      <li>• Do not stretch, skew, or rotate the logo</li>
                      <li>• Do not change logo colors outside approved palette</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* PLG Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Palette className="h-5 w-5" />
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-[hsl(217,40%,15%)] border border-border"></div>
                      <div className="text-sm">
                        <p className="font-semibold">Navy Blue</p>
                        <p className="text-xs text-muted-foreground">#1a2332</p>
                        <p className="text-xs text-muted-foreground">Primary</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-[hsl(42,44%58%)] border border-border"></div>
                      <div className="text-sm">
                        <p className="font-semibold">Gold</p>
                        <p className="text-xs text-muted-foreground">#c9a961</p>
                        <p className="text-xs text-muted-foreground">Accent</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-[hsl(0,0%,100%)] border border-border"></div>
                      <div className="text-sm">
                        <p className="font-semibold">White</p>
                        <p className="text-xs text-muted-foreground">#ffffff</p>
                        <p className="text-xs text-muted-foreground">Background</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-[hsl(214,14%,37%)] border border-border"></div>
                      <div className="text-sm">
                        <p className="font-semibold">Slate Gray</p>
                        <p className="text-xs text-muted-foreground">#4a5568</p>
                        <p className="text-xs text-muted-foreground">Secondary</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PLG Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Type className="h-5 w-5" />
                    Typography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="border-b border-border pb-2">
                      <Badge variant="secondary" className="mb-2">Headings</Badge>
                      <p className="text-3xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                        Georgia Bold
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Professional, authoritative, traditional legal aesthetic
                      </p>
                    </div>
                    <div className="border-b border-border pb-2">
                      <Badge variant="secondary" className="mb-2">Body Text</Badge>
                      <p className="text-base" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        System Sans-Serif Regular
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Clean, readable, accessible for all content
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Typography Usage</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Headlines: Georgia Bold, 32-48pt</li>
                        <li>• Subheadings: Georgia Bold, 24-28pt</li>
                        <li>• Body: Sans-serif Regular, 16-18pt</li>
                        <li>• Line height: 1.5-1.7 for body text</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Win With Casey Brand */}
            <div className="space-y-6 pt-8 border-t-2 border-border">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <Award className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Win With Casey</h3>
              </div>

              {/* WWC Logo Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ImageIcon className="h-5 w-5" />
                    Logo Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge variant="secondary">Primary Logo</Badge>
                      <div className="bg-gradient-to-br from-[hsl(0,79%,55%)] to-[hsl(0,68%,38%)] p-6 rounded-lg flex items-center justify-center min-h-[120px]">
                        <span className="text-2xl font-bold text-white">WWC</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Use on light backgrounds</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary">Alternate Logo</Badge>
                      <div className="bg-[hsl(222,47%,11%)] p-6 rounded-lg flex items-center justify-center min-h-[120px]">
                        <span className="text-2xl font-bold text-white">WWC</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Use on dark backgrounds</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Logo Guidelines
                    </h4>
                    <ul className="text-sm space-y-1 ml-6 text-muted-foreground">
                      <li>• Bold, aggressive presentation reflecting fighting spirit</li>
                      <li>• Minimum size: 120px width for digital, 1.25" for print</li>
                      <li>• Athletic, energetic feel in all applications</li>
                      <li>• Can be used with or without tagline "Fighting for You"</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* WWC Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Palette className="h-5 w-5" />
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-[hsl(0,79%,55%)] border border-border"></div>
                      <div className="text-sm">
                        <p className="font-semibold">Victory Red</p>
                        <p className="text-xs text-muted-foreground">#dc2626</p>
                        <p className="text-xs text-muted-foreground">Primary</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-[hsl(222,47%,11%)] border border-border"></div>
                      <div className="text-sm">
                        <p className="font-semibold">Champion Black</p>
                        <p className="text-xs text-muted-foreground">#0f172a</p>
                        <p className="text-xs text-muted-foreground">Secondary</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-[hsl(38,93%,50%)] border border-border"></div>
                      <div className="text-sm">
                        <p className="font-semibold">Achievement Gold</p>
                        <p className="text-xs text-muted-foreground">#f59e0b</p>
                        <p className="text-xs text-muted-foreground">Accent</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-[hsl(0,0%,100%)] border border-border"></div>
                      <div className="text-sm">
                        <p className="font-semibold">White</p>
                        <p className="text-xs text-muted-foreground">#ffffff</p>
                        <p className="text-xs text-muted-foreground">Background</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WWC Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Type className="h-5 w-5" />
                    Typography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="border-b border-border pb-2">
                      <Badge variant="secondary" className="mb-2">Headings</Badge>
                      <p className="text-3xl font-bold" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                        Impact Bold
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Strong, athletic, commanding attention
                      </p>
                    </div>
                    <div className="border-b border-border pb-2">
                      <Badge variant="secondary" className="mb-2">Body Text</Badge>
                      <p className="text-base font-semibold" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        System Sans-Serif SemiBold
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Confident, direct, action-oriented
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Typography Usage</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Headlines: Impact Bold, 36-56pt, all caps for emphasis</li>
                        <li>• Subheadings: Sans-serif Bold, 24-32pt</li>
                        <li>• Body: Sans-serif SemiBold, 16-18pt</li>
                        <li>• Shorter line length for impact, 1.4-1.6 line height</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Domain Strategy */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Globe className="h-5 w-5" />
                    Multi-Domain Brand Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { 
                        domain: "winwithcasey.com", 
                        purpose: "Primary conversion site",
                        color: "bg-[hsl(0,79%,55%)]"
                      },
                      { 
                        domain: "caseyfights.com", 
                        purpose: "Results & case studies",
                        color: "bg-[hsl(222,47%,11%)]"
                      },
                      { 
                        domain: "caseyatbat.com", 
                        purpose: "Educational content",
                        color: "bg-[hsl(38,93%,50%)]"
                      },
                      { 
                        domain: "caseyarbenz.com", 
                        purpose: "Professional authority",
                        color: "bg-[hsl(214,14%,37%)]"
                      },
                    ].map((domain) => (
                      <div key={domain.domain} className="border border-border rounded-lg p-4 space-y-2">
                        <div className={`${domain.color} text-white px-3 py-1 rounded text-sm font-semibold inline-block`}>
                          {domain.domain}
                        </div>
                        <p className="text-sm text-muted-foreground">{domain.purpose}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Brand Differentiation Summary */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Brand Differentiation Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Puget Law Group
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Traditional, authoritative, professional</li>
                      <li>• Emphasizes team expertise and former prosecutors</li>
                      <li>• Criminal defense focus with established reputation</li>
                      <li>• Conservative color palette (navy, gold, slate)</li>
                      <li>• Serif typography for trust and tradition</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Win With Casey
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Bold, athletic, aggressive advocacy</li>
                      <li>• Personal brand centered on Casey Arbenz</li>
                      <li>• Personal injury focus with fighting spirit</li>
                      <li>• Energetic color palette (red, black, gold)</li>
                      <li>• Impact typography for strength and action</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      )}

      {/* Budget */}
      {(isPresentationMode || activeSection === "budget") && (
      <div id="budget">
        <Card className="border mb-8">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <DollarSign className="h-5 w-5" />
              Budget Allocation by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <RechartsBarChart data={budgetAllocationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="category" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ fontSize: 14 }} />
                <Bar dataKey="plg" fill="hsl(var(--primary))" name="Puget Law Group" radius={[4, 4, 0, 0]} />
                <Bar dataKey="winWithCasey" fill="hsl(var(--foreground))" opacity={0.7} name="Win With Casey" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border bg-card">
                <div className="text-lg font-bold text-foreground">Puget Law Group</div>
                <div className="text-sm text-muted-foreground mt-2">Criminal defense marketing allocation</div>
              </div>
              <div className="p-5 border bg-card">
                <div className="text-lg font-bold text-foreground">Win With Casey</div>
                <div className="text-sm text-muted-foreground mt-2">Personal injury marketing allocation</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border">
          <CardHeader className="border-b bg-muted/20">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5" />
              <CardTitle className="text-lg font-semibold">Detailed Budget Breakdown</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      )}

      {/* KPIs, Conclusion, References, and Appendices */}
      {(isPresentationMode || activeSection === "timeline") && (
      <>
      {/* KPIs */}
      <Card className="border">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">10. Key Performance Indicators</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {kpiDefinitions.map((kpi, idx) => (
              <div key={idx} className="p-5 border bg-card hover:border-primary/50 transition-colors">
                <h4 className="font-semibold mb-2 text-foreground">{kpi.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{kpi.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card className="border-l-4 border-l-primary bg-muted/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">11. Conclusion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p className="leading-relaxed">
            Puget Law Group is in a strong position to dominate the Seattle criminal defense market. By leveraging its unique strengths and implementing the data-driven marketing strategies outlined in this plan, the firm can achieve its growth objectives and solidify its reputation as the premier criminal defense firm in the Puget Sound region.
          </p>
          <p className="leading-relaxed">
            This plan provides a clear roadmap for success, but it requires a commitment to execution and a willingness to adapt to the ever-changing digital landscape. With a focus on providing exceptional legal representation and a superior client experience, Puget Law Group is well-positioned for a future of continued growth and success.
          </p>
        </CardContent>
      </Card>

      {/* References */}
      <Card className="border">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <BookMarked className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">References</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>[1] Precedence Research. (2025). "US Legal Services Market Size and Forecast 2025 to 2034." Retrieved from https://www.precedenceresearch.com/us-legal-services-market</p>
          <p>[2] Seattle Business Journal. (2025). "Seattle law firms boost starting salaries amid competition." Retrieved from https://www.bizjournals.com/seattle/news/2025/08/24/entry-level-lawyers-salaries-on-the-rise.html</p>
        </CardContent>
      </Card>

      {/* Appendix: Competitor Comparison Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Appendix A: Competitive Comparison Matrix</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Side-by-side analysis of key competitive metrics</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Comparison Matrix */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] font-semibold">Key Metrics</TableHead>
                    <TableHead className="text-center font-semibold bg-primary/5">
                      <div className="flex flex-col items-center">
                        <span className="text-primary">Puget Law Group</span>
                        <span className="text-xs text-muted-foreground font-normal">(Our Firm)</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-center">Kevin Trombold</TableHead>
                    <TableHead className="text-center">Milios Defense</TableHead>
                    <TableHead className="text-center">Colburn Law</TableHead>
                    <TableHead className="text-center">Stritmatter Kessler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Online Reviews Rating</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-primary">4.9/5</span>
                        <span className="text-xs text-muted-foreground">(120+ reviews)</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">4.7/5</TableCell>
                    <TableCell className="text-center">4.6/5</TableCell>
                    <TableCell className="text-center">4.8/5</TableCell>
                    <TableCell className="text-center">4.5/5</TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">SEO Performance</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Strong</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Very Strong</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Strong</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Very Strong</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Strong</Badge>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">Content Marketing</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/40 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/60 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/60 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/40 mx-auto" />
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">Voice Search Optimized</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/40 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">Social Media Presence</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Active</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Moderate</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Very Active</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Moderate</Badge>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">Dual Practice Areas</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">Former Prosecutor</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/40 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">SuperLawyer Status</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/40 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/40 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/40 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/40 mx-auto" />
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">Multi-Domain Strategy</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-xs text-muted-foreground mt-1">(4 domains)</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">Personal Brand Integration</TableCell>
                    <TableCell className="text-center bg-primary/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-xs text-muted-foreground mt-1">(Win With Casey)</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/40 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <CheckCircle className="h-5 w-5 text-foreground/60 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Key Competitive Insights */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Key Competitive Insights
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Unique Position:</strong> Only major firm serving both criminal defense and personal injury with dedicated brand strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Content Leadership:</strong> Four-domain strategy creates multiple touchpoints and SEO advantages competitors lack</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Personal Brand Edge:</strong> Casey Arbenz's Ironman achievements and SuperLawyer status create compelling narrative</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Technology Gap:</strong> Most competitors lag in voice search optimization and answer engine presence</span>
                </li>
              </ul>
            </div>

            {/* Direct Competitors Detail */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Criminal Defense Competitors</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Kevin Trombold:</strong> Established criminal defense with strong online presence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Milios Defense:</strong> Well-known Seattle firm with substantial digital marketing</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Personal Injury Competitors</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Colburn Law:</strong> Aggressive personal injury marketing with strong brand recognition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Stritmatter Kessler:</strong> Large firm with comprehensive digital presence</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appendix: Implementation Timeline */}
      <div id="timeline">
        <Card className="border">
          <CardHeader className="border-b bg-muted/20">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5" />
              <CardTitle className="text-lg font-semibold">Appendix B: Implementation Timeline</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {timelinePhases.map((phase, idx) => (
              <div key={idx} className={`p-4 border rounded-lg ${phase.color}`}>
                <h4 className="font-semibold mb-3">{phase.phase}</h4>
                <ul className="space-y-2">
                  {phase.activities.map((activity, actIdx) => (
                    <li key={actIdx} className="text-sm flex gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Appendix C: Win With Casey Initiative */}
      <Card className="border">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">Appendix C: Win With Casey Initiative</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Overview</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Win With Casey initiative represents a strategic expansion of Puget Law Group's service offerings into the personal injury market. By creating a separate vanity brand centered on Managing Partner Casey Arbenz, the firm can pursue aggressive growth in personal injury while maintaining its strong brand identity in criminal defense.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Multi-Domain Architecture</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border bg-card hover:border-primary/50 transition-colors">
                <p className="font-medium text-sm mb-2 text-foreground">winwithcasey.com</p>
                <p className="text-xs text-muted-foreground">Primary conversion-focused domain with clear calls to action</p>
              </div>
              <div className="p-4 border bg-card hover:border-primary/50 transition-colors">
                <p className="font-medium text-sm mb-2 text-foreground">caseyfights.com</p>
                <p className="text-xs text-muted-foreground">Results-focused content showcasing case studies and settlements</p>
              </div>
              <div className="p-4 border bg-card hover:border-primary/50 transition-colors">
                <p className="font-medium text-sm mb-2 text-foreground">caseyatbat.com</p>
                <p className="text-xs text-muted-foreground">Educational content using sports metaphors for accessibility</p>
              </div>
              <div className="p-4 border bg-card hover:border-primary/50 transition-colors">
                <p className="font-medium text-sm mb-2 text-foreground">caseyarbenz.com</p>
                <p className="text-xs text-muted-foreground">Professional authority site highlighting credentials and expertise</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Strategic Rationale</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3 items-start">
                <span className="text-primary mt-1 flex-shrink-0">•</span>
                <span>Criminal defense and personal injury markets have fundamentally different client personas and search behaviors</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-primary mt-1 flex-shrink-0">•</span>
                <span>Focused, specialized content performs better in search engine rankings than mixed practice area sites</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-primary mt-1 flex-shrink-0">•</span>
                <span>Casey Arbenz's personal brand (SuperLawyer, Ironman competitor, former prosecutor) resonates powerfully in personal injury</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Cross-promotional opportunities between criminal defense and personal injury create powerful referral engine</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Voice Search & Answer Engine Optimization</h4>
            <p className="text-sm mb-2">
              The Win With Casey content strategy is specifically designed to capture traffic from voice searches and AI-powered answer engines through:
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Long-tail, conversational keywords (e.g., "how much compensation can I get for a car accident in Washington?")</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Direct, concise answers at the beginning of pages that AI systems can easily extract</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Comprehensive FAQ sections aligned with question-and-answer format for voice assistants</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Schema markup implementation across all domains for AI comprehension</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Success Metrics</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-background border rounded-lg">
                <p className="font-medium mb-1">Domain Authority</p>
                <p className="text-xs text-muted-foreground">Target: DA 30+ within 12 months for all four domains</p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <p className="font-medium mb-1">Keyword Rankings</p>
                <p className="text-xs text-muted-foreground">First-page for 5 high-value PI keywords in 12 months</p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <p className="font-medium mb-1">Organic Traffic</p>
                <p className="text-xs text-muted-foreground">1,000+ monthly organic visitors across all domains</p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <p className="font-medium mb-1">Lead Generation</p>
                <p className="text-xs text-muted-foreground">20+ qualified PI leads per month within 12 months</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </>
      )}
      </div>
    </div>
  );
};

export default ClientMarketingPlan;
