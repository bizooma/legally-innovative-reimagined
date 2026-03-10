

# Fix: Chatbot Help Bubble Not Updating on Section Change

## Problem

Two bugs in `usePageContext.ts`:

1. **Stale closure / observer thrashing**: `updateSection` depends on `hasShownProactive` state. Every time a new proactive prompt is shown, `hasShownProactive` changes → `updateSection` gets a new reference → the `useEffect` tears down and recreates the `IntersectionObserver`. This causes missed section transitions during the teardown/setup gap.

2. **Incomplete intersection logic**: The observer callback only examines entries in the *current batch*, not all observed elements. When scrolling slowly, only one entry fires — if it's leaving visibility (`isIntersecting: false`), `visibleId` stays empty and nothing updates. The observer needs to track visibility ratios across all elements.

3. **Timer cleanup ignored**: `updateSection` returns a cleanup function for the timeout, but since it's called from the observer callback (not a useEffect), the cleanup is never executed. Rapid section changes can cause stale timers to fire.

## Solution

Refactor `usePageContext.ts` to use **refs instead of state** for the mutable tracking data (`hasShownProactive`, visibility ratios), keeping the observer stable:

- Store `hasShownProactive` in a `useRef<Set<string>>` instead of state — it doesn't need to trigger re-renders
- Track intersection ratios for all sections in a `useRef<Map<string, number>>` and pick the highest on each callback
- Store the proactive timer in a ref so it can be properly cleared on section change
- Remove `hasShownProactive` from `updateSection` dependencies so the observer is created once and never recreated
- Keep `proactivePrompt`, `currentSection`, and `suggestedPrompts` as state since they drive UI

## Files Changed

- **`src/hooks/usePageContext.ts`** — Refactor to use refs for stable observer + proper timer cleanup

