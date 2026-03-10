import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceCardGrid, type ServiceCardData } from "./ServiceCard";
import { useMemo } from "react";

type Msg = { role: "user" | "assistant"; content: string };

/**
 * Parses message content for ```servicecard JSON blocks.
 * Returns an array of segments: either { type: "text", value } or { type: "cards", value: ServiceCardData[] }
 */
function parseRichContent(content: string): Array<
  { type: "text"; value: string } | { type: "cards"; value: ServiceCardData[] }
> {
  const pattern = /```servicecards?\s*\n([\s\S]*?)```/gi;
  const segments: Array<{ type: "text"; value: string } | { type: "cards"; value: ServiceCardData[] }> = [];
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    // Text before the card block
    if (match.index > lastIndex) {
      const text = content.slice(lastIndex, match.index).trim();
      if (text) segments.push({ type: "text", value: text });
    }

    // Parse the JSON card data
    try {
      const parsed = JSON.parse(match[1]);
      const cards: ServiceCardData[] = Array.isArray(parsed) ? parsed : [parsed];
      segments.push({ type: "cards", value: cards });
    } catch {
      // If JSON is invalid, render as text
      segments.push({ type: "text", value: match[0] });
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last card block
  const remaining = content.slice(lastIndex).trim();
  if (remaining) segments.push({ type: "text", value: remaining });

  return segments;
}

export function ChatMessage({ message }: { message: Msg }) {
  const isUser = message.role === "user";
  const segments = useMemo(
    () => (isUser ? null : parseRichContent(message.content)),
    [message.content, isUser]
  );

  return (
    <div className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}>
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
          isUser ? "bg-accent/20" : "bg-primary/10"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-accent-foreground" />
        ) : (
          <Sparkles className="h-4 w-4 text-primary" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm"
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}
