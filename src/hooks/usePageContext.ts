import { useState, useEffect, useRef, useCallback } from "react";

interface SectionConfig {
  id: string;
  label: string;
  proactivePrompt: string;
  suggestedPrompts: string[];
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    id: "home",
    label: "Hero",
    proactivePrompt: "👋 Welcome! Want to know how AI can transform your business?",
    suggestedPrompts: [
      "What does Bizooma do?",
      "How can AI help my business?",
      "Tell me about your services",
    ],
  },
  {
    id: "about",
    label: "About",
    proactivePrompt: "Curious about Bizooma's story? Ask me anything!",
    suggestedPrompts: [
      "Tell me about Joe and Bizooma",
      "What makes Bizooma different?",
      "What industries do you serve?",
    ],
  },
  {
    id: "services",
    label: "Services",
    proactivePrompt: "🤖 Interested in a service? I can give you a detailed breakdown!",
    suggestedPrompts: [
      "Compare your AI services",
      "What does a custom chatbot cost?",
      "How long does app development take?",
    ],
  },
  {
    id: "service-ai-consulting",
    label: "AI Consulting",
    proactivePrompt: "Thinking about AI consulting? I can explain our approach!",
    suggestedPrompts: [
      "What's included in AI consulting?",
      "How do you assess AI readiness?",
      "What ROI can I expect from AI?",
    ],
  },
  {
    id: "service-custom-ai-chatbots",
    label: "Custom AI Chatbots",
    proactivePrompt: "🎯 You're looking at chatbots — and talking to one! Ask me anything.",
    suggestedPrompts: [
      "Show me what this chatbot can do",
      "How would a chatbot help my business?",
      "What's the chatbot development process?",
    ],
  },
  {
    id: "service-mobile-app-development",
    label: "Mobile App Development",
    proactivePrompt: "📱 Considering a mobile app? I can help scope your project!",
    suggestedPrompts: [
      "What type of apps do you build?",
      "How long does app development take?",
      "iOS, Android, or both?",
    ],
  },
  {
    id: "service-voice-assisted-marketing",
    label: "Voice Marketing",
    proactivePrompt: "🔊 Voice search is growing fast. Want to learn how to capitalize?",
    suggestedPrompts: [
      "What is voice assistant marketing?",
      "How do Alexa Skills help businesses?",
      "What's voice SEO?",
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    proactivePrompt: "Have a question not listed here? I can help!",
    suggestedPrompts: [
      "What's the difference between SEO and AEO?",
      "How long until I see results?",
      "What's your pricing structure?",
    ],
  },
  {
    id: "contact",
    label: "Contact",
    proactivePrompt: "Ready to chat? I can help you prepare for a consultation!",
    suggestedPrompts: [
      "What should I prepare for a consultation?",
      "What's the typical engagement process?",
      "Do you offer free consultations?",
    ],
  },
];

const DEFAULT_PROMPTS = [
  "What services does Bizooma offer?",
  "How can AI help my business?",
  "Tell me about custom chatbots",
];

export function usePageContext() {
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [proactivePrompt, setProactivePrompt] = useState<string | null>(null);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(DEFAULT_PROMPTS);

  // Refs for mutable tracking data — keeps observer stable
  const hasShownProactiveRef = useRef<Set<string>>(new Set());
  const ratiosRef = useRef<Map<string, number>>(new Map());
  const proactiveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentSectionRef = useRef<string>("home");

  const dismissProactive = useCallback(() => {
    setProactivePrompt(null);
  }, []);

  // Stable observer callback — no state dependencies
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    // Update ratios for all entries in this batch
    entries.forEach((entry) => {
      ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
    });

    // Find section with highest visibility
    let maxRatio = 0;
    let bestSection = "";
    ratiosRef.current.forEach((ratio, id) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        bestSection = id;
      }
    });

    if (!bestSection || maxRatio < 0.1) return;
    if (bestSection === currentSectionRef.current) return;

    // Section changed
    currentSectionRef.current = bestSection;
    setCurrentSection(bestSection);

    const config = SECTION_CONFIGS.find((s) => s.id === bestSection);
    if (config) {
      setSuggestedPrompts(config.suggestedPrompts);

      // Clear any pending proactive timer
      if (proactiveTimerRef.current) {
        clearTimeout(proactiveTimerRef.current);
        proactiveTimerRef.current = null;
      }

      // Show proactive prompt only once per section
      if (!hasShownProactiveRef.current.has(bestSection)) {
        proactiveTimerRef.current = setTimeout(() => {
          setProactivePrompt(config.proactivePrompt);
          hasShownProactiveRef.current.add(bestSection);
          proactiveTimerRef.current = null;
        }, 3000);
      }
    }
  }, []);

  useEffect(() => {
    const sectionIds = SECTION_CONFIGS.map((s) => s.id);
    const elements: Element[] = [];

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
      rootMargin: "-10% 0px -10% 0px",
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      if (proactiveTimerRef.current) {
        clearTimeout(proactiveTimerRef.current);
      }
    };
  }, [handleIntersection]);

  return {
    currentSection,
    proactivePrompt,
    suggestedPrompts,
    dismissProactive,
  };
}
