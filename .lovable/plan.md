
# Accessibility widget — full functional review

I audited every accessibility surface (3 admin pages, 14 dashboard pages, 13 edge functions, the embed script, RLS, and pg_cron jobs). The good news: most of it is real. There are no mock data sources or hardcoded scan results — the scanner actually fetches sites, parses HTML, and writes findings; Stripe and Resend are real; the dashboard reads live Supabase data; tenant isolation via RLS is correct.

The bad news: there are a few real bugs that quietly break paid features, plus some hardcoded values that block multi-tenant operation.

## What is real and works

- **Embed script** loads per-org config, persists prefs, beacons real events.
- **`acc-widget-config`** enforces `allowed_domains` + Stripe subscription state.
- **`acc-widget-event`** validates origin and writes real analytics rows.
- **`run-accessibility-scan`** actually crawls (sitemap-first, then BFS), parses HTML for 8 axe-style WCAG rules, persists per-page + per-issue rows, computes score and WCAG-AA %.
- **Dashboard / Issues / Scans / Compliance / Reports / Billing pages** all query Supabase directly — no fixtures.
- **Stripe** end-to-end is wired: signup → checkout → webhook flips `widget_enabled`.
- **RLS** is correct everywhere I checked (`acc_is_org_member`, `acc_can_manage_org`).

## Tier 1 — real bugs that will hit paying users

### 1. Scheduled scans silently fail
`acc-run-scheduled-scans` calls `run-accessibility-scan` with the **service-role JWT** in `Authorization`. The scan function then calls `userClient.auth.getUser()` and returns 401 because that token has no user. The schedule still gets bumped (`next_scan_at`), so customers think automated scans are running when they're not.

**Fix:** allow `run-accessibility-scan` to accept an internal service-role call when `body.scheduled === true` AND the bearer token equals `SUPABASE_SERVICE_ROLE_KEY`; in that path, skip the user/membership check and trust `website_id`.

### 2. AI features return errors
Both `acc-issue-ai-fix` and `accessibility-ai-recs` use `model: "google/gemini-3-flash-preview"` — that ID does not exist on the Lovable Gateway. The "Get AI fix" and "Generate recommendations" buttons will both fail.

**Fix:** change to `google/gemini-2.5-flash` (the model the working `marketing-ai-chat` function uses).

## Tier 2 — hardcoded values that block multi-environment / proper SaaS

| Hardcoded | Where | Impact |
|---|---|---|
| Stripe `PRODUCT_ID = "prod_UVbwWOouagCn5r"` | `create-accessibility-checkout` | Breaks in Stripe test mode and on any new tier |
| Resend `from: "accessibility@notifications.bizooma.com"` | `acc-send-digests` | If that domain isn't verified, all digests fail silently |
| `sites.length >= 1` cap | `AccessibilityWebsites.tsx` | Every plan is hard-capped at 1 site regardless of `acc_organizations.plan` |

**Fix:** move the Stripe product ID and Resend "from" to secrets (`ACC_STRIPE_PRODUCT_ID`, `ACC_DIGEST_FROM`) with current values as fallbacks. Replace the hard cap with a `PLAN_LIMITS = { starter: 1, growth: 5, agency: 25, enterprise: Infinity }` map driven by `org.plan`.

## Tier 3 — dead code / schema cruft (low risk, removes confusion)

- **`acc-verify-website` edge function** (127 lines) is no longer referenced anywhere — site verification was removed last turn. Delete the function.
- **`acc_websites.verification_status / verification_token / verified_at / verification_last_checked_at / verification_last_error`** columns are no longer read or written. Drop in a migration.
- **Placeholder routes**: `/accessibility/team`, `/accessibility/api-keys`, `/accessibility/integrations`, `/accessibility/settings` all render the "Coming next" placeholder. Either build them or hide them from the sidebar so customers don't see empty rooms.

## Tier 4 — schema vs UI mismatches (optional)

- **`acc_api_keys`** table exists with RLS but has no UI and no edge function reads from it.
- **`acc_notifications`** table exists with RLS but is never written or read.
- **`acc_reports.file_url`** is always `null` — PDFs are generated client-side via jspdf and downloaded directly; the `acc_reports` row is logged but the file isn't actually re-retrievable.

Either build the UI or drop the unused tables and the `file_url` column.

## Recommended execution order

1. **Tier 1** — fix scheduled scans and the AI model name. ~30 lines across 3 files.
2. **Tier 2** — move 3 hardcoded values to secrets / plan map. Affects 3 files + 2 secrets.
3. **Tier 3** — delete `acc-verify-website` + a migration to drop verification columns + remove or hide placeholder routes.
4. **Tier 4** — decide whether to ship Team/API-Keys/Integrations/Settings or remove them; same for `acc_api_keys` / `acc_notifications` / `acc_reports.file_url`.

## Technical notes

- Tier 1 fix #1 must be authenticated against `SUPABASE_SERVICE_ROLE_KEY` (constant-time compare), not just the presence of `?scheduled=true`, otherwise anyone could trigger free scans on any `website_id`.
- Tier 1 fix #2 — just a string change; no schema impact.
- Tier 2 secret fallbacks should use `Deno.env.get("X") ?? "<current value>"` so live Stripe + Resend keep working through the deploy.
- For Tier 3 column drops, all references in `AccessibilityWebsites.tsx` and `acc-widget-config` were already removed last turn; the migration is safe.

## What I'd like you to confirm before I start

- Tier 1 alone, or Tier 1 + Tier 2 in one pass?
- For Tier 3 placeholders — build them out or just hide them from the sidebar?
- For Tier 4 — keep `acc_api_keys` / `acc_notifications` for a future iteration, or drop them now?
