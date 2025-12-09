import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, MapPin, Mic, Calendar, Download, Presentation, PhoneOff, Clock, TrendingDown, Users, DollarSign, MousePointer } from "lucide-react";

const JaxBarAssociationResourcesPage = () => {
  const availableResources = [
    {
      title: "CLE Presentation Slides",
      description: "Download the complete presentation from today's Jacksonville Bar Association continuing legal education class (December 9, 2025).",
      icon: Presentation,
      downloadUrl: "/downloads/JAX_Bar_CLE_Presentation.pdf",
      fileName: "JAX_Bar_CLE_Presentation.pdf",
    },
  ];

  const comingSoonResources = [
    {
      title: "Legal Marketing Checklist",
      description: "A comprehensive checklist covering essential marketing considerations for law firms in today's digital landscape.",
      icon: FileText,
    },
    {
      title: "SEO & AEO Guide for Attorneys",
      description: "Learn how to optimize your firm's online presence for both traditional search engines and AI-powered answer engines.",
      icon: BookOpen,
    },
    {
      title: "Google Business Profile Optimization eBook",
      description: "Step-by-step guide to maximizing your Google Business Profile for local visibility and client acquisition.",
      icon: MapPin,
    },
    {
      title: "Voice Search Optimization Checklist",
      description: "Prepare your firm's digital presence for the growing trend of voice-activated search queries.",
      icon: Mic,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Free Resources for Jacksonville Bar Association CLE Attendees | Bizooma</title>
        <meta 
          name="description" 
          content="Exclusive free marketing resources for attorneys attending the Jacksonville Bar Association continuing legal education class. Download checklists, guides, and eBooks." 
        />
        <meta property="og:title" content="Free Resources for Jacksonville Bar Association CLE Attendees | Bizooma" />
        <meta property="og:description" content="Exclusive free marketing resources for attorneys attending the Jacksonville Bar Association continuing legal education class." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-legal-dark to-legal-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome, Jacksonville Bar Association Members!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-6">
              Exclusive Resources for CLE Attendees
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Thank you for attending our continuing legal education class. Below you'll find free resources 
              developed specifically for the legal community to help you enhance your firm's marketing presence.
            </p>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Free Marketing Resources
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These resources are designed to help attorneys and law firms navigate the evolving 
                digital marketing landscape. Check back soon as we finalize these materials.
              </p>
            </div>

            {/* Available Downloads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {availableResources.map((resource, index) => (
                <Card key={index} className="relative overflow-hidden border-legal-primary/30 hover:border-legal-primary/60 transition-colors bg-legal-primary/5">
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 right-4 bg-green-500/10 text-green-600 border-green-500/20"
                  >
                    Available Now
                  </Badge>
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-legal-primary/10">
                        <resource.icon className="h-6 w-6 text-legal-primary" />
                      </div>
                      <CardTitle className="text-xl pt-2">{resource.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <Button 
                      className="bg-legal-primary hover:bg-legal-primary/90"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = resource.downloadUrl;
                        link.download = resource.fileName;
                        link.click();
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Presentation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Coming Soon Resources */}
            <h3 className="text-xl font-semibold text-center text-muted-foreground mb-6">More Resources Coming Soon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {comingSoonResources.map((resource, index) => (
                <Card key={index} className="relative overflow-hidden border-border/50 hover:border-legal-primary/50 transition-colors">
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 right-4 bg-amber-500/10 text-amber-600 border-amber-500/20"
                  >
                    Coming Soon
                  </Badge>
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-legal-primary/10">
                        <resource.icon className="h-6 w-6 text-legal-primary" />
                      </div>
                      <CardTitle className="text-xl pt-2">{resource.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Statistics Section */}
        <section className="py-16 md:py-20 bg-legal-dark text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Key Statistics on Business Loss
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Understanding the cost of missed opportunities in the legal industry
              </p>
            </div>

            {/* Unanswered Calls Crisis */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center">
                <PhoneOff className="h-5 w-5 text-red-400" />
                Unanswered Calls Crisis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-red-400 mb-2">35%</p>
                    <p className="text-white/80 text-sm">of calls go unanswered during business hours</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-red-400 mb-2">$109B</p>
                    <p className="text-white/80 text-sm">lost annually across the legal industry</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-red-400 mb-2">28%</p>
                    <p className="text-white/80 text-sm">missed call rate (2nd highest of any industry)</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-red-400 mb-2">195M</p>
                    <p className="text-white/80 text-sm">calls go unanswered each year</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Client Behavior */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center">
                <Users className="h-5 w-5 text-amber-400" />
                Client Behavior
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-amber-400 mb-2">78%</p>
                    <p className="text-white/80 text-sm">hire the first firm that responds</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-amber-400 mb-2">72%</p>
                    <p className="text-white/80 text-sm">move on if no response within 24 hours</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-amber-400 mb-2">80%</p>
                    <p className="text-white/80 text-sm">hang up when they reach voicemail</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-amber-400 mb-2">65%</p>
                    <p className="text-white/80 text-sm">contact 2-5 firms before choosing</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Online Lead Response */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center">
                <Clock className="h-5 w-5 text-blue-400" />
                Online Lead Response
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-blue-400 mb-2">26%</p>
                    <p className="text-white/80 text-sm">of law firms never respond to online leads</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-blue-400 mb-2">39%</p>
                    <p className="text-white/80 text-sm">take 2+ hours to respond or never respond</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-green-400 mb-2">7x</p>
                    <p className="text-white/80 text-sm">more likely to convert when responding within 1 hour</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Revenue Impact */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center">
                <DollarSign className="h-5 w-5 text-green-400" />
                Revenue Impact Example (Personal Injury Firm)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-green-400 mb-2">$7.2M</p>
                    <p className="text-white/80 text-sm">potential annual revenue loss (28% missed calls)</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-green-400 mb-2">$1.79M</p>
                    <p className="text-white/80 text-sm">conservative estimate lost per year</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-green-400 mb-2">$649</p>
                    <p className="text-white/80 text-sm">average cost per lead (wasted when unanswered)</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Conversion Impact */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center">
                <MousePointer className="h-5 w-5 text-purple-400" />
                Conversion Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-purple-400 mb-2">2.1%</p>
                    <p className="text-white/80 text-sm">average law firm website conversion rate</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-purple-400 mb-2">98/100</p>
                    <p className="text-white/80 text-sm">visitors leave without taking action</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-purple-400 mb-2">14%</p>
                    <p className="text-white/80 text-sm">of prospects attend consultations before retaining</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Need Personalized Marketing Help?
              </h2>
              <p className="text-muted-foreground mb-8">
                If you'd like to discuss how Bizooma can help your law firm develop a comprehensive 
                digital marketing strategy, we'd love to connect with you.
              </p>
              <Button 
                size="lg" 
                className="bg-legal-primary hover:bg-legal-primary/90"
                onClick={() => window.open('https://calendly.com/joe-bizooma/30min', '_blank')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default JaxBarAssociationResourcesPage;
