

# Momentum Campaigns Landing Page Implementation

## Overview
Create a new landing page at `/momentum-campaigns` that promotes Bizooma's brand-driven, culturally relevant digital campaigns. The page will be designed as a native extension of bizooma.com, following all existing design patterns.

## Design System Alignment
The page will use the established Bizooma design patterns:
- **Typography**: Playfair Display for headings, Raleway for body text
- **Colors**: `legal-primary` (#7A0A0A), `legal-dark` (#1A0000), `legal-light` (#F9E5E5), `legal-accent` (#E63946)
- **Spacing**: `section-padding` class (py-16 md:py-24 px-6 md:px-8 lg:px-12)
- **Gradients**: `bg-gradient-to-br from-legal-primary to-legal-dark` for hero sections
- **Cards**: White backgrounds with subtle borders (`border-legal-primary/20`)
- **Buttons**: Primary buttons with `bg-legal-primary hover:bg-legal-dark` styling

## Page Structure

### 1. Hero Section
- Dark gradient background matching other service pages
- Bold headline: "Momentum Campaigns"
- Subheadline and supporting copy about cultural moments and trust-building
- Primary CTA button: "View a Campaign Example" (scrolls to case study section)

### 2. What Is a Momentum Campaign Section
- Light background
- Clear explanation of momentum campaigns as brand acceleration (not sales)
- Emphasis on cultural relevance and emotional connection

### 3. Why Momentum Works Section
- Card-based layout with bullet points
- 5 key benefits with icons
- Supporting quote about emotional brand recall

### 4. Finding the Moment Section
- Explanation of how Bizooma identifies cultural opportunities
- Reference to monitoring Google Trends, social conversations, local signals
- Transition into the Seahawks example

### 5. Case Studies Section (with scroll anchor)
- Card layout for campaign examples
- Seattle Seahawks Super Bowl Campaign featured prominently
- Results snapshot (participation, engagement, email capture, visibility)
- Expandable or linked "View Campaign Strategy" CTA

### 6. Who This Is Built For Section
- Bullet list of ideal clients
- Law firms, professional services, community-connected brands
- Focus on long-term growth messaging

### 7. Closing CTA Section
- Dark gradient background
- "Momentum Is a Strategy - Not a Gimmick" headline
- "Let's Build Momentum" button (links to contact section or Calendly)

## Files to Create/Modify

### New Files
1. **`src/pages/MomentumCampaignsPage.tsx`**
   - Main page component with all sections
   - SEO metadata via react-helmet-async
   - Scroll-to functionality for case study CTA
   - Mobile-first responsive design

### Modified Files
2. **`src/App.tsx`**
   - Import MomentumCampaignsPage
   - Add route: `/momentum-campaigns`

## Technical Notes
- Uses existing UI components: Button, Card, CardContent
- Icons from lucide-react (TrendingUp, Users, Heart, Target, Share2, etc.)
- Light animations via Tailwind (fade, hover effects only)
- No popups or intrusive elements
- Mobile-responsive grid layouts
- Proper scroll behavior for in-page navigation

