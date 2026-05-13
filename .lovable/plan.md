## Newsletter Banner — ADA/WCAG Widget

**Specs**
- Size: 600 × 200 px PNG (standard newsletter width)
- Headline: "Make your website ADA/WCAG compliant for just $25/month"
- Brand: Bizooma dark red (#7A0A0A) + black (#1A0000), clean minimal, no cartoons
- Output: `/mnt/documents/ada-widget-newsletter-banner.png`

**Composition**
- Left ~60%: black/dark-red panel with the headline in bold Inter, subline ("ADA & WCAG 2.1 AA Widget · No code · Install in minutes"), and a dark-red pill CTA button reading "Start free trial"
- Right ~40%: subtle accessibility iconography (universal access symbol + abstract widget UI lines) in muted red on black — flat, geometric, no AI text
- Thin red accent rule separating the two zones; small "bizooma" wordmark bottom-left

**Approach**
1. Generate the banner via `imagegen` at 1920×640 (3:1 close to 3.0 ratio), then resize cleanly to 600×200 with PIL — keeps text crisp at email size.
2. QA the output: inspect for legibility at 600px, no clipped/garbled text, correct brand colors, proper margins. Re-render if anything is off.
3. Deliver as a `<presentation-artifact>` PNG.

**If text rendering looks unreliable from the model**, fallback: generate only the background/iconography with imagegen, then composite the headline + CTA via PIL using Inter so typography is pixel-perfect. This guarantees clean type for email use.

Approve and I'll generate the banner.