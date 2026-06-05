## Why /accessibility-layer shows 404

- The route is registered in `src/App.tsx` (line 251) and `AccessibilityLayerPage.tsx` exists.
- The console log shows the browser running an old bundle (`index-BIyoPdrU.js`) that doesn't contain this route, so React Router falls to the `NotFound` page.
- This is a stale-preview/build issue, not a code bug.

## Fix

1. Switch to build mode and restart the dev server so Vite serves a fresh bundle that includes the route.
2. Reload `/accessibility-layer` and confirm `AccessibilityLayerPage` renders (no 404).
3. If it still 404s after a clean restart, open `AccessibilityLayerPage.tsx` to look for a render-time throw that could bubble to an error boundary — but no runtime errors are currently reported, so this is unlikely.
4. Once the page renders, you can tell me what you want to change on it and we'll iterate.

No file edits are needed for this step — just a sandbox/dev-server restart.
