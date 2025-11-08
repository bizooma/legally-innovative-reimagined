import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  
  // Don't show widget on portal pages
  const isPortalPage = location.pathname.startsWith('/portal');
  
  useEffect(() => {
    // Don't load widget on portal pages
    if (isPortalPage) {
      return;
    }
    // Set VideoAsk configuration
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

    // Load VideoAsk script
    const script = document.createElement('script');
    script.src = 'https://www.videoask.com/embed/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      delete window.VIDEOASK_EMBED_CONFIG;
    };
  }, [isPortalPage]);

  return null;
};
