import { useEffect, useState } from 'react';

export const HoverPumpkins = () => {
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
    };
  }, []);

  useEffect(() => {
    hoveredButtons.forEach(button => {
      if (!button.querySelector('.hover-pumpkin')) {
        const pumpkin = document.createElement('span');
        pumpkin.className = 'hover-pumpkin absolute -top-8 left-1/2 -translate-x-1/2 text-3xl animate-bounce-slow pointer-events-none z-50';
        pumpkin.innerHTML = '🎃';
        const htmlButton = button as HTMLElement;
        htmlButton.style.position = 'relative';
        button.appendChild(pumpkin);
      }
    });

    // Cleanup pumpkins that are no longer hovered
    document.querySelectorAll('.hover-pumpkin').forEach(pumpkin => {
      const button = pumpkin.parentElement;
      if (button && !hoveredButtons.has(button)) {
        pumpkin.remove();
      }
    });
  }, [hoveredButtons]);

  return null;
};
