import { useEffect } from 'react';

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
  useEffect(() => {
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
  }, []);

  return null;
};
