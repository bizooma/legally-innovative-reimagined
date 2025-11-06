import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { Download, Smartphone, Zap, Wifi, Bell } from 'lucide-react';
import { trackEvent } from '@/utils/gtmTracking';

const InstallPWA = () => {
  const { installApp, isInstallable, isInstalled } = useInstallPrompt();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent({
      event: 'page_view',
      event_category: 'engagement',
      event_label: 'Install PWA',
      page_path: '/install'
    });
  }, []);

  const handleInstallClick = async () => {
    trackEvent({
      event: 'pwa_install_attempt',
      event_category: 'engagement',
      event_label: 'Install Button Click'
    });

    const success = await installApp();
    
    if (success) {
      trackEvent({
        event: 'pwa_install_success',
        event_category: 'engagement',
        event_label: 'App Installed'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Install Bizooma App | Progressive Web App</title>
        <meta name="description" content="Install the Bizooma app on your device for faster access, offline functionality, and a native app experience." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="section-padding">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <Download className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Install Bizooma App
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get instant access to Bizooma with our Progressive Web App. Works like a native app, no download required.
              </p>
            </div>

            {/* Installation Status */}
            {isInstalled ? (
              <div className="bg-primary/10 border-2 border-primary rounded-lg p-8 text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                  <Download className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">App Already Installed!</h2>
                <p className="text-muted-foreground">
                  You're currently using Bizooma as an installed app.
                </p>
              </div>
            ) : isInstallable ? (
              <div className="bg-accent/10 border-2 border-accent rounded-lg p-8 text-center mb-12">
                <Button 
                  onClick={handleInstallClick}
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Download className="mr-2 w-5 h-5" />
                  Install Bizooma Now
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Click the button above to install the app to your device
                </p>
              </div>
            ) : (
              <div className="bg-muted border rounded-lg p-8 mb-12">
                <h2 className="text-xl font-bold mb-4">Installation Instructions</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Smartphone className="w-5 h-5 mr-2" />
                      iOS (iPhone/iPad)
                    </h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-7">
                      <li>Tap the Share button at the bottom of Safari</li>
                      <li>Scroll down and tap "Add to Home Screen"</li>
                      <li>Tap "Add" in the top right corner</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Smartphone className="w-5 h-5 mr-2" />
                      Android
                    </h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-7">
                      <li>Tap the menu button (3 dots) in Chrome</li>
                      <li>Tap "Install app" or "Add to Home screen"</li>
                      <li>Tap "Install" to confirm</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      Desktop
                    </h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-7">
                      <li>Look for the install icon in your browser's address bar</li>
                      <li>Click the install icon or use browser menu</li>
                      <li>Click "Install" to add Bizooma to your apps</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Lightning Fast</h3>
                    <p className="text-sm text-muted-foreground">
                      Instant loading with cached resources. No waiting for pages to load.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Wifi className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Works Offline</h3>
                    <p className="text-sm text-muted-foreground">
                      Access key features even when you're offline or have poor connection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Native Feel</h3>
                    <p className="text-sm text-muted-foreground">
                      Full-screen experience without browser chrome. Feels like a real app.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Bell className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Stay Updated</h3>
                    <p className="text-sm text-muted-foreground">
                      Always have the latest features with automatic updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-card border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">What is a Progressive Web App (PWA)?</h3>
                  <p className="text-sm text-muted-foreground">
                    A PWA is a website that can be installed like a native app. It offers offline functionality, 
                    faster loading, and a native app-like experience without requiring a download from an app store.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">How much storage does it use?</h3>
                  <p className="text-sm text-muted-foreground">
                    Very minimal - typically just a few megabytes. The app caches essential resources for 
                    faster loading and offline access.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Can I uninstall it later?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! You can uninstall it just like any other app. On iOS, long-press the icon and tap "Remove App". 
                    On Android, long-press and drag to "Uninstall".
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Will it work without internet?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! Basic functionality and cached content will be available offline. Some features that require 
                    real-time data will need an internet connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InstallPWA;
