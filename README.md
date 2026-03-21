# ShopEase
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white)
![WCAG](https://img.shields.io/badge/WCAG_2.2-AA-00843d?style=flat-square)

> Accessible single-item book checkout platform built for CSSD2401 Lab 2 and 3.

---

## Overview

ShopEase is a medium-fidelity web UI platform that guides a user through a complete book purchase - from product page to order confirmation - with a focus on usability, accessibility, and interaction quality.

The project was built in response to a baseline heuristic evaluation of a generic e-commerce UI. Three critical issues were identified and addressed:

1. **No inline form validation** - users had no recovery guidance when fields failed
2. **No progress visibility** - checkout felt opaque with no indication of remaining steps
3. **Broken keyboard accessibility** - focus rings stripped by CSS resets, unlabeled icon buttons

Every design and implementation decision traces back to fixing one of these problems.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 + Vite | Component model suits multi-step state; fast HMR |
| Styling | Tailwind CSS v3 | Custom palette and keyframes in config; utility-first |
| Routing | React Router v6 | URL-per-step preserves browser history and focus order |
| Fonts | Cormorant Garamond + Outfit | Editorial display serif paired with a clean geometric sans |
| Data | Mocked in-memory | Keeps scope on UI quality; works fully offline |

---

## Getting Started

**Prerequisites:** Node.js 18 or later.

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## App Flow

The platform covers four connected routes, each mapping to a step in the progress bar:

```
/ (Browse)  ->  /cart  ->  /checkout  ->  /confirmation
```

| Route | Description |
|---|---|
| `/` | Product page with floating animated book cover, rating, price, and add-to-cart / buy-now actions |
| `/cart` | Cart review with order summary, shipping threshold nudge, and remove item |
| `/checkout` | Three-section form (Contact, Shipping, Payment) with full client-side validation |
| `/confirmation` | Animated success state showing order details, shipping address, and estimated delivery |

---

## Animations

All animations are declared as Tailwind CSS keyframes in `tailwind.config.js` and applied via utility classes. Each one is tied to a specific usability goal, not just aesthetics.

| Animation | Keyframe | Purpose |
|---|---|---|
| Page entrance | `fadeUp` | Communicates route transition; staggered delays establish reading order |
| Progress bar fill | `slideRight` | Confirms step completion with a left-to-right spatial metaphor |
| Active step ring | `ringPulse` | Draws attention to the current step without flash or distraction |
| Cart badge pop | `badgePop` | Confirms add-to-cart for sighted users |
| Button shimmer | `shimmer` | Reinforces the affordance of the primary amber CTA on hover |
| Floating book | `floatBook` | Adds tactile quality to the product page; `aria-hidden`, no functional role |
| Checkmark draw | `checkDraw` (inline SVG) | Drawn-line reveal for a satisfying order confirmation |
| Celebration ping | `ping` (Tailwind built-in) | Radiates from the checkmark; reinforces the confirmed state |
| Ambient glow orbs | Fixed `radial-gradient` | Atmospheric depth per page; `pointer-events: none`, `aria-hidden` |

---

## Color Palette

The UI uses a **midnight indigo + saffron amber** palette. Green was intentionally avoided. The goal was maximum readability on a dark background with a single warm accent color that passes WCAG AA for all interactive elements.

| Token | Hex | Usage | Contrast on bg |
|---|---|---|---|
| `night-900` | `#0d0e1f` | Page background | -- |
| `night-800` | `#131428` | Cards, header | -- |
| `night-700` | `#1a1c34` | Input backgrounds | -- |
| `night-600` | `#22253f` | Borders, dividers | -- |
| `amber-500` | `#f0a000` | Primary CTA, focus ring | **9.2:1** |
| `amber-400` | `#f5b835` | Labels, prices, icons | **5.8:1** |
| White | `#ffffff` | Body text, headings | **15.8:1** |
| `night-200` | `#a0a5cc` | Secondary text | **7.4:1** |

All contrast ratios measured against `night-800`. White and `night-200` exceed WCAG AAA (7:1). Amber values meet WCAG AA (4.5:1).

---

## Accessibility

ShopEase was built with keyboard and screen reader users as first-class citizens, not an afterthought.

**Focus management**
- Skip-to-main link is the first focusable element on every page; visible only on keyboard focus
- `*:focus-visible` in global CSS applies an amber `2px` outline with `3px` offset to every interactive element - no `outline: none` anywhere in the codebase
- Error summary panel receives programmatic focus via `useRef` + `useEffect` after a failed form submit (satisfies WCAG 2.4.3 Focus Order)
- Confirmation page heading receives focus on mount so screen readers announce the success state immediately

**Forms**
- All inputs use `htmlFor` / `id` pairs and `<fieldset>` / `<legend>` grouping
- `aria-required`, `aria-invalid`, and `aria-describedby` set on every input
- Per-field inline errors with concrete format examples (e.g. `Use MM/YY format (e.g. 08/27)`)
- Error summary lists all failures as anchor links that jump to the relevant field

**Dynamic content**
- `role="status"` + `aria-live="polite"` announces cart additions and order confirmation without interrupting screen reader speech flow
- `aria-current="step"` on the active progress bar step
- Decorative SVGs and ambient glow elements have `aria-hidden="true"`

**WCAG 2.2 coverage**

| Criterion | Level | Status |
|---|---|---|
| 1.1.1 Non-text Content | A | Pass |
| 1.3.1 Info and Relationships | A | Pass |
| 1.4.3 Contrast (Minimum) | AA | Pass |
| 1.4.11 Non-text Contrast | AA | Pass |
| 2.1.1 Keyboard | A | Pass |
| 2.4.3 Focus Order | A | Pass |
| 2.4.7 Focus Visible | AA | Pass |
| 2.5.3 Label in Name | A | Pass |
| 3.3.1 Error Identification | A | Pass |
| 3.3.3 Error Suggestion | AA | Pass |
| 4.1.2 Name, Role, Value | A | Pass |

**Touch targets:** All interactive elements are a minimum of 44x44 CSS pixels (WCAG 2.5.5 AAA).

---

## Project Structure

```
shopease/
  index.html                  # Skip-to-main link lives here, before the React root
  tailwind.config.js          # Custom palette, keyframe definitions
  src/
    index.css                 # Font imports, base styles, component classes, grain overlay
    main.jsx
    App.jsx                   # Router, cart state, placeOrder()
    components/
      Header.jsx              # Sticky nav with animated cart badge
      ProgressBar.jsx         # 4-step indicator with animated fill
    pages/
      ProductPage.jsx         # Floating book, staggered entrance, add-to-cart
      CartPage.jsx            # Item list, order summary sidebar
      CheckoutPage.jsx        # Validated form with error summary and focus management
      ConfirmationPage.jsx    # SVG checkmark draw, order details, shipping summary
  report.pdf                  # Lab 2 and 3 written report
```

---

## Known Limitations

These are documented trade-offs, not oversights:

- **No blur-time validation** - fields validate on submit only, to avoid interrupting screen reader users mid-typing. A future iteration should validate on blur after a field has been touched.
- **No automated accessibility CI** - axe-core and Lighthouse are not integrated into the build pipeline. This should be the first addition in any follow-up.
- **No unit tests** - no Jest or React Testing Library coverage within the lab timeline.
- **English only** - no i18n library integrated.
- **Mocked payment** - no real gateway. Do not enter real card details.

---

## Report

A full written report (`report.pdf`) is included in the root of this project. It covers:

- Baseline heuristic evaluation with severity ratings
- Design ideation and weighted decision matrix
- Final implementation decisions and animation inventory
- WCAG 2.2 POUR mapping (14 criteria)
- EDI considerations
- Validation results before and after
- Reflection on trade-offs and peer feedback

---

*CSSD2401 User Interface Development -- Lab 2 and 3 -- March 2026*