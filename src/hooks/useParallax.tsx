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
