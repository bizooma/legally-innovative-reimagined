import { createElement, useCallback, useState } from "react";
import { Mic } from "lucide-react";

/**
 * ElevenLabs "Ava" voice assistant.
 * Nothing is requested from ElevenLabs until the visitor clicks to open it.
 * Served from a version-pinned jsDelivr URL (stable, immutable) instead of unpkg.
 */
const WIDGET_SRC =
  "https://cdn.jsdelivr.net/npm/@elevenlabs/convai-widget-embed@0.17.1/dist/index.js";
const AGENT_ID = "cylHD3Ay9g1H7eGVdSdj";

const AvaVoiceWidget = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const activate = useCallback(() => {
    if (loaded || loading) return;
    setLoading(true);
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.type = "text/javascript";
    script.onload = () => {
      setLoaded(true);
      setLoading(false);
    };
    script.onerror = () => setLoading(false);
    document.body.appendChild(script);
  }, [loaded, loading]);

  if (loaded) {
    // Custom element — created via createElement so no JSX typing shim is needed.
    return createElement("elevenlabs-convai", { "agent-id": AGENT_ID });
  }


  return (
    <button
      type="button"
      onClick={activate}
      aria-label="Open Ava, the Bizooma voice assistant"
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-legal-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 disabled:opacity-70 md:bottom-6"
      disabled={loading}
    >
      <Mic className="h-4 w-4" />
      {loading ? "Loading Ava…" : "Talk to Ava"}
    </button>
  );
};

export default AvaVoiceWidget;
