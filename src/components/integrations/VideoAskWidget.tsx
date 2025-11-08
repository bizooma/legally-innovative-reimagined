import { useEffect } from "react";

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

const VideoAskWidget = () => {
  useEffect(() => {
    console.log('[VideoAsk] Setting up widget configuration');
    
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

    const injectVideoAsk = () => {
      // Check if script already exists
      const existingScript = document.querySelector('script[data-videoask="1"]');
      if (existingScript) {
        console.log('[VideoAsk] Script already loaded');
        return;
      }

      console.log('[VideoAsk] Injecting script');
      const script = document.createElement('script');
      script.src = 'https://www.videoask.com/embed/embed.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-videoask', '1');
      
      script.onload = () => {
        console.log('✅ [VideoAsk] Script loaded successfully');
      };
      
      script.onerror = (error) => {
        console.error('❌ [VideoAsk] Script failed to load:', error);
      };
      
      document.body.appendChild(script);
    };

    const waitForDID = async () => {
      console.log('[VideoAsk] Waiting for D-ID to be ready...');
      const deadline = Date.now() + 15000; // 15 second timeout to avoid blocking
      
      while (Date.now() < deadline) {
        const target = document.getElementById('did-agent-hero');
        const hasEmbed =
          !!document.querySelector('.d-id-agent-container') ||
          !!(target && (target.childElementCount > 0 || target.querySelector('iframe'))) ||
          (window.didAgentDebug?.status === 'initialized');
        
        if (hasEmbed) {
          console.log('[VideoAsk] D-ID is ready, injecting VideoAsk now');
          injectVideoAsk();
          return;
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      console.log('[VideoAsk] Timeout waiting for D-ID, injecting VideoAsk anyway');
      injectVideoAsk();
    };

    // Load after page is ready
    const isHome = window.location.pathname === '/';
    if (isHome) {
      console.log('[VideoAsk] Skipping injection on home route to avoid conflict with D-ID');
    } else if (document.readyState === 'complete') {
      injectVideoAsk();
    } else {
      window.addEventListener('load', injectVideoAsk);
    }

    return () => {
      // Cleanup: remove script on unmount
      window.removeEventListener('load', waitForDID);
      window.removeEventListener('load', injectVideoAsk);
      const script = document.querySelector('script[data-videoask="1"]');
      if (script && script.parentNode) {
        console.log('[VideoAsk] Cleaning up script');
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default VideoAskWidget;
