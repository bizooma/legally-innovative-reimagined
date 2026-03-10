import { useState, useEffect } from "react";

const WELCOME_TEXT = "Hey! I'm Biz — Bizooma's AI assistant. I know everything about our services, can give you a quick quote, or even run a mini audit. What can I help with?";

export function TypingWelcome({
  onComplete,
  suggestedPrompts,
  onSuggestion,
}: {
  onComplete?: () => void;
  suggestedPrompts?: string[];
  onSuggestion?: (prompt: string) => void;
}) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-3 animate-fade-in">
      {/* Hero card */}
      <div className="border-l-[3px] border-primary bg-card rounded-r-lg px-4 py-4 shadow-sm">
        <div className="text-2xl mb-2 chatbot-shimmer-text inline-block">✦</div>
        <p className="text-sm text-foreground leading-relaxed min-h-[3rem]">
          {displayed}
          {!done && (
            <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
          )}
        </p>
      </div>

      {/* Suggested prompts as pills */}
      {done && suggestedPrompts && suggestedPrompts.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onSuggestion?.(prompt)}
              className="px-3 py-1.5 rounded-full border border-border bg-muted/50 hover:bg-primary/10 hover:border-primary/30 text-xs text-foreground transition-all duration-200"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
