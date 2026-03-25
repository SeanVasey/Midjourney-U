# Architecture

## Overview

Midjourney-U is a single-page React application that presents an interactive slide-deck reference guide for Midjourney's image reference system. It covers Image Prompts, Style References, Character References, and Omni References.

## Tech Stack

- **React 19** — UI framework
- **TypeScript 5.8** — type safety
- **Vite 6** — build tool and dev server
- **CSS Modules** — scoped component styles with CSS custom properties
- **Vitest + React Testing Library** — testing
- **ESLint 9** — linting (flat config)
- **Vercel** — deployment target

## Project Structure

```
Midjourney-U/
├── index.html                      # Vite entry point with font preloads
├── vite.config.ts                  # Vite + React plugin
├── vercel.json                     # SPA rewrites + asset cache headers
│
├── src/
│   ├── main.tsx                    # createRoot, imports global CSS
│   ├── App.tsx                     # Root: navigation context + slide rendering
│   ├── App.module.css              # Slide transitions (exitLeft/exitRight/visible)
│   │
│   ├── components/
│   │   ├── chrome/                 # App shell navigation UI
│   │   │   ├── GrainOverlay       # Film grain texture overlay
│   │   │   ├── HeaderBar          # Top bar showing current section
│   │   │   ├── ProgressBar       # Horizontal progress indicator
│   │   │   ├── NavDots           # Clickable slide indicator dots
│   │   │   └── SlideNav          # Prev/Next buttons + slide counter
│   │   │
│   │   ├── icons/                  # Pure SVG components
│   │   │   ├── VMLogo            # Vasey Multimedia logo
│   │   │   ├── MJIcon            # Midjourney brand icon
│   │   │   └── RefIcon           # Discriminated icon (12 types)
│   │   │
│   │   ├── layout/                 # Shared structural components
│   │   │   └── BrandedFooter     # Footer with branding + copyright
│   │   │
│   │   └── slides/                 # One component per slide type
│   │       ├── SlideRenderer     # Switch dispatcher by section.type
│   │       ├── SectionHeader     # Reusable title/subtitle header
│   │       ├── HeroSlide         # Landing/intro slide
│   │       ├── OverviewSlide     # 4-card reference type overview
│   │       ├── DeepDiveSlide     # Detailed parameter exploration (x4)
│   │       ├── CombosSlide       # Reference combination strategies
│   │       ├── WeightsSlide      # Weight system visualizer
│   │       ├── DecisionSlide     # Which reference to use (Q&A)
│   │       ├── SyntaxSlide       # Copy-paste prompt templates
│   │       ├── TipsSlide         # Pro tips and pitfalls
│   │       └── GlossarySlide     # Parameter glossary + resources
│   │
│   ├── data/
│   │   └── sections.ts            # SECTIONS array (11 entries, all content)
│   │
│   ├── types/
│   │   └── sections.ts            # TypeScript interfaces for all data shapes
│   │
│   ├── hooks/
│   │   └── useSlideNavigation.ts   # Slide state, keyboard, touch, swipe
│   │
│   └── styles/
│       ├── tokens.css              # CSS custom properties (design system)
│       └── global.css              # Reset, scrollbar, keyframes
│
└── tests/                          # Co-located in src/ (App.test.tsx)
```

## Key Design Decisions

### No Router

The app is a single-view slide deck, not a multi-page application. Navigation is internal state (slide index), not URL-based routing. Adding React Router would be unnecessary complexity.

### CSS Modules over Tailwind

The design is highly custom (specific hex colors, grain overlays, gradient text, custom keyframes). CSS Modules provide scoped styles with zero runtime cost and full access to native CSS features. Tailwind would require extensive arbitrary values.

### No State Management Library

App state is minimal: current slide index, transition direction, transitioning flag. These fit naturally in `useState` + `useCallback`. No Redux/Zustand warranted.

### Data-Driven Slides

All content lives in `src/data/sections.ts` as a typed array. Slide components are pure renderers that receive their section data as props. This separates content from presentation and makes content updates trivial.

### CSS Animations Only

All animations (float, pulse, glow, gradient shift, slide transitions) are pure CSS. No animation library needed.

## Data Flow

```
SECTIONS (data) → App → SlideRenderer → Specific Slide Component
                   ↕
            useSlideNavigation (hook)
                   ↕
            Chrome Components (ProgressBar, NavDots, SlideNav)
```

## Deployment

Configured for Vercel with:
- SPA rewrites (`vercel.json` — all routes → `index.html`)
- Immutable cache headers for hashed assets in `/assets/`
- Auto-detected Vite build (zero-config)
