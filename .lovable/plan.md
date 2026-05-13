# Add Sign-In for Accessibility Subscribers

## Goal
Paid Accessibility Layer subscribers currently have no visible way to sign in. Add a clear entry point in the global top navigation that takes them to a sign-in form on the existing `/accessibility/signup` page.

## Changes

### 1. Global top nav (`src/components/Navbar.tsx` + `src/components/navbar/MobileMenu.tsx`)
- Add an "Accessibility Login" link next to the existing "Stay Informed" link (desktop) and inside the mobile menu.
- Style as a subtle text link — keep "Client Portal" as the prominent primary button.
- Links to `/accessibility/signup?mode=signin`.

### 2. `/accessibility/signup` page (`src/pages/accessibility/AccessibilitySignup.tsx`)
- Convert into a tabbed view with two modes: **Sign in** and **Create account** (current signup flow).
- Default mode driven by `?mode=signin` query param (defaults to `signup` when absent, preserving current behavior for existing CTAs).
- **Sign-in tab**: email + password fields → `supabase.auth.signInWithPassword` → on success redirect to `/accessibility/dashboard`. Include "Forgot password?" link using `supabase.auth.resetPasswordForEmail` with `redirectTo: ${origin}/accessibility/reset-password`.
- **Sign-up tab**: existing flow unchanged.
- Update page `<title>` and H1 dynamically per tab.

### 3. Password reset page (new — `src/pages/accessibility/AccessibilityResetPassword.tsx`)
- Public route at `/accessibility/reset-password`.
- Detects `type=recovery` in URL hash, shows new-password form, calls `supabase.auth.updateUser({ password })`, then redirects to `/accessibility/dashboard`.
- Required so the "Forgot password?" flow actually works.

### 4. Routing (`src/App.tsx`)
- Add the new `/accessibility/reset-password` public route.

## Out of scope
- No changes to the embedded widget, accessibility product landing page, or `/portal`.
- No changes to RLS, edge functions, or the existing signup edge function.

## Technical notes
- Uses existing `supabase` client; no new dependencies.
- Mobile menu already iterates `navLinks` — will add the accessibility login as a separate explicit item (mirrors how "Stay Informed" / "Client Portal" are rendered) rather than into the data array, to avoid leaking it into other surfaces that consume `navLinks`.
- Tab state is local React state initialized from `useSearchParams()`.
