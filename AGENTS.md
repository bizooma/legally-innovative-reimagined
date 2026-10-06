# Architecture rules
- Product editorial copy lives in typed per-page data under src/content/products and renders through one shared product layout, so copy changes do not alter presentation.
- The AI readiness audit keeps its existing checkout function and download-success route separate from editorial content, so repositioning cannot change purchase delivery.
- Editorial product and audit styling uses global semantic CSS tokens, so brand roles remain consistent across all bands.
- Homepage, About and FAQ copy lives in src/content/{home,about,faq}.ts and testimonials in src/content/testimonials.ts; the testimonial section renders nothing when that list is empty, so no placeholder can ever appear.
- About affiliations render from typed About content, and newsletter signup promises share typed Home content across the homepage and newsletter page, so editorial changes stay consistent without changing presentation.
