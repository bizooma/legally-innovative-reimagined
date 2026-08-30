import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

interface CalendlyEmbedProps {
  url: string;
  height?: number;
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    Calendly: any;
  }
}

/**
 * Click-to-load facade for Calendly inline embeds.
 * Nothing reaches assets.calendly.com or calendly.com until the visitor
 * clicks — same consent standard as the VideoAsk facade.
 */
const CalendlyEmbed = ({
  url,
  height = 700,
  label = "Book a call",
  className,
}: CalendlyEmbedProps) => {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (!activated) return;
    if (window.Calendly) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, [activated]);

  if (!activated) {
    return (
      <button
        type="button"
        onClick={() => setActivated(true)}
        aria-label={label}
        style={{ minHeight: 280 }}
        className={`group flex w-full flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-10 transition-colors hover:bg-muted/50 ${className ?? ""}`}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
          <CalendarDays className="h-7 w-7" />
        </span>
        <span className="text-lg font-semibold text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">
          Loads the Calendly scheduler when you click
        </span>
      </button>
    );
  }

  return (
    <div
      className={`calendly-inline-widget ${className ?? ""}`}
      data-url={url}
      style={{ minWidth: "320px", height: `${height}px` }}
    />
  );
};

export default CalendlyEmbed;
