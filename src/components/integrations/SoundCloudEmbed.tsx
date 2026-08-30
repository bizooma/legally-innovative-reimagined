import { useState } from "react";
import { Play } from "lucide-react";

interface SoundCloudEmbedProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Click-to-load facade for SoundCloud players.
 * No request reaches soundcloud.com until the visitor clicks.
 */
const SoundCloudEmbed = ({ src, title, className }: SoundCloudEmbedProps) => {
  const [activated, setActivated] = useState(false);

  if (!activated) {
    return (
      <button
        type="button"
        onClick={() => setActivated(true)}
        aria-label={`Play ${title}`}
        className={`group flex w-full items-center gap-4 rounded-xl border border-border bg-card px-5 py-6 text-left transition-colors hover:bg-muted/50 ${className ?? ""}`}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
          <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-semibold text-foreground">{title}</span>
          <span className="block text-xs text-muted-foreground">
            Loads the SoundCloud player when you click
          </span>
        </span>
      </button>
    );
  }

  return (
    <iframe
      width="100%"
      className={`h-32 sm:h-40 md:h-44 lg:h-[166px] ${className ?? ""}`}
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      title={title}
      src={src}
    />
  );
};

export default SoundCloudEmbed;
