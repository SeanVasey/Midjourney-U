<div align="center">

# Midjourney-U

**The Unofficial University — Master Midjourney's Reference System**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![CI](https://github.com/seanvasey/midjourney-u/actions/workflows/ci.yml/badge.svg)](https://github.com/seanvasey/midjourney-u/actions/workflows/ci.yml)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)](https://vite.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## About

Midjourney-U is an interactive slide-deck reference guide for mastering Midjourney's image reference system. It covers **Image Prompts**, **Style References**, **Character References**, and **Omni References** — with syntax templates, weight systems, combination strategies, and pro tips.

Built as a single-page React app with swipe/keyboard navigation, optimized for mobile and desktop.

## Features

### Reference System Coverage

- **Image Prompts** — composition and chromatic inspiration via `--iw`
- **Style Reference** — aesthetic transfer with `--sref`, `--sw`, `--sv`, style codes
- **Character Reference** — identity persistence with `--cref` and `--cw` (V6)
- **Omni Reference** — universal embedding with `--oref` and `--ow` (V7)

### Interactive Guide

- 11-slide deck with swipe, arrow key, and click navigation
- Copy-paste syntax templates for every reference type
- Decision tree for choosing the right reference approach
- Weight system visualizer for dialing in your mix
- Pro tips and pitfalls from real-world usage
- Glossary with all parameters and resources

### Technical

- React 19 + TypeScript + Vite 6
- CSS Modules with design tokens
- Keyboard, touch, and swipe navigation
- Accessible — semantic HTML, ARIA labels, keyboard-first
- Zero external runtime dependencies beyond React

## Getting Started

```bash
# Clone the repository
git clone https://github.com/seanvasey/midjourney-u.git
cd midjourney-u

# Install dependencies
npm install

# Start development server
npm run dev

# Run all checks
npm run lint && npm run typecheck && npm test && npm run build
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript 5.8 (strict)
- **Build:** Vite 6
- **Styling:** CSS Modules + CSS Custom Properties
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint 9 (flat config)
- **CI:** GitHub Actions (lint, typecheck, test, build, audit)
- **Deploy:** Vercel (SPA with rewrites)

## Project Structure

```
Midjourney-U/
├── index.html                 # Vite entry point
├── package.json
├── vite.config.ts
├── vercel.json                # SPA routing for Vercel
├── tsconfig.json
├── eslint.config.js
├── vitest.config.ts
│
├── src/
│   ├── main.tsx               # React DOM entry
│   ├── App.tsx                # Root component — navigation + slide rendering
│   ├── App.module.css
│   │
│   ├── components/
│   │   ├── chrome/            # Navigation UI (ProgressBar, NavDots, SlideNav, HeaderBar, GrainOverlay)
│   │   ├── icons/             # SVG components (VMLogo, MJIcon, RefIcon)
│   │   ├── layout/            # Shared layout (BrandedFooter)
│   │   └── slides/            # Slide components (Hero, Overview, DeepDive, Combos, Weights, Decision, Syntax, Tips, Glossary)
│   │
│   ├── data/
│   │   └── sections.ts        # All slide content data
│   │
│   ├── hooks/
│   │   └── useSlideNavigation.ts  # Keyboard, touch, swipe navigation logic
│   │
│   ├── types/
│   │   └── sections.ts        # TypeScript interfaces
│   │
│   └── styles/
│       ├── tokens.css         # Design tokens (colors, fonts, spacing)
│       └── global.css         # Reset, scrollbar, keyframes
│
├── docs/                      # Architecture docs
├── .github/workflows/ci.yml   # CI pipeline
└── tasks/                     # Work tracking
```

## What's New

### v1.0.0 — Reference System Guide

- Full 11-slide interactive reference guide
- React 19 + TypeScript + Vite 6 application
- All four reference types with deep-dive slides
- Combination strategies, weight system, decision tree
- Syntax templates with copy-to-clipboard
- Pro tips, glossary, and resource links
- CI pipeline with lint, typecheck, test, build
- Vercel deployment configuration

See [CHANGELOG.md](CHANGELOG.md) for full history.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the Apache License 2.0 — see [LICENSE](LICENSE) for details.

## Credits

- [Midjourney](https://www.midjourney.com/) for the AI image generation platform
- **VASEY Multimedia** / **VASEY/AI** — design and engineering
