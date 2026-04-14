
## Plan: Create 4 Newsletter Section Pages

### Overview
Create 4 simple landing pages for your newsletter sections (Marketing, Code, AI, Insights) at `/marketing`, `/code`, `/ai`, and `/insights`. Each page will have a header image area, section title, brief description of what that section covers in your newsletter, and standard Navbar/Footer.

### Pages to Create

1. **`/marketing`** - Marketing section: covers digital marketing strategies, SEO/AEO, lead generation, and branding tips
2. **`/code`** - Code section: covers web development, mobile apps, tech tools, and coding insights
3. **`/ai`** - AI section: covers AI tools, chatbots, automation, and emerging AI trends
4. **`/insights`** - Insights section: newsletter summary and key takeaways

### Technical Steps

1. **Create 4 new page components** in `src/pages/`:
   - `MarketingSectionPage.tsx`
   - `CodeSectionPage.tsx`
   - `AiSectionPage.tsx`
   - `InsightsSectionPage.tsx`
   
   Each will follow the existing page pattern (Navbar, hero section with gradient, description content, Footer, MobileFooterNav) and tie back to the newsletter tagline "Where Marketing Meets Code + AI."

2. **Register routes** in `src/App.tsx` for `/marketing`, `/code`, `/ai`, `/insights`

3. Each page will include:
   - Hero section with relevant icon and section name
   - Brief description of what that section covers
   - Link back to the newsletter page
   - Consistent styling with existing pages
