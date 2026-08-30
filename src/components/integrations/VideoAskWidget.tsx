import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

declare global {
  interface Window {
    VIDEOASK_EMBED_CONFIG?: {
      kind: string;
      url: string;
      options: {
        widgetType: string;
        text: string;
        backgroundColor: string;
        position: string;
        dismissible: boolean;
        videoPosition: string;
      };
    };
  }
}

export const VideoAskWidget = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't show widget on portal pages or mobile devices
  const isPortalPage = location.pathname.startsWith('/portal');

  useEffect(() => {
    // Don't load widget on portal pages or mobile devices
    if (isPortalPage || isMobile) {
      return;
    }

    // Nothing reaches videoask.com until the visitor actually interacts
    // with the page (click, tap, or keyboard) — same standard as Ava.
    let loaded = false;
    let script: HTMLScriptElement | null = null;

    const loadWidget = () => {
      if (loaded) return;
      loaded = true;

      window.VIDEOASK_EMBED_CONFIG = {
        kind: "widget",
        url: "https://www.videoask.com/fe7op508y",
        options: {
          widgetType: "VideoThumbnailWindowTall",
          text: "Under Construction",
          backgroundColor: "#962F31",
          position: "bottom-right",
          dismissible: false,
          videoPosition: "center top"
        }
      };

      script = document.createElement('script');
      script.src = 'https://www.videoask.com/embed/embed.js';
      script.async = true;
      document.body.appendChild(script);
    };

    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown'];
    events.forEach((evt) => window.addEventListener(evt, loadWidget, { once: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, loadWidget));
      // Cleanup on unmount
      if (script && script.parentNode) {
        document.body.removeChild(script);
      }
      delete window.VIDEOASK_EMBED_CONFIG;
    };
  }, [isPortalPage, isMobile]);

  return null;
};
