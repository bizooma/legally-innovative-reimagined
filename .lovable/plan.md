## Add Certifications Scroller to Meet Joseph Murphy Card

Add a horizontal scrolling row of certification images at the bottom of the MeetJoe card on the home page.

### Steps

1. **Copy uploaded images to `src/assets/certifications/`:**
   - `android-certified-application-engineer.jpg`
   - `flutter-certified-application-developer.jpg`
   - `android-certified-application-developer.jpg`
   - `google-conversion-optimization-certified.png`
   - `google-shopping-ads-certified.png`
   - `google-ads-ai-powered-performance-certified.png`

2. **Update `src/components/MeetJoe.tsx`:**
   - Import all six certification images.
   - Add a new section *inside the Card* (below the existing 2-column grid) with:
     - Small heading: "Certifications & Credentials"
     - A horizontally scrolling flex row (`overflow-x-auto`, `snap-x`, hidden scrollbar) containing each certificate as a fixed-width card (`min-w-[280px]` for the wide ATC certificates, `min-w-[160px]` for the round Google badges) with subtle border, rounded corners, and a small caption underneath each.
     - Auto-scroll/marquee optional — keep it as a manual scroll with smooth touch scrolling for simplicity and reliability.

### Technical Notes
- Images imported as ES6 modules (per `src/assets` convention).
- Use a single horizontal track so all 6 certs scroll together; ATC ones display larger to preserve readability, Google badges as compact circles.
- No new dependencies required.

### Files
- `src/assets/certifications/*` (created, 6 files)
- `src/components/MeetJoe.tsx` (edited)
