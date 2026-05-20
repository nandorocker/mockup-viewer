# Phone Frame and Mobile Crop Design

## Goal

Keep the LinkedIn mockup experience visually consistent across desktop and mobile.

## Changes

- Desktop landing renders inside the same centered phone frame used by the viewer.
- Mobile landing remains full-screen.
- Desktop viewer and toast behavior remain unchanged.
- Mobile viewer crops away the LinkedIn background image's built-in iPhone status bar by shifting the background and mockup upward together.
- Mockup alignment remains locked to the background placeholder by subtracting the same crop amount from both image positions.

## Implementation Notes

- Introduce a shared phone-shell wrapper that can be used by both landing and viewer contexts.
- Keep toast positioned relative to the viewer phone frame on desktop.
- Use CSS custom properties for the mobile crop amount and placeholder offset so the relationship stays explicit.
- Do not create a second cropped image asset unless CSS cropping cannot preserve alignment.

## Verification

- Build must pass with `npm run build`.
- Desktop landing must appear inside a 393x852 phone frame.
- Mobile viewer must hide the source iPhone status bar while keeping mockups aligned to the LinkedIn placeholder.
