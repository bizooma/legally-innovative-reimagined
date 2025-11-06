import { useEffect, useRef } from 'react';
import { trackEvent } from '@/utils/gtmTracking';

interface ScrollDepthTrackerOptions {
  pageName: string;
  enabled?: boolean;
}

/**
 * Hook to track scroll depth on a page
 * Tracks when users scroll to 25%, 50%, 75%, and 100% of the page
 */
export const useScrollTracking = ({ pageName, enabled = true }: ScrollDepthTrackerOptions) => {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || window.pageYOffset;
      
      // Calculate scroll percentage
      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = (scrollTop / scrollableHeight) * 100;

      // Define milestones
      const milestones = [25, 50, 75, 100];

      // Check each milestone
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          
          // Track scroll depth event
          trackEvent({
            event: 'scroll_depth',
            event_category: 'engagement',
            event_label: `${milestone}%`,
            page_name: pageName,
            scroll_depth: milestone,
          });
        }
      });
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      trackedDepths.current.clear();
    };
  }, [pageName, enabled]);
};
