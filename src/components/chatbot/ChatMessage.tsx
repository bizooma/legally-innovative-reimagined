import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { ServiceCardGrid, type ServiceCardData } from "./ServiceCard";
import { useMemo } from "react";

type Msg = { role: "user" | "assistant"; content: string };

/**
 * Parses message content for ```servicecard JSON blocks.
 */
function parseRichContent(content: string): Array<
  { type: "text"; value: string } | { type: "cards"; value: ServiceCardData[] }
> {
  const pattern = /```servicecards?\s*\n([\s\S]*?)```/gi;
  const segments: Array<{ type: "text"; value: string } | { type: "cards"; value: ServiceCardData[] }> = [];
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const text = content.slice(lastIndex, match.index).trim();
      if (text) segments.push({ type: "text", value: text });
    }
    try {
      const parsed = JSON.parse(match[1]);
      const cards: ServiceCardData[] = Array.isArray(parsed) ? parsed : [parsed];
      segments.push({ type: "cards", value: cards });
    } catch {
      segments.push({ type: "text", value: match[0] });
    }
    lastIndex = match.index + match[0].length;
  }

  const remaining = content.slice(lastIndex).trim();
  if (remaining) segments.push({ type: "text", value: remaining });

  return segments;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function ChatMessage({ message, timestamp }: { message: Msg; timestamp?: Date }) {
  const isUser = message.role === "user";
  const segments = useMemo(
    () => (isUser ? null : parseRichContent(message.content)),
    [message.content, isUser]
  );

  if (isUser) {
    return (
      <div className="animate-fade-in">
        <div className="border-l-2 border-muted-foreground/30 bg-muted/40 rounded-r-lg px-4 py-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 block mb-1">
            You
          </span>
          <p className="text-sm text-foreground">{message.content}</p>
        </div>
        {timestamp && (
          <div className="flex items-center gap-2 mt-2 mb-1">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-[10px] text-muted-foreground/50 font-medium">{formatTime(timestamp)}</span>
            <div className="flex-1 h-px bg-border/50" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="border-l-[3px] border-primary bg-card rounded-r-lg px-4 py-3 shadow-sm">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70 block mb-1.5 chatbot-shimmer-text">
          ✦ Biz
        </span>
        <div className="space-y-2">
          {segments?.map((seg, i) =>
            seg.type === "cards" ? (
              <ServiceCardGrid key={i} cards={seg.value} />
            ) : (
              <div
                key={i}
                className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1.5 [&_ul]:my-1.5 [&_ol]:my-1.5 [&_li]:my-0.5"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {seg.value}
                </ReactMarkdown>
              </div>
            )
          )}
        </div>
      </div>
      {timestamp && (
        <div className="flex items-center gap-2 mt-2 mb-1">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-[10px] text-muted-foreground/50 font-medium">{formatTime(timestamp)}</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>
      )}
    </div>
  );
}

/** Skeleton loading card that mimics an incoming AI response */
export function SkeletonCard() {
  return (
    <div className="animate-fade-in">
      <div className="border-l-[3px] border-primary/40 bg-card rounded-r-lg px-4 py-3 shadow-sm">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/50 block mb-2">
          ✦ Biz
        </span>
        <div className="space-y-2.5">
          <div className="h-3 w-4/5 rounded-full bg-muted animate-pulse" />
          <div className="h-3 w-3/5 rounded-full bg-muted animate-pulse [animation-delay:150ms]" />
          <div className="h-3 w-2/3 rounded-full bg-muted animate-pulse [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
