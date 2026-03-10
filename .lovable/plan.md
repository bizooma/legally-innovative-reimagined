

# Innovative Multi-Modal, Context-Aware Chatbot

## Concept

A floating chatbot that lives on every page of the site and does two things no typical chatbot does:

1. **Context Awareness** -- It detects which section/page the visitor is viewing and proactively offers relevant help via a subtle notification bubble (e.g., on the AI Chatbot service card it says "Want to see a live chatbot demo? Ask me!")
2. **Multi-Modal Responses** -- Beyond plain text, the bot renders rich inline content: interactive service comparisons, mini capability demos, quick-qualification forms, and direct calendar booking links

This serves as a live portfolio piece: visitors experience the exact kind of intelligent chatbot you build for clients.

## Architecture

```text
┌─────────────────────────────────────┐
│  SmartChatbot (floating widget)     │
│  ├─ Context Observer (IntersectionObserver) │
│  ├─ Chat UI with markdown + rich cards      │
│  └─ Proactive suggestion bubble             │
└───────────┬─────────────────────────┘
            │ POST /functions/v1/site-chatbot
            ▼
┌─────────────────────────────────────┐
│  Edge Function: site-chatbot        │
│  - System prompt with full service  │
│    knowledge + current page context │
│  - Lovable AI Gateway (streaming)   │
│  - Tool calling for structured      │
│    responses (service cards, CTAs)  │
└─────────────────────────────────────┘
```

## Key Features

**Context-Aware Proactive Prompts:**
- Uses IntersectionObserver to track which section is in view (Hero, Services, Contact, etc.)
- Sends page context to the AI so responses are relevant
- Shows a subtle animated bubble with contextual suggestions (e.g., "Curious about AI chatbots? I can show you a live demo")

**Multi-Modal Rich Responses:**
- Markdown rendering for all AI responses (react-markdown)
- AI can return structured "tool call" responses that render as:
  - **Service comparison cards** -- side-by-side feature grids
  - **Quick quote estimator** -- interactive form that scopes a project
  - **Live capability demos** -- e.g., "Watch me analyze your website" (triggers the existing SEO audit flow)
  - **Calendar booking CTA** -- embedded scheduling link
- Regular text answers for general questions

**Chatbot UI:**
- Floating button (bottom-right corner) with pulse animation
- Expandable chat panel with glass-morphism design
- Typing indicator with animated dots
- Suggested prompts that change based on current page context
- Mobile-responsive (full-width sheet on mobile)

## Implementation Steps

1. **Create edge function `site-chatbot`** -- Lovable AI Gateway with streaming, system prompt containing full service catalog, accepts `currentSection` context parameter, uses tool calling for structured card responses
2. **Build `SmartChatbot` component** -- Floating widget with chat UI, markdown rendering, rich card rendering for tool-call responses
3. **Add `usePageContext` hook** -- IntersectionObserver-based hook that tracks which section is currently visible and provides contextual suggested prompts
4. **Add proactive suggestion system** -- After a few seconds on a section, show a subtle bubble with a context-specific prompt
5. **Register in config.toml** and mount component in the main layout
6. **Install `react-markdown`** for AI response rendering

## System Prompt Strategy

The AI will be prompted as "Biz" -- Bizooma's AI assistant -- with deep knowledge of all four services, pricing ranges, case studies, and the ability to qualify leads. It will receive the visitor's current page section as context to tailor responses.

## Tech Details

- **Model:** google/gemini-3-flash-preview (fast, capable)
- **Streaming:** SSE token-by-token via Lovable AI Gateway
- **Auth:** Public (verify_jwt = false) -- this is a public-facing chatbot
- **Rich responses:** Tool calling with structured output for service cards, CTAs, and demos
- **Dependencies to add:** react-markdown, remark-gfm

