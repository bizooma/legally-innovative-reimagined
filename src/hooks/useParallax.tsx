import { useEffect, useState } from 'react';

/**
 * Hook to create parallax scroll effect
 * @param speed - Multiplier for scroll speed (0-1 for slower, >1 for faster)
 * @returns Transform value based on scroll position
 */
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setOffset(scrolled * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

/**
 * Hook to create fade-out effect on scroll
 * @param fadeStart - Scroll position to start fading (default: 100)
 * @param fadeEnd - Scroll position to complete fade (default: 400)
 * @returns Opacity value (0-1)
 */
export const useScrollFade = (fadeStart: number = 100, fadeEnd: number = 400) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      if (scrolled <= fadeStart) {
        setOpacity(1);
      } else if (scrolled >= fadeEnd) {
        setOpacity(0);
      } else {
        const fadeRange = fadeEnd - fadeStart;
        const scrollProgress = scrolled - fadeStart;
        setOpacity(1 - (scrollProgress / fadeRange));
      }
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fadeStart, fadeEnd]);

  return opacity;
};
