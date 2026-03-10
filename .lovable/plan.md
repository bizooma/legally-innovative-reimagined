

# JaxReferrals Proposal Page

## Overview
Create a new proposal page at `/proposals/jaxreferrals` for the JaxReferrals client, focused on website updates. The page will follow the existing proposal template pattern but with a custom "Website Updates" service section instead of Google Grants and Video Chatbot sections.

## What Will Be Built

### 1. New Service Section Component
A new `WebsiteUpdatesSection` component tailored to website update services, including:
- Service cards covering items like design refresh, performance optimization, SEO improvements, and content updates
- Stats row highlighting key metrics (e.g., page speed improvements, mobile responsiveness)
- Benefits callout explaining why website updates matter for referral networks

### 2. Custom Value Prop Section
A `JaxReferralsValueProp` component with a timeline and outcomes specific to website work:
- **Week 1-2**: Discovery and audit
- **Week 3-4**: Design and development
- **Month 2+**: Launch, testing, and ongoing support
- Outcomes focused on referral growth, user experience, and conversion

### 3. Proposal Page
A new page at `src/pages/proposals/JaxReferralsProposalPage.tsx` composing:
- `ProposalLayout` (client name: "JaxReferrals")
- `ProposalHero` (subtitle: "Version 2")
- `WebsiteUpdatesSection` (new component)
- `JaxReferralsValueProp` (new component)
- `ProposalDownloadCTA` (placeholder filename `jaxreferrals-proposal.pdf` for later upload)

### 4. Route Registration
Add route `/proposals/jaxreferrals` in `App.tsx` pointing to the new page.

## Files to Create
- `src/components/proposals/WebsiteUpdatesSection.tsx`
- `src/components/proposals/JaxReferralsValueProp.tsx`
- `src/pages/proposals/JaxReferralsProposalPage.tsx`

## Files to Modify
- `src/App.tsx` — add import and route

## Technical Notes
- Follows the same pink background design system and component patterns as the Phillips proposal
- Hero intro text will be customized for a website updates context rather than nonprofit messaging
- The `ProposalDownloadCTA` will use bucket `"proposals"` and filename `"jaxreferrals-proposal.pdf"` as a placeholder until you upload the actual PDF
- Page will have `noindex/nofollow` meta tags automatically via `ProposalLayout`
- Already blocked by existing `robots.txt` rules for `/proposals/`
