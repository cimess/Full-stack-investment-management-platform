# Implementation Plan - UI/UX Premium Upgrade

# Goal Description
Elevate the **CimessInvest** application design to match "Awwwards" premium fintech standards. This involves upgrading typography, implementing a Bento Grid layout, adding dynamic background textures, and polishing data visualizations.

## User Review Required
> [!IMPORTANT]
> **Typography Change**: Switching Headings to **Outfit** (Google Font).
> **Layout Change**: `Features` section will be restructured into a **Bento Grid**.

## Proposed Changes

### Global Styles & Assets
#### [MODIFY] [index.html](file:///c:/Users/USER/Dev/myPersonalPortfolio/cimessinvest/index.html)
- Add `Outfit` font from Google Fonts.
- Add global CSS variables for noise texture.

#### [MODIFY] [index.css](file:///c:/Users/USER/Dev/myPersonalPortfolio/cimessinvest/index.css) (or create if missing/inline)
- Define `.font-display` utility.
- Add `.bg-noise` class with SVG noise pattern.
- Add `.spotlight` utility for card hover effects.

### Components

#### [MODIFY] [App.tsx](file:///c:/Users/USER/Dev/myPersonalPortfolio/cimessinvest/App.tsx)
- Add background "Orb" elements for ambient lighting.

#### [MODIFY] [Features.tsx](file:///c:/Users/USER/Dev/myPersonalPortfolio/cimessinvest/components/Features.tsx)
- Refactor into a CSS Grid (Bento style).
- Implement "Spotlight" hover effect on cards.

#### [MODIFY] [MarketChart.tsx](file:///c:/Users/USER/Dev/myPersonalPortfolio/cimessinvest/components/MarketChart.tsx)
- Add Gradient definitions to Recharts.
- Add drop-shadow filter to lines for "glow" effect.

#### [MODIFY] [Hero.tsx](file:///c:/Users/USER/Dev/myPersonalPortfolio/cimessinvest/components/Hero.tsx)
- Update typography classes to use new Display font.
- Enhance entrance animations.

## Verification Plan

### Automated Tests
- None (Visual changes).

### Manual Verification
1.  **Typography**: Verify Headings use `Outfit` and Body uses `Inter`.
2.  **Visuals**: Check for subtle noise texture on dark background.
3.  **Responsiveness**: Verify Bento Grid collapses correctly on mobile.
4.  **Interactions**: Hover over Feature cards to see "Spotlight" effect.
5.  **Charts**: Verify charts have gradient fill and glowing lines.
