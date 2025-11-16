import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone } from 'lucide-react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { trackEvent } from '@/utils/gtmTracking';

const PWAInstallBanner = () => {
  const { installApp, canInstall } = useInstallPrompt();
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Check if user has dismissed the banner before
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (!dismissed && canInstall) {
      setIsDismissed(false);
    }
  }, [canInstall]);

  const handleDismiss = () => {
    localStorage.setItem('pwa-banner-dismissed', 'true');
    setIsDismissed(true);
    trackEvent({
      event: 'pwa_banner_dismissed',
      event_category: 'engagement',
      event_label: 'Footer Banner Dismissed'
    });
  };

  const handleInstall = async () => {
    trackEvent({
      event: 'pwa_banner_install_attempt',
      event_category: 'engagement',
      event_label: 'Footer Banner Install'
    });

    const success = await installApp();
    
    if (success) {
      trackEvent({
        event: 'pwa_banner_install_success',
        event_category: 'engagement',
        event_label: 'App Installed from Footer Banner'
      });
      setIsDismissed(true);
    }
  };

  if (!canInstall || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up-banner">
      <div className="bg-gradient-to-r from-primary via-primary to-accent shadow-2xl border-t border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Install Button - First */}
            <Button
              onClick={handleInstall}
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg flex-shrink-0"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Install Now
            </Button>

            {/* Icon and Message */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Install Our App
                </h4>
                <p className="text-white/90 text-xs sm:text-sm">
                  Get faster access and work offline. Install in one tap!
                </p>
              </div>
            </div>

            {/* Close Button */}
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 flex-shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;
