# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Regenerated the full favicon / PWA / iOS Home Screen raster suite (`favicon-16` → `icon-1024`, every `apple-touch-icon` size, `favicon.ico`, and the `public/icons/icon-ios.svg` copy) from the latest `midjourney-icon-ios.svg`, which now uses a full-bleed amber border plate (opaque edge-to-edge) plus an inner amber glow rim. iOS applies its own squircle mask, so the tile no longer relies on transparent corners and never shows the light/dark background through its edges. The optimized transparent `icon.svg` mark remains the source for in-app / transparent-background use
- Refreshed the iOS-style app tile (`midjourney-icon-ios.svg`) with a stronger amber outer glow and a brighter, thicker rim, and regenerated the entire raster suite (`favicon-16` → `icon-1024`, every `apple-touch-icon` size, `favicon.ico`, and the `public/icons/icon-ios.svg` copy) so the favicon, PWA, and iOS Home Screen icon all reflect the updated design
- Inset the tile's crisp rim rect to keep its (now 6px) stroke's outer edge flush with the clipped body boundary, matching the design's long-standing intent and preventing a ~1px amber bleed onto the transparent corners
- New designed iOS-style app tile (`midjourney-icon-ios.svg`) is now the favicon, PWA, and iOS Home Screen icon: a dark gradient rounded-rect body with amber glow, sheen, and the sailboat mark. Regenerated the full raster suite (`icon-16` → `icon-1024`, all `apple-touch-icon` sizes, `favicon.ico`) from it. The optimized transparent `icon.svg` mark is preserved in `public/icons/` for uses where a transparent background is ideal
- Icon generator (`scripts/generate-icons.mjs`) now sources rasters from the iOS tile at 2× render density for crisper downscales, and copies both the tile (`icon-ios.svg`) and the transparent mark (`icon.svg`) into `public/icons/`

### Added

- iOS safe-area support: `viewport-fit=cover` plus `env(safe-area-inset-*)` offsets on the fixed chrome (header, progress bar, nav dots, slide nav) and app container, so content clears the notch and home indicator on iPhone/iPad
- Dynamic viewport units (`100dvh` with `100vh` fallback) on the app shell and all slides to prevent overflow under mobile Safari's collapsing toolbars
- GitHub Pages deployment workflow (`deploy-pages.yml`) that builds the Vite app with the correct `/Midjourney-U/` base path and ships a `404.html` SPA fallback

### Fixed

- Slide backgrounds (hero gradients) now extend under the iOS status bar and home indicator: safe-area insets moved from app-shell padding into the slide padding tokens, removing the faint tint seam at the notch edge on the hero slide
- Replaced the auto-generated Jekyll Pages workflow, which published raw source files instead of the built app
- Web app manifest now uses relative icon paths and `start_url`, so the PWA installs correctly from both Vercel (domain root) and GitHub Pages (repo subpath)

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
