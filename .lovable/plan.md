## Audit findings

After reviewing the entire `/accessibility/*` dashboard (layout, sidebar, dashboard, websites, scans, issues, AI, widget, profile, signup, checkout-success) plus the supporting edge functions and embed script, the structure is sound but several things are not actually wired up:

### Bugs / dead UI
1. **Dashboard stats are hardcoded** (`"—"`, `"0"`). They never reflect real data even after a scan.
2. **Dashboard "Run new scan" button** does nothing (no onClick, no link).
3. **Dashboard "Generate report" button** does nothing.
4. **Dashboard "Add website" card button** does nothing (should go to `/accessibility/websites`).
5. **"Top violations" card** is a static empty state — never populates from `acc_accessibility_issues`.
6. **"Score over time" card** is a static empty state — never plots history from `acc_scans`.
7. **Websites list on dashboard** says "No websites yet" even when websites exist (it's hardcoded).

### Profile / auth
8. **Email change via `supabase.auth.updateUser({ email })`** silently requires Supabase email confirmation. If "Confirm email" is enabled, the change won't take effect and the user gets a misleading "saved" toast. Need to detect and message correctly.

### Widget page
9. **Embed snippet uses `data-org="${slug}"`** but `public/accessibility-widget.js` ignores that attribute — it always loads the same generic widget. Either remove the attribute (to avoid implying per-org config that doesn't exist) or have the script read it. For now, the cleanest pre-test fix is to keep the attribute but document that widget styling/feature toggles per org are coming soon (and read it client-side defensively).
10. **Live preview iframe** loads the widget over a tiny stub page — works, but the floating button overlaps the iframe scroll. Minor; fine for testing.

### Sidebar / placeholders
11. Compliance, Reports, Team, Billing, API Keys, Integrations, Settings are all `PlaceholderPage`. Acceptable for now; flag to user so they aren't surprised during testing.

## Fix plan

### 1. Make the Dashboard live
Rewrite `src/pages/accessibility/AccessibilityDashboard.tsx` to:
- On mount, query (scoped to `ctx.org.id`):
  - `acc_websites` → count, list (top 5), latest `last_scan_at`, average `current_score`.
  - `acc_scans` (last 30) → score-over-time points, last scan timestamp, pages_scanned sum.
  - `acc_accessibility_issues` → counts grouped by `severity` (critical/serious/moderate/minor), `status='resolved'` count, top 5 by frequency for the "Top violations" card.
- Render real values into the 8 stat cards (Score = avg current_score; WCAG 2.1 AA = avg `wcag_aa_pct` from latest scans; Critical, Warnings = serious+moderate, Resolved, Pages scanned, ADA risk = derived band from score, Last scan = most recent timestamp).
- Replace the chart placeholder with a small Recharts `LineChart` of score over time (Recharts is already in the project).
- Replace the violations placeholder with a real list of the top rules by occurrence.
- Replace the websites placeholder with a real mini-list of websites with score badges.

### 2. Wire up dashboard buttons
- "Run new scan" → navigate to `/accessibility/websites` (where the per-site Scan button lives). If exactly one site exists, call `run-accessibility-scan` directly.
- "Generate report" → navigate to `/accessibility/reports` (placeholder for now, but no longer dead).
- "Add website" card button → navigate to `/accessibility/websites`.

### 3. Profile email confirmation handling
Update `AccessibilityProfile.tsx`:
- Only send `email` in `updateUser` if it actually changed.
- Show distinct toast when email change is queued ("Check your inbox to confirm the new email") vs. when only the name changed ("Profile saved").

### 4. Widget snippet hardening
Update `AccessibilityWidgetPage.tsx`:
- Disable Copy button until `ctx.org?.slug` exists.
- Show the user's website URL alongside the snippet so they know where to paste it (pulled from `acc_websites`).
- Leave `accessibility-widget.js` as-is (already functional — verified).

### 5. Communicate placeholders
Final chat reply will explicitly list which sidebar pages are still placeholders (Compliance, Reports, Team, Billing, API Keys, Integrations, Settings) so testing focuses on the working surfaces: Dashboard, Websites, Scans, Issues, AI Recommendations, Widget, Profile.

## Out of scope for this pass
- Building real Compliance / Reports / Team / Billing / API Keys / Integrations / Settings pages.
- Per-org widget customization (color, position, feature toggles persisted in `acc_widget_settings`).
- Multi-page crawling (current scanner only fetches the root URL).

Ready to implement on approval.