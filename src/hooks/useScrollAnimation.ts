import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to animate elements when they enter the viewport
 * Uses Intersection Observer API for performance
 */
export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  animationClass = 'animate-fade-in',
  triggerOnce = true,
}: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add initial opacity-0 to hide element before animation
    element.style.opacity = '0';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove opacity-0 and add animation class
            element.style.opacity = '1';
            element.classList.add(animationClass);
            
            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            element.style.opacity = '0';
            element.classList.remove(animationClass);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, animationClass, triggerOnce]);

  return elementRef;
};
