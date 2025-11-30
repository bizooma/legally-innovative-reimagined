import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, BookOpen, Grid, BarChart, Users, Target, Lightbulb, 
  Share2, DollarSign, TrendingUp, Calendar, CheckCircle, AlertCircle, 
  Sparkles, AlertTriangle, Megaphone, Search, MousePointerClick, Star,
  BookMarked, Trophy, Palette, ImageIcon, Type, Award, Building2, Globe
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

  const swotData = {
    strengths: [
      "Exceptional Team of Former Prosecutors: Unmatched insight into prosecution strategies",
      "Outstanding Online Reputation: 5.0 Google rating with 500+ reviews provides immense social proof",
      "Proven Track Record: High win rate and numerous successful case results build client trust",
      "Strong Website and Digital Presence: Modern website and solid SEO foundation",
      "Broad Service Area: Covers the entire Puget Sound region, providing a large client base"
    ],
    weaknesses: [
      "Brand Dilution Risk (Mitigated): Without a separate brand, the personal injury practice could dilute the core criminal defense focus. The Win With Casey initiative mitigates this.",
      "Limited Brand Recognition Beyond Seattle: Brand awareness is concentrated in the immediate Puget Sound area",
      "Dependence on Key Attorneys: The firm's brand is tied to key partners, and the Win With Casey brand is entirely dependent on Casey Arbenz",
      "Lack of a Formal Referral Program: No structured program to incentivize referrals from past clients"
    ],
    opportunities: [
      "Capture Personal Injury Market: The Win With Casey initiative provides a significant opportunity to capture a large share of the personal injury market",
      "Content Marketing Leadership: Opportunity to become the leading source of criminal defense information",
      "Geographic Expansion: Potential to expand into other major Washington cities",
      "Cross-Promotional Synergy: Promote personal injury services to criminal defense clients and vice-versa, creating a powerful referral engine between the two brands",
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

  const kpis = [
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
              This marketing plan provides a comprehensive strategy for Puget Law Group to expand its market leadership in the Seattle criminal defense sector. The plan is based on an in-depth analysis of the firm's current position, the competitive landscape, and the regional market dynamics. Key recommendations include leveraging Puget Law Group's unique strengths—notably its team of former prosecutors and exceptional online reputation—to dominate the high-value DUI and serious criminal defense markets.
            </p>
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-[hsl(0,37%,15%)]/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-primary">Win With Casey Initiative</h4>
              </div>
              <p className="text-sm">
                A key pillar of this strategy is the launch of the <strong>Win With Casey</strong> vanity brand, a sophisticated, multi-domain initiative designed to capture the personal injury market by leveraging the personal brand of Managing Partner Casey Arbenz. This dual-brand approach allows Puget Law Group to maintain its dominance in criminal defense while aggressively pursuing growth in the personal injury sector.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">Key Strengths</h4>
                <ul className="space-y-1 text-sm">
                  <li>• 9 former prosecutors on staff</li>
                  <li>• 5.0 rating with 500+ reviews</li>
                  <li>• 150+ years combined experience</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/20">
                <h4 className="font-semibold text-foreground mb-2">Strategic Focus</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Dominate DUI defense market</li>
                  <li>• Launch Win With Casey personal injury brand</li>
                  <li>• Multi-channel digital marketing approach</li>
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

      {/* Accordion Sections */}
      <Accordion type="multiple" defaultValue={["introduction", "market-analysis"]} className="space-y-4">
        {/* Introduction */}
        <AccordionItem value="introduction" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">2. Introduction</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <p>
              Puget Law Group (PLG) has established itself as a premier criminal defense firm in the Puget Sound region, with a strong focus on DUI and serious criminal cases. With over 150 years of combined experience and a team that includes nine former prosecutors, the firm possesses a significant competitive advantage.
            </p>
            <p>
              This marketing plan aims to build upon this strong foundation by implementing a <strong>dual-brand strategy</strong>. The primary Puget Law Group brand will continue to solidify its position as the top criminal defense firm, while the new Win With Casey vanity brand will be launched to specifically target and capture the personal injury market.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Integrated Strategic Objectives:</h4>
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
              <span className="text-xl font-semibold">4. Market Analysis</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
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

      {/* Marketing Objectives */}
      <div id="objectives">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">6. Marketing Objectives</CardTitle>
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
              <CardTitle className="text-2xl">9. Marketing Budget</CardTitle>
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
                  <TableCell className="text-right">$17,000</TableCell>
                  <TableCell className="text-right">$204,000</TableCell>
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
            <CardTitle className="text-2xl">10. Key Performance Indicators</CardTitle>
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
          <CardTitle className="text-2xl">11. Conclusion</CardTitle>
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

      {/* References */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">References</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>[1] Precedence Research. (2025). "US Legal Services Market Size and Forecast 2025 to 2034." Retrieved from https://www.precedenceresearch.com/us-legal-services-market</p>
          <p>[2] Seattle Business Journal. (2025). "Seattle law firms boost starting salaries amid competition." Retrieved from https://www.bizjournals.com/seattle/news/2025/08/24/entry-level-lawyers-salaries-on-the-rise.html</p>
        </CardContent>
      </Card>

      {/* Appendix: Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Appendix A: Detailed Competitor Analysis</CardTitle>
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
              <li>• Former prosecutor experience is common, but PLG's team of 9 far exceeds any competitor</li>
              <li>• 5.0 rating with 500+ reviews surpasses most competitors, providing powerful social proof</li>
              <li>• Many smaller firms lack sophisticated digital marketing strategies</li>
              <li>• Opportunity to capture market share through superior SEO, content marketing, and PPC</li>
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

      {/* Appendix C: Win With Casey Initiative */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-[hsl(0,37%,15%)]/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">Appendix C: Win With Casey Initiative</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Overview</h4>
            <p className="text-sm">
              The Win With Casey initiative represents a strategic expansion of Puget Law Group's service offerings into the personal injury market. By creating a separate vanity brand centered on Managing Partner Casey Arbenz, the firm can pursue aggressive growth in personal injury while maintaining its strong brand identity in criminal defense.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Multi-Domain Architecture</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 bg-background border rounded-lg">
                <p className="font-medium text-sm mb-1">winwithcasey.com</p>
                <p className="text-xs text-muted-foreground">Primary conversion-focused domain with clear calls to action</p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <p className="font-medium text-sm mb-1">caseyfights.com</p>
                <p className="text-xs text-muted-foreground">Results-focused content showcasing case studies and settlements</p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <p className="font-medium text-sm mb-1">caseyatbat.com</p>
                <p className="text-xs text-muted-foreground">Educational content using sports metaphors for accessibility</p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <p className="font-medium text-sm mb-1">caseyarbenz.com</p>
                <p className="text-xs text-muted-foreground">Professional authority site highlighting credentials and expertise</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Strategic Rationale</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Criminal defense and personal injury markets have fundamentally different client personas and search behaviors</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Focused, specialized content performs better in search engine rankings than mixed practice area sites</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
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
    </div>
  );
};

export default ClientMarketingPlan;
