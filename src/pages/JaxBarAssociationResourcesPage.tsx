import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, MapPin, Mic, Calendar, Mail, Download, Presentation } from "lucide-react";

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
