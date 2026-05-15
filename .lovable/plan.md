## Add Privacy section + CCPA modal to /accessibility-layer

**File:** `src/pages/AccessibilityLayerPage.tsx`

1. Add a new "Privacy & Compliance" section between the FAQ and final CTA blocks.
   - Heading: "Your privacy matters"
   - Short paragraph explaining Bizooma respects user privacy, the widget collects only minimal anonymized usage data needed for accessibility scoring, and never sells personal info.
   - A list of relevant privacy frameworks the widget aligns with (GDPR, ADA, WCAG) plus a button-style link "California Consumer Privacy Act (CCPA)" that opens a modal.

2. Add a `<Dialog>` (shadcn) controlled by `useState`, triggered by the CCPA link.
   - Modal title: "California Consumer Privacy Act"
   - Scrollable content (max-h with overflow-auto) containing the full provided copy, formatted with subheadings ("Key facts", "Origins and legislative development", "Core consumer rights", "Enforcement and penalties", "Subsequent amendments and evolution") and bulleted lists where the copy uses lists.
   - Styled with existing semantic tokens (`text-foreground`, `text-muted-foreground`, `border`).

3. Imports to add: `Dialog, DialogContent, DialogHeader, DialogTitle` from `@/components/ui/dialog`, `useState` from React, and an icon (e.g. `Lock` or `ShieldCheck`) from `lucide-react`.

No other files change. Purely a presentation update on the marketing page.
