import { useState } from "react";
import { Play } from "lucide-react";

interface VideoAskEmbedProps {
  src: string;
  title: string;
  height?: number;
  className?: string;
}

/**
 * Click-to-load facade for VideoAsk embeds.
 * No request reaches videoask.com until the visitor clicks — same
 * consent standard as the ElevenLabs "Ava" widget.
 */
const VideoAskEmbed = ({ src, title, height = 600, className }: VideoAskEmbedProps) => {
  const [activated, setActivated] = useState(false);

  if (!activated) {
    return (
      <button
        type="button"
        onClick={() => setActivated(true)}
        aria-label={`Play ${title}`}
        style={{ height }}
        className={`group relative flex w-full flex-col items-center justify-center gap-4 rounded-3xl bg-gradient-to-br from-legal-primary/10 to-legal-accent/10 transition-colors hover:from-legal-primary/20 hover:to-legal-accent/20 ${className ?? ""}`}
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-legal-primary text-primary-foreground shadow-xl transition-transform group-hover:scale-110">
          <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
        </span>
        <span className="text-base font-semibold text-legal-primary">
          Tap to play the video
        </span>
        <span className="text-xs text-muted-foreground">
          Loads interactive video from VideoAsk when you click
        </span>
      </button>
    );
  }

  return (
    <iframe
      src={src}
      title={title}
      allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
      width="100%"
      height={`${height}px`}
      style={{ border: "none" }}
      className={`w-full ${className ?? ""}`}
    />
  );
};

export default VideoAskEmbed;
