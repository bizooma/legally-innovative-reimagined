import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const TURNSTILE_SITE_KEY = "0x4AAAAAAERyW41U2AvxZQYL";
export const TURNSTILE_ACTION = "turnstile-spin-v2";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

const loadTurnstile = () => {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    if (window.turnstile) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    const script = existing ?? document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("turnstile-load-failed")));
    if (!existing) document.head.appendChild(script);
  });
  return scriptPromise;
};

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

export interface TurnstileHandle {
  reset: () => void;
}

const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileWidgetProps>(({ onVerify, onExpire, className }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    },
  }), []);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        if (widgetIdRef.current) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action: TURNSTILE_ACTION,
          callback: (token: string) => onVerifyRef.current(token),
          "expired-callback": () => onExpireRef.current?.(),
          "error-callback": () => onExpireRef.current?.(),
        });
      })
      .catch((err) => console.error("Turnstile failed to load", err));

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cf-turnstile ${className ?? ""}`}
      data-sitekey={TURNSTILE_SITE_KEY}
      data-action={TURNSTILE_ACTION}
    />
  );
});

TurnstileWidget.displayName = "TurnstileWidget";

export default TurnstileWidget;
