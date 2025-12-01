import { useState } from 'react';
import { FallingSnow } from './FallingSnow';
import { SantaWalk } from './SantaWalk';
import { ChristmasConfetti } from './ChristmasConfetti';
import { ChristmasBanner } from './ChristmasBanner';
import { HoverPresents } from './HoverPresents';

interface ChristmasDecorationsProps {
  show: boolean;
}

export const ChristmasDecorations = ({ show }: ChristmasDecorationsProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti once when show becomes true
  if (show && !showConfetti) {
    setShowConfetti(true);
  }

  if (!show) return null;

  return (
    <>
      {/* Cool winter overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 animate-fade-in" />
      </div>

      {/* Falling snow */}
      <FallingSnow />

      {/* Walking Santa */}
      <SantaWalk />

      {/* Christmas banner */}
      <ChristmasBanner />

      {/* Hover presents on buttons */}
      <HoverPresents />

      {/* Confetti burst (one-time) */}
      {showConfetti && <ChristmasConfetti />}
    </>
  );
};
