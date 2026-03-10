

# Chatbot Redesign: Conversational Cards (No Bubbles)

## Concept

Replace the generic chat-bubble UI with a modern **card-based conversational feed**. Each message renders as a full-width content block -- user inputs appear as minimal prompt bars, and AI responses render as rich, structured cards with clear visual hierarchy. The result looks more like a curated AI content feed than a customer service widget.

## Visual Design

```text
┌──────────────────────────────────┐
│  ✦ Biz                     ━  ✕ │  ← Minimal header, no avatar circle
├──────────────────────────────────┤
│                                  │
│  ┌─ YOU ────────────────────┐    │  ← User msg: subtle left-bordered
│  │ What services do you...  │    │     monochrome card, compact
│  └──────────────────────────┘    │
│                                  │
│  ╔══════════════════════════╗    │  ← AI msg: full-width rich card
│  ║  Here's what we offer:  ║    │     with gradient left border
│  ║                         ║    │     (brand red), larger type,
│  ║  [Service Card Grid]    ║    │     markdown rendered inside
│  ║                         ║    │
│  ║  ─── 12:04 PM ────────  ║    │  ← Timestamp as divider
│  ╚══════════════════════════╝    │
│                                  │
│  ┌─────────────────────────────┐ │
│  │ Ask Biz anything...    [→]  │ │  ← Input: full-width, floating
│  └─────────────────────────────┘ │     with subtle glow on focus
└──────────────────────────────────┘
```

## Key Changes

### 1. Message Layout -- Cards Instead of Bubbles
- **User messages**: Full-width, left-bordered with a subtle `border-l-2 border-muted-foreground/30`, muted background, compact text with a tiny "YOU" label
- **AI messages**: Full-width cards with a `border-l-3 border-primary` gradient accent, slightly elevated with shadow, generous padding, larger text
- No avatar circles -- role indicated by card styling and subtle label
- Timestamps rendered as thin centered dividers between message groups

### 2. Header -- Minimal & Bold
- Remove the avatar circle and green dot
- Simple "✦ Biz" text logo in the top-left with a subtle shimmer animation on the sparkle
- Minimize/close buttons as minimal icons

### 3. Thinking Indicator -- Skeleton Cards
- Replace bouncing dots with a skeleton card animation (pulsing gradient lines mimicking content loading) -- looks like a real content card about to appear

### 4. Welcome State -- Hero Card
- Replace the centered emoji + typing text with a single bold hero card:
  - Large "✦" with shimmer effect
  - Typing welcome text left-aligned inside the card
  - Suggested prompts render as pill buttons below the card (horizontal scroll on mobile)

### 5. Input Area -- Floating Bar
- Input gets a subtle `ring-1 ring-primary/20` glow on focus
- Send button morphs from arrow to a stop icon while loading
- Subtle "Powered by Bizooma AI" micro-text below

### 6. Open/Close Animation
- Panel slides up from the button with a spring animation instead of instant appear
- On close, collapses back down into the floating button

## Files to Change

1. **`src/components/chatbot/ChatMessage.tsx`** -- Replace bubble layout with card layout, add timestamp dividers, remove avatar icons
2. **`src/components/chatbot/SmartChatbot.tsx`** -- Redesign header, input bar, thinking indicator, add open/close animation classes
3. **`src/components/chatbot/TypingWelcome.tsx`** -- Redesign as hero card with pill-style suggested prompts
4. **`src/index.css`** -- Add shimmer animation keyframes and card transition utilities

## What Stays the Same

- All streaming logic, edge function, context awareness, proactive bubbles -- untouched
- Service card rendering -- already card-based, fits the new design
- Mobile full-screen behavior -- preserved

