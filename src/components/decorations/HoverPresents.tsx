import { useEffect, useState } from 'react';

export const HoverPresents = () => {
  const [hoveredButtons, setHoveredButtons] = useState<Set<Element>>(new Set());

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const button = target.closest('button');
      if (button) {
        setHoveredButtons(prev => new Set(prev).add(button));
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      const button = target.closest('button');
      if (button) {
        setHoveredButtons(prev => {
          const next = new Set(prev);
          next.delete(button);
          return next;
        });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      // Cleanup all presents when component unmounts
      document.querySelectorAll('.hover-present').forEach(present => {
        present.remove();
      });
    };
  }, []);

  useEffect(() => {
    hoveredButtons.forEach(button => {
      if (!button.querySelector('.hover-present')) {
        const present = document.createElement('span');
        present.className = 'hover-present absolute -top-8 left-1/2 -translate-x-1/2 text-3xl animate-bounce-slow pointer-events-none z-50';
        present.innerHTML = '🎁';
        const htmlButton = button as HTMLElement;
        htmlButton.style.position = 'relative';
        button.appendChild(present);
      }
    });

    // Cleanup presents that are no longer hovered
    document.querySelectorAll('.hover-present').forEach(present => {
      const button = present.parentElement;
      if (button && !hoveredButtons.has(button)) {
        present.remove();
      }
    });
  }, [hoveredButtons]);

  return null;
};
