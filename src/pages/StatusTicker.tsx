import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StatusTicker as StatusTickerWidget } from "@/components/status-ticker/StatusTicker";
import { ProviderStatusGrid } from "@/components/status-ticker/ProviderStatusGrid";
import { useProviderStatus } from "@/hooks/useProviderStatus";
import { Code, Grid3x3, List, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const StatusTicker = () => {
  const [viewMode, setViewMode] = useState<'ticker' | 'grid'>('grid');
  const { data: providers, isLoading } = useProviderStatus();
  
  const embedCode = `<script
  src="${window.location.origin}/embed.js"
  data-theme="dark"
  data-auto-scroll="true"
></script>`;

  return (
    <>
      <Helmet>
        <title>Cloud Provider Status Ticker | Bizooma</title>
        <meta 
          name="description" 
          content="Real-time status monitoring for major cloud and development platforms including AWS, Google Cloud, Azure, GitHub, and more." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Cloud Provider Status Ticker
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Real-time status monitoring for 14+ major cloud and development platforms.
                  Keep your team informed about infrastructure health at a glance.
                </p>
                <Link to="/incident-history">
                  <Button variant="outline" className="gap-2">
                    <History className="w-4 h-4" />
                    View Incident History
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* View Mode Toggle */}
          <section className="py-4 border-b bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant={viewMode === 'ticker' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('ticker')}
                  className="gap-2"
                >
                  <List className="w-4 h-4" />
                  Ticker View
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="gap-2"
                >
                  <Grid3x3 className="w-4 h-4" />
                  Grid View
                </Button>
              </div>
            </div>
          </section>

          {/* Status Display */}
          <section className={`relative py-16 ${viewMode === 'grid' ? 'min-h-screen' : ''}`}>
            {viewMode === 'grid' && (
              <>
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                  style={{ backgroundImage: "url('/images/server-room-bg.jpg')" }}
                />
                
                {/* Semi-transparent Black Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
              </>
            )}
            
            {/* Content Container - positioned above background */}
            <div className="relative z-10">
              {viewMode === 'ticker' ? (
                <StatusTickerWidget />
              ) : (
                <div className="container mx-auto px-4">
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
                      <p className="mt-4 text-white/70">Loading provider status...</p>
                    </div>
                  ) : providers && providers.length > 0 ? (
                    <ProviderStatusGrid providers={providers} />
                  ) : (
                    <div className="text-center py-12 text-white/70">
                      No provider data available
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Stay Informed About Infrastructure Status
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Real-time Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Status refreshes automatically every minute
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">14+ Providers</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor AWS, Azure, GCP, GitHub, and more
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <History className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Incident History</h3>
                    <p className="text-sm text-muted-foreground">
                      Track outages and maintenance windows
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Embed Instructions */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Embed on Your Site</h2>
                <p className="text-muted-foreground mb-6">
                  Add this simple script tag to any webpage to display the live status ticker:
                </p>
                
                <div className="bg-muted rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto">
                    <code>{embedCode}</code>
                  </pre>
                </div>
                
                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <p><strong>Options:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><code>data-theme</code>: "light" or "dark" (default: "dark")</li>
                    <li><code>data-auto-scroll</code>: "true" or "false" (default: "true")</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StatusTicker;
