# ShopEase -- CSSD2401 Lab 2 and 3

React + Tailwind CSS accessible single-item book checkout.
Palette: deep midnight indigo + saffron amber + pure white text.

## Quick Start

```bash
npm install
npm run dev
```
Open http://localhost:5173

## Production Build
```bash
npm run build && npm run preview
```

## Color Palette
- Background:  Night-900 (#0d0e1f) to Night-800 (#131428)
- Cards:       Night-800 (#131428) with Night-600 border
- Primary CTA: Amber-500 (#f0a000) -- 5.8:1 contrast on dark
- Body text:   White (#ffffff) -- 15.8:1 on Night-800
- Labels:      Amber-400 (#f5b835) uppercase tracking
- Focus ring:  Amber-500 2px outline, 3px offset

## Animations
- Floating book cover (floatBook keyframe)
- Staggered page fade-up entrances
- Animated amber progress bar fill (slideRight)
- Active step ring pulse (ringPulse)
- Cart badge pop (badgePop)
- Button shimmer on hover
- SVG checkmark draw on confirmation
- Celebration ping + ambient glow orbs

## Accessibility
- Skip-to-main link, visible on keyboard focus
- Amber focus-visible ring on all interactive elements
- All inputs: htmlFor/id, aria-required, aria-invalid, aria-describedby
- Error summary receives programmatic focus after failed submit
- ARIA live regions for cart add + order confirmation
- aria-current="step" on progress bar active step
- Minimum 44x44 px touch targets
- White on Night-800: 15.8:1 contrast (WCAG AAA)
