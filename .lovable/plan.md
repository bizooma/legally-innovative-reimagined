# ADA Widget Purchase Flow

Replace the current "Start Free Scan" CTAs and pricing tiers on `/accessibility-layer` with a single $25/month plan, gated behind a sign-up + Stripe checkout flow that lands the user in their accessibility dashboard.

## Flow

1. User clicks **Buy widget – $25/mo** on `/accessibility-layer`.
2. Routed to `/accessibility/signup` — a dedicated signup form (email + password + organization name).
   - Calls `supabase.auth.signUp` with email confirmation **disabled** (auto-confirm via edge function using service role, since you don't want a confirmation email).
   - Creates the `acc_organizations` row + owner membership immediately.
3. After signup, frontend calls `create-accessibility-checkout` edge function → returns Stripe Checkout URL → `window.location` redirect to Stripe.
4. Stripe success URL: `/accessibility/checkout-success?session_id={CHECKOUT_SESSION_ID}` → verifies payment via `verify-accessibility-checkout` edge function, marks org as `plan = 'starter'` paid, then redirects to `/portal` login (or directly to `/accessibility/dashboard` if session still active).
5. Stripe cancel URL: back to `/accessibility-layer`.

## Pricing UI changes

- `src/pages/AccessibilityLayerPage.tsx`: replace the 4-tier pricing grid with a single centered card: **Widget – $25/month**, one website, monthly scans, AI recommendations. CTA → `/accessibility/signup`.
- All hero / CTA buttons that point to `/accessibility/dashboard` now point to `/accessibility/signup` (for non-authed users) or stay on dashboard for authed.

## New pages / components

- `src/pages/accessibility/AccessibilitySignup.tsx` — email, password, org name. On success → trigger checkout.
- `src/pages/accessibility/AccessibilityCheckoutSuccess.tsx` — verifies session, shows spinner, redirects.
- Route additions in `src/App.tsx`.

## Backend

**Stripe integration**: Use Lovable's seamless Stripe payments (`enable_stripe_payments`). No user Stripe account needed; test mode immediately.

**Product**: One product "Bizooma Accessibility Widget" with a recurring $25/month price (created via `batch_create_product` after enable).

**Edge functions** (new):
- `accessibility-signup` — server-side signup using service role with `email_confirm: true` to skip the confirmation email; creates org + owner member row. Input: email, password, orgName.
- `create-accessibility-checkout` — auth required; creates Stripe Checkout Session in subscription mode for the $25 price; stores `organization_id` in metadata; returns `url`.
- `verify-accessibility-checkout` — auth required; retrieves session by ID; if `payment_status === 'paid'`, updates `acc_organizations` (e.g., set `plan` and a new `stripe_customer_id` / `stripe_subscription_id`).

**DB migration**: add `stripe_customer_id text`, `stripe_subscription_id text`, `subscription_status text` to `acc_organizations`.

## Tax handling (Stripe)

Default to **option 3 — no tax automation** for now (single $25 SaaS price, can revisit). No tax codes needed on the product.

## Out of scope (per user)

- Other pricing tiers (will design later).
- Confirmation emails.
- Webhook-driven subscription lifecycle (cancel/renew handling) — can add a `stripe-webhook` function in a follow-up; for now the verify endpoint is sufficient to mark paid.

## Order of operations

1. `enable_stripe_payments` (requires user approval form).
2. Migration: add stripe columns to `acc_organizations`.
3. Create the $25/mo product via `batch_create_product`.
4. Build edge functions + frontend pages + route updates + pricing section rewrite.
