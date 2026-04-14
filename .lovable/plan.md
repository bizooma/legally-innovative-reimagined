
# Update Sitemap and SEO Schema for New Pages

## What's Missing

The sitemap (`public/sitemap.xml`) and SEO structured data are missing several pages that have been added since the sitemap was last updated. Here are the pages not currently in the sitemap:

**Newsletter Section Pages (the 4 new ones):**
- `/marketing`
- `/code`
- `/ai`
- `/insights`

**Other pages also missing:**
- `/chatbots`
- `/why-reviews-matter-for-law-firms`
- `/mobile-apps-as-marketing-tool`
- `/route-to-results-newsletter`
- `/ai-marketing-law-firms-2025`
- `/gbp-optimization-2026`
- `/schema-markup-featured-snippets`
- `/website-conversion-law-firms`
- `/google-march-2026-update`
- `/privacy-policy`
- `/seo-audit`
- `/jax-bar-association`
- `/support`
- `/momentum-campaigns`
- `/products/mvp-soft-launch`
- `/install`

(Private/internal pages like `/donuts`, `/michael`, `/proposals/*`, `/staff`, `/admin`, `/portal`, `/this-is-our-jax`, `/status-ticker`, `/embed/*`, `/privacy/cloud-dev-status-extension` should remain excluded.)

## Plan

### 1. Update `public/sitemap.xml`
Add all public-facing pages listed above with appropriate priority values:
- Newsletter section pages (`/marketing`, `/code`, `/ai`, `/insights`): priority 0.7
- Blog posts: priority 0.6
- Product pages: priority 0.6-0.7
- Utility pages (`/support`, `/privacy-policy`): priority 0.3-0.4
- Set `lastmod` to `2026-04-14` for new entries

### 2. Update `src/components/SEO/CanonicalMeta.tsx`
Add the 4 newsletter section pages to the `isSpeakablePath` check so they get speakable structured data, since they are key content pages.

### 3. No changes needed to `GlobalSEO.tsx`
The organization and website schema are site-wide and don't need per-page updates.

## Technical Details
- The sitemap is a static XML file — just add `<url>` entries
- CanonicalMeta already auto-generates breadcrumbs for all pages via the pathname, so that's covered
- Each of the 4 new pages already has its own `<Helmet>` with title/description/OG tags
