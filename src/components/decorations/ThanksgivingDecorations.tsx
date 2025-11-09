import { useState } from 'react';
import { FallingLeaves } from './FallingLeaves';
import { TurkeyWalk } from './TurkeyWalk';
import { AutumnConfetti } from './AutumnConfetti';
import { FloatingPumpkins } from './FloatingPumpkins';
import { Cornucopias } from './Cornucopias';
import { FeastTableBanner } from './FeastTableBanner';

interface ThanksgivingDecorationsProps {
  show: boolean;
}

export const ThanksgivingDecorations = ({ show }: ThanksgivingDecorationsProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti once when show becomes true
  if (show && !showConfetti) {
    setShowConfetti(true);
  }

  if (!show) return null;

  return (
    <>
      {/* Warm autumn overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-600/10 animate-fade-in" />
      </div>

      {/* Falling leaves */}
      <FallingLeaves />

      {/* Walking turkey */}
      <TurkeyWalk />

      {/* Floating pumpkins */}
      <FloatingPumpkins />

      {/* Cornucopias */}
      <Cornucopias />

      {/* Feast table banner */}
      <FeastTableBanner />

      {/* Confetti burst (one-time) */}
      {showConfetti && <AutumnConfetti />}
    </>
  );
};
