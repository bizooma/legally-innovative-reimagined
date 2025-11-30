import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, BookOpen, Grid, BarChart, Users, Target, Lightbulb, 
  Share2, DollarSign, TrendingUp, Calendar, CheckCircle, AlertCircle, 
  Sparkles, AlertTriangle, Megaphone, Search, MousePointerClick, Star
} from "lucide-react";

interface ClientMarketingPlanProps {
  client: any;
}

const ClientMarketingPlan = ({ client }: ClientMarketingPlanProps) => {
  const [activeSection, setActiveSection] = useState<string>("executive-summary");

  const sections = [
    { id: "executive-summary", label: "Summary", icon: FileText },
    { id: "swot", label: "SWOT", icon: Grid },
    { id: "market-analysis", label: "Market", icon: BarChart },
    { id: "objectives", label: "Objectives", icon: Target },
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

  const swotData = {
    strengths: [
      "Exceptional Team of Former Prosecutors: Unmatched insight into prosecution strategies",
      "Outstanding Online Reputation: 5.0 Google rating with 500+ reviews provides immense social proof",
      "Proven Track Record: High win rate and numerous successful case results build client trust",
      "Strong Website and Digital Presence: Modern website and solid SEO foundation",
      "Broad Service Area: Covers the entire Puget Sound region, providing a large client base"
    ],
    weaknesses: [
      "Secondary Practice Area Dilution: Personal injury practice may dilute the core criminal defense brand",
      "Limited Brand Recognition Beyond Seattle: Brand awareness is concentrated in the immediate Puget Sound area",
      "Dependence on a Few Key Attorneys: Brand is heavily tied to a few key partners",
      "Lack of a Formal Referral Program: No structured program to incentivize referrals from past clients"
    ],
    opportunities: [
      "Dominating the DUI Market: Opportunity to become the undisputed leader in Washington DUI defense",
      "Content Marketing Leadership: Opportunity to become the leading source of criminal defense information",
      "Geographic Expansion: Potential to expand into other major Washington cities",
      "Targeting High-Value Niches: Focus on federal crimes, white-collar defense, and complex felonies",
      "Leveraging Technology: Further use of AI and automation for client intake and marketing"
    ],
    threats: [
      "Intense Market Competition: Highly fragmented and competitive Seattle legal market",
      "New Market Entrants: High-growth Seattle market attracts new and established law firms",
      "Changes in Legal Advertising Rules: Potential for stricter regulations on digital marketing",
      "Economic Downturn: A recession could impact clients' ability to afford premium legal services",
      "Negative Public Perception of Lawyers: General distrust of the legal profession can be a hurdle"
    ]
  };

  const objectives = [
    { title: "Increase qualified leads", target: "50 leads/month", progress: 65 },
    { title: "Top-3 rankings", target: "10 high-value keywords", progress: 40 },
    { title: "Grow website traffic", target: "40% increase", progress: 55 },
    { title: "Boost brand authority", target: "50% branded search increase", progress: 30 }
  ];

  const budgetItems = [
    { category: "SEO & Content Marketing", monthly: "$5,000", annual: "$60,000", description: "Content creation, link building" },
    { category: "Paid Advertising (PPC)", monthly: "$7,000", annual: "$84,000", description: "Google Ads, Local Services Ads" },
    { category: "Website & Tech Stack", monthly: "$1,000", annual: "$12,000", description: "Hosting, plugins, analytics" },
    { category: "Video Production", monthly: "$2,000", annual: "$24,000", description: "Quarterly video shoots" }
  ];

  const kpis = [
    { name: "Leads", description: "Total number of qualified leads generated per month" },
    { name: "Cost Per Lead (CPL)", description: "The average cost to acquire a new lead" },
    { name: "Conversion Rate", description: "The percentage of website visitors who contact the firm" },
    { name: "Search Engine Rankings", description: "The firm's position on Google for target keywords" },
    { name: "Organic Traffic", description: "The number of visitors from organic search results" },
    { name: "Branded Search Volume", description: "Number of people searching for 'Puget Law Group'" },
    { name: "Client Acquisition Cost (CAC)", description: "Total marketing cost to acquire a new client" }
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

  const timelinePhases = [
    {
      phase: "Months 1-3: Foundation and Setup",
      color: "bg-blue-500/10 border-blue-500/20",
      activities: [
        "Conduct comprehensive website audit for technical SEO issues",
        "Optimize Google Business Profile with updated info and photos",
        "Complete keyword research for highest-value search terms",
        "Develop 6-month content calendar",
        "Launch initial PPC campaigns for high-priority keywords"
      ]
    },
    {
      phase: "Months 4-6: Content Development and SEO Expansion",
      color: "bg-green-500/10 border-green-500/20",
      activities: [
        "Produce comprehensive legal guides as lead magnets",
        "Establish regular blog publishing schedule (2+ posts/week)",
        "Create first round of professional video content",
        "Initiate link-building campaigns for high-authority backlinks",
        "Optimize social media profiles and establish posting schedule"
      ]
    },
    {
      phase: "Months 7-9: Optimization and Expansion",
      color: "bg-amber-500/10 border-amber-500/20",
      activities: [
        "Analyze and optimize PPC campaigns based on performance data",
        "Launch retargeting campaigns for non-converting visitors",
        "Produce additional video content including client testimonials",
        "Expand content strategy to include guest posting",
        "Develop email marketing campaigns for lead nurturing"
      ]
    },
    {
      phase: "Months 10-12: Scaling and Refinement",
      color: "bg-purple-500/10 border-purple-500/20",
      activities: [
        "Scale successful initiatives and allocate resources to high-performing content",
        "Enhance presence on legal directories (Avvo, Justia, Super Lawyers)",
        "Develop and launch formal client referral program",
        "Generate comprehensive performance reports",
        "Update marketing plan based on year-long insights"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Executive Summary */}
      <div id="executive-summary">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Executive Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              This marketing plan provides a comprehensive strategy for Puget Law Group to expand its market leadership in the Seattle criminal defense sector. The plan is based on an in-depth analysis of the firm's current position, the competitive landscape, and the regional market dynamics.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Key Strengths</h4>
                <ul className="space-y-1 text-sm">
                  <li>• 9 former prosecutors on staff</li>
                  <li>• 5.0 rating with 500+ reviews</li>
                  <li>• 150+ years combined experience</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Strategic Focus</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Dominate DUI defense market</li>
                  <li>• Advanced SEO & content marketing</li>
                  <li>• Target high-value clients</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SWOT Analysis */}
      <div id="swot">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Grid className="h-6 w-6 text-primary" />
          SWOT Analysis
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Strengths */}
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {swotData.strengths.map((item, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <AlertCircle className="h-5 w-5" />
                Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {swotData.weaknesses.map((item, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="text-orange-600 dark:text-orange-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Opportunities */}
          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <Sparkles className="h-5 w-5" />
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {swotData.opportunities.map((item, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Threats */}
          <Card className="border-red-500/30 bg-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {swotData.threats.map((item, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Accordion Sections */}
      <Accordion type="multiple" defaultValue={["introduction", "market-analysis"]} className="space-y-4">
        {/* Introduction */}
        <AccordionItem value="introduction" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">1. Introduction</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <p>
              Puget Law Group (PLG) has established itself as a premier criminal defense firm in the Puget Sound region, with a strong focus on DUI and serious criminal cases. With over 150 years of combined experience and a team that includes nine former prosecutors, the firm possesses a significant competitive advantage.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Strategic Objectives:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Solidify PLG's position as the top criminal defense firm in the Seattle metropolitan area</li>
                <li>• Increase market share in the lucrative DUI and serious felony defense sectors</li>
                <li>• Enhance brand recognition and authority throughout Washington State</li>
                <li>• Drive consistent, high-quality lead generation to support growth objectives</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Market Analysis */}
        <AccordionItem value="market-analysis" id="market-analysis" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">2. Market Analysis</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Market Size and Growth</h4>
                <p className="text-sm">
                  The global legal services market was valued at over $1 trillion in 2024. The U.S. market accounts for approximately $292 billion. The Seattle legal market is experiencing rapid growth, driven by the city's booming technology sector and status as a hub for global commerce.
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
              <span className="text-xl font-semibold">3. Target Audience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Segment A: High-Stakes Defendant</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Ages:</strong> 30-60</p>
                  <p><strong>Profile:</strong> Established professionals, business owners</p>
                  <p><strong>Needs:</strong> Experienced legal team for complex challenges</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Segment B: DUI Defendant</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Ages:</strong> 21-45 (concentrate 21-35)</p>
                  <p><strong>Profile:</strong> First-time offenders, employed</p>
                  <p><strong>Needs:</strong> DUI expertise, clear guidance</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Segment C: Families of Juveniles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Profile:</strong> Parents/guardians</p>
                  <p><strong>Location:</strong> Suburban areas</p>
                  <p><strong>Needs:</strong> Compassionate juvenile defense</p>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Marketing Strategies */}
        <AccordionItem value="strategies" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">4. Marketing Strategies</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Megaphone className="h-4 w-4" />
                    Content Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• In-depth legal guides as lead magnets</p>
                  <p>• Professional video content series</p>
                  <p>• Regular blog posts on timely topics</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Search className="h-4 w-4" />
                    SEO Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• On-page optimization for target keywords</p>
                  <p>• Local SEO & Google Business Profile</p>
                  <p>• Strategic link-building campaigns</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MousePointerClick className="h-4 w-4" />
                    Paid Advertising
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
              <span className="text-xl font-semibold">5. Marketing Channels</span>
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
      </Accordion>

      {/* Marketing Objectives */}
      <div id="objectives">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Marketing Objectives</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>
      </div>

      {/* Budget */}
      <div id="budget">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Marketing Budget</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Monthly</TableHead>
                  <TableHead className="text-right">Annual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.description}</TableCell>
                    <TableCell className="text-right">{item.monthly}</TableCell>
                    <TableCell className="text-right">{item.annual}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-muted/50">
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">$15,000</TableCell>
                  <TableCell className="text-right">$180,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* KPIs */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Key Performance Indicators</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-1">{kpi.name}</h4>
                <p className="text-sm text-muted-foreground">{kpi.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-2xl">Conclusion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Puget Law Group is in a strong position to dominate the Seattle criminal defense market. By leveraging its unique strengths and implementing the data-driven marketing strategies outlined in this plan, the firm can achieve its growth objectives and solidify its reputation as the premier criminal defense firm in the Puget Sound region.
          </p>
          <p>
            This plan provides a clear roadmap for success, but it requires a commitment to execution and a willingness to adapt to the ever-changing digital landscape. With a focus on providing exceptional legal representation and a superior client experience, Puget Law Group is well-positioned for a future of continued growth and success.
          </p>
        </CardContent>
      </Card>

      {/* Appendix: Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Appendix A: Competitor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Firm Name</TableHead>
                  <TableHead>Years</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Focus Areas</TableHead>
                  <TableHead>USP</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitors.map((comp, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{comp.firm}</TableCell>
                    <TableCell>{comp.years}</TableCell>
                    <TableCell>{comp.size}</TableCell>
                    <TableCell className="text-sm">{comp.focus}</TableCell>
                    <TableCell className="text-sm max-w-xs">{comp.usp}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{comp.rating}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Key Competitive Insights</h4>
            <ul className="text-sm space-y-1">
              <li>• Most competitors are solo practitioners or small firms (1-3 attorneys)</li>
              <li>• PLG's 11-attorney team and 9 former prosecutors is a major differentiator</li>
              <li>• 5.0 rating with 500+ reviews surpasses most competitors</li>
              <li>• Opportunity to capture market share through superior digital marketing</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Appendix: Implementation Timeline */}
      <div id="timeline">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl">Appendix B: Implementation Timeline</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
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
    </div>
  );
};

export default ClientMarketingPlan;
