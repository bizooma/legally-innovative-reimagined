import { useState, useEffect } from "react";

const WELCOME_TEXT = "Hey! I'm Biz — Bizooma's AI assistant. I know everything about our services, can give you a quick quote, or even run a mini audit. What can I help with? 👋";

export function TypingWelcome({ onComplete }: { onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(WELCOME_TEXT.slice(0, i));
      if (i >= WELCOME_TEXT.length) {
        clearInterval(id);
        setDone(true);
        onComplete?.();
      }
    }, 22);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <div className="text-center py-4 space-y-3">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
        <span className="text-2xl">✨</span>
      </div>
      <p className="text-sm text-foreground leading-relaxed px-2 min-h-[3rem]">
        {displayed}
        {!done && (
          <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
        )}
      </p>
    </div>
  );
}
