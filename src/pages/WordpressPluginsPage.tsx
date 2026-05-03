import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Kanban, Layers, Globe, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const WordpressPluginsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Custom WordPress Plugins | Bizooma</title>
        <meta
          name="description"
          content="Custom WordPress plugins built by Bizooma. Discover Roadmap Flow — a Kanban-style product roadmap plugin for your WordPress site."
        />
        <link rel="canonical" href="https://bizooma.com/wordpress-plugins" />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-28">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-4 bg-legal-primary text-white hover:bg-legal-primary">WordPress Plugins</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-legal-dark mb-6">
            Custom WordPress Plugins, Built by Bizooma
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built WordPress plugins that extend your site with the functionality
            your business actually needs — clean code, modern UI, and seamless integration.
          </p>
        </section>

        {/* Featured plugin: Roadmap Flow */}
        <section className="container mx-auto px-4 pb-20">
          <Card className="overflow-hidden border-2 border-legal-primary/20 shadow-lg">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-legal-primary to-legal-dark text-white p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Kanban className="h-6 w-6" />
                  <span className="uppercase tracking-wider text-sm font-semibold opacity-80">
                    Featured Plugin
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Roadmap Flow</h2>
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  Create beautiful Kanban-style product roadmaps and display them
                  directly on your WordPress website. Keep customers, stakeholders,
                  and your team in the loop on what's planned, in progress, and shipped.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/25 border-0">Kanban Board</Badge>
                  <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/25 border-0">Public Roadmaps</Badge>
                  <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/25 border-0">Drag & Drop</Badge>
                </div>
              </div>

              <CardContent className="p-10">
                <h3 className="text-xl font-semibold text-legal-dark mb-4">Key Features</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Drag-and-drop Kanban columns (Planned, In Progress, Shipped)",
                    "Embed roadmaps anywhere with a simple shortcode or block",
                    "Customizable categories, tags, and status labels",
                    "Public-facing roadmap that matches your site's theme",
                    "Admin-only editing with WordPress role permissions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-legal-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="bg-legal-primary hover:bg-legal-secondary text-white">
                  <Link to="/#contact">
                    Get Notified at Launch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Why Bizooma plugins */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-legal-dark text-center mb-12">
              Why Our Plugins
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Layers, title: "Clean, Modern Code", desc: "Built to current WordPress standards with performance and security baked in." },
                { icon: Globe, title: "Theme-Friendly", desc: "Designed to inherit your site's styling and feel native on any theme." },
                { icon: Sparkles, title: "Actively Maintained", desc: "Ongoing updates, fixes, and feature requests from a real development team." },
              ].map(({ icon: Icon, title, desc }) => (
                <Card key={title}>
                  <CardHeader>
                    <Icon className="h-10 w-10 text-legal-primary mb-2" />
                    <CardTitle className="text-xl">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coming soon */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-legal-dark mb-4">More Plugins Coming Soon</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We're actively building additional plugins to solve common business challenges.
            Have an idea? We'd love to hear about it.
          </p>
          <Button asChild size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white">
            <Link to="/#contact">Suggest a Plugin</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WordpressPluginsPage;