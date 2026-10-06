# Architecture rules
- Product editorial copy lives in typed per-page data under src/content/products and renders through one shared product layout, so copy changes do not alter presentation.
- The AI readiness audit keeps its existing checkout function and download-success route separate from editorial content, so repositioning cannot change purchase delivery.
- Editorial product and audit styling uses global semantic CSS tokens, so brand roles remain consistent across all bands.