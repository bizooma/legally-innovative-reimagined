

# Plan: Add Vanity URLs Section to Momentum Campaigns Page

## Overview
Add a new, visually distinct section about Vanity URLs between the "Finding the Moment" section and the "Case Studies" section. This section will explain how vanity URLs work as campaign destinations rather than simple redirects.

## Section Location
The new section will be inserted after **"Finding the Moment"** (line 164) and before **"Case Studies"** (line 166), maintaining the alternating background pattern.

---

## Section Structure

### 1. Main Container
- Background: Soft gradient from `legal-light` to white (`bg-gradient-to-br from-legal-light via-white to-legal-light/50`)
- Standard section padding using `section-padding` class
- Maximum width container for consistent layout

### 2. Section Headline
**"Vanity URLs: Turning Moments into Destinations"**
- Playfair Display font (heading style consistent with other sections)
- Centered above the two-column layout

### 3. Two-Column Layout (Desktop)
Uses `grid grid-cols-1 lg:grid-cols-2 gap-12` for responsive design.

#### Left Column - Copy
Three styled paragraphs:
1. Opening statement about underutilized vanity URLs
2. Explanation of how Momentum Campaigns use them differently
3. Real-time messaging benefit

#### Right Column - Visual Comparison Graphic
A comparison diagram showing:
- **"Redirect" path**: Arrow pointing to "Homepage (generic)" with muted/gray styling
- **"Momentum URL" path**: Arrow pointing to "Campaign-Specific Page" with accent styling

Below the diagram, display example vanity URLs as styled badges/tags:
- SeahawksOrPatriots.com
- SeahawksWin.com
- ForThe12s.com

---

### 4. "Beyond the Redirect" Subsection
- Subheading with legal-dark text
- Icon-enhanced bullet list with five benefits:
  - Match messaging to the moment
  - Capture engagement or emails
  - Track campaign-specific traffic
  - Create shareable, campaign-native content
  - Preserve goodwill without selling
- Supporting copy paragraph below bullets

---

### 5. "Vanity URLs in Action" Subsection
- Subheading centered
- Three mini-cards in a responsive grid (`grid-cols-1 md:grid-cols-3`)

Each card includes:
- URL as the card title (styled in legal-primary color)
- Brief description below

Cards:
1. **SeahawksOrPatriots.com** - "Pre-game engagement & voting"
2. **SeahawksWin.com** - "Post-win celebration & momentum"
3. **ForThe12s.com** - "Loyalty and community support"

---

## Technical Details

### New Lucide Icons to Import
- `Link` - for vanity URL representation
- `ArrowRight` - for the comparison graphic flow
- `Mail` - for email capture bullet
- `BarChart3` - for tracking bullet
- `FileText` - for shareable content bullet
- `Handshake` - for goodwill bullet
- `Clock` - for real-time/moment matching

### Component Structure
All content will be added directly to `MomentumCampaignsPage.tsx` as a new section, following the existing pattern of inline JSX with Tailwind styling.

### Styling Approach
- Cards will use the existing `Card` and `CardContent` components
- Bullets will use icon + text flex layouts similar to existing benefit lists
- The comparison graphic will be built with styled divs, icons, and arrows
- Example URLs displayed as inline-block elements with monospace-style font and subtle backgrounds

### File Changes
Only one file will be modified:
- `src/pages/MomentumCampaignsPage.tsx`
  - Add new icon imports
  - Insert new section JSX (~100-120 lines)

