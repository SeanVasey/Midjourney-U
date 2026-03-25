# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.0.0] - 2026-03-25

### Added

- Full interactive reference guide with 11 slides covering Midjourney's reference system
- React 19 + TypeScript + Vite 6 application scaffold
- Slide components: Hero, Overview, DeepDive (x4), Combos, Weights, Decision, Syntax, Tips, Glossary
- Navigation system with keyboard (arrow keys), touch/swipe, and button controls
- Chrome components: ProgressBar, NavDots, SlideNav, HeaderBar, GrainOverlay
- SVG icon components: VMLogo, MJIcon, RefIcon (12 icon types)
- BrandedFooter with Vasey Multimedia / Vasey AI branding
- CSS Modules styling with design tokens (colors, fonts, spacing)
- Copy-to-clipboard on syntax templates
- Vitest + React Testing Library test suite (5 smoke tests)
- ESLint 9 flat config with React hooks and refresh plugins
- CI pipeline: lint, typecheck, test, build, npm audit, markdown lint, link checks
- Vercel deployment config with SPA rewrites and asset caching

## [0.1.0] - 2026-03-24

### Added

- Initial project scaffolding with CLAUDE.md baseline
- Repository documentation: CHANGELOG, SECURITY, CODE_OF_CONDUCT, CONTRIBUTING
- Developer tooling configs: `.editorconfig`, `.gitignore`, `.env.example`
- CI workflow via GitHub Actions (markdown lint, link checks)
- Project structure: `docs/`, `tasks/`, `.claude/`, `.github/workflows/`
