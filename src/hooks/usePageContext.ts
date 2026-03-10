import { useState, useEffect, useCallback } from "react";

interface SectionConfig {
  id: string;
  label: string;
  proactivePrompt: string;
  suggestedPrompts: string[];
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    id: "hero",
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
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const [proactivePrompt, setProactivePrompt] = useState<string | null>(null);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(DEFAULT_PROMPTS);
  const [hasShownProactive, setHasShownProactive] = useState<Set<string>>(new Set());

  const updateSection = useCallback(
    (sectionId: string) => {
      setCurrentSection(sectionId);
      const config = SECTION_CONFIGS.find((s) => s.id === sectionId);
      if (config) {
        setSuggestedPrompts(config.suggestedPrompts);
        // Show proactive prompt only once per section
        if (!hasShownProactive.has(sectionId)) {
          const timer = setTimeout(() => {
            setProactivePrompt(config.proactivePrompt);
            setHasShownProactive((prev) => new Set(prev).add(sectionId));
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
    },
    [hasShownProactive]
  );

  useEffect(() => {
    const sectionIds = SECTION_CONFIGS.map((s) => s.id);
    const elements: Element[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let maxRatio = 0;
        let visibleId = "";
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleId = entry.target.id;
          }
        });
        if (visibleId) {
          updateSection(visibleId);
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: "-10% 0px -10% 0px" }
    );

    // Observe all sections that exist in the DOM
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [updateSection]);

  const dismissProactive = useCallback(() => {
    setProactivePrompt(null);
  }, []);

  return {
    currentSection,
    proactivePrompt,
    suggestedPrompts,
    dismissProactive,
  };
}
