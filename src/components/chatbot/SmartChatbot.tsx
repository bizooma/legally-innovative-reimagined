import { useState, useRef, useEffect, useCallback } from "react";
import bizMascot from "@/assets/biz-mascot.png";
import { MessageSquare, X, Send, ChevronDown, Square } from "lucide-react";
import { usePageContext } from "@/hooks/usePageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ChatMessage, SkeletonCard } from "./ChatMessage";
import { TypingWelcome } from "./TypingWelcome";
import { useLocation } from "react-router-dom";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/site-chatbot`;

async function streamChat({
  messages,
  currentSection,
  onDelta,
  onDone,
  onError,
  signal,
}: {
  messages: Msg[];
  currentSection: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
  signal?: AbortSignal;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, currentSection }),
      signal,
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      onError(errData.error || "Something went wrong. Please try again.");
      return;
    }

    if (!resp.body) {
      onError("No response received.");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          /* ignore */
        }
      }
    }

    onDone();
  } catch (e: any) {
    if (e.name === "AbortError") return;
    onError("Connection lost. Please try again.");
  }
}

export function SmartChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewChatConfirm, setShowNewChatConfirm] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showProactive, setShowProactive] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();

  const { currentSection, proactivePrompt, suggestedPrompts, dismissProactive } =
    usePageContext();

  const isHiddenPage =
    location.pathname.startsWith("/portal") ||
    location.pathname.startsWith("/staff") ||
    location.pathname.startsWith("/embed");

  useEffect(() => {
    if (proactivePrompt && !isOpen) {
      setShowProactive(true);
    } else {
      setShowProactive(false);
    }
  }, [proactivePrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Msg = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);
      dismissProactive();

      let assistantSoFar = "";
      abortRef.current = new AbortController();

      const upsertAssistant = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
            );
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
      };

      await streamChat({
        messages: newMessages,
        currentSection,
        onDelta: upsertAssistant,
        onDone: () => setIsLoading(false),
        onError: (err) => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: `⚠️ ${err}` },
          ]);
          setIsLoading(false);
        },
        signal: abortRef.current.signal,
      });
    },
    [messages, isLoading, currentSection, dismissProactive]
  );

  const handleAbort = () => {
    abortRef.current?.abort();
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (isHiddenPage) return null;

  return (
    <>
      {/* Proactive bubble */}
      {showProactive && !isOpen && (
        <div
          key={proactivePrompt}
          className="fixed bottom-24 right-4 z-50 max-w-xs animate-in slide-in-from-right-5 fade-in duration-500 cursor-pointer"
          onClick={handleOpen}
        >
          <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl rounded-br-sm p-4 shadow-2xl">
            <p className="text-sm text-foreground">{proactivePrompt}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowProactive(false);
                dismissProactive();
              }}
              className="absolute -top-2 -right-2 bg-muted rounded-full p-1 hover:bg-accent transition-colors"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-50 flex flex-col bg-background/95 backdrop-blur-xl border border-border shadow-2xl transition-all duration-300",
            isClosing ? "chatbot-slide-down" : "chatbot-slide-up",
            isMobile
              ? "inset-0"
              : "bottom-24 right-4 w-[420px] h-[600px] max-h-[80vh] rounded-2xl"
          )}
        >
          {/* Header — minimal */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <img src={bizMascot} alt="Biz" className="w-8 h-8 object-contain" />
              <h3 className="text-sm font-semibold text-foreground tracking-tight">Biz</h3>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={() => setShowNewChatConfirm(true)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="New chat"
                  title="New chat"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                {isMobile ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Messages feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <TypingWelcome
                onComplete={() => setWelcomeDone(true)}
                suggestedPrompts={welcomeDone ? suggestedPrompts : undefined}
                onSuggestion={sendMessage}
              />
            )}

            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <SkeletonCard />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input — floating bar */}
          <div className="px-4 py-3 border-t border-border">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Biz anything..."
                  className="flex-1 bg-muted/50 border border-input rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 transition-shadow"
                  disabled={isLoading}
                />
                {isLoading ? (
                  <button
                    type="button"
                    onClick={handleAbort}
                    className="p-2.5 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  >
                    <Square className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
            <p className="text-[9px] text-muted-foreground/40 text-center mt-1.5 tracking-wide">
              Powered by Bizooma AI
            </p>
          </div>
        </div>
      )}

      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-4 right-4 z-50 w-16 h-16 hover:scale-110 transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl"
          aria-label="Open chat"
        >
          <img src={bizMascot} alt="Chat with Biz" className="w-full h-full object-contain" />
        </button>
      )}
    </>
  );
}
