# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

doofs.tech is a marketing/portfolio website showcasing various products (Domains Doofs, Do-Mails, Loan A Hub) and experimental projects. Built as a modern React SPA with TypeScript, Vite, and shadcn-ui components.

## Development Commands

### Setup
```bash
npm i                    # Install dependencies
```

### Development
```bash
npm run dev              # Start dev server on http://[::]:8080
npm run preview          # Preview production build locally
```

### Building
```bash
npm run build            # Production build (output: dist/)
npm run build:dev        # Development build
```

### Quality Checks
```bash
npm run lint             # Run ESLint on all files
npm test                 # Run all tests once (Vitest)
npm run test:watch       # Run tests in watch mode
```

### Testing Individual Files
```bash
npx vitest run src/path/to/file.test.ts      # Run specific test file
npx vitest run --reporter=verbose            # Run tests with detailed output
```

## Architecture

### Application Structure

**Entry Point Flow:**
- `index.html` → `main.tsx` → `App.tsx` → React Router → Page components

**Core Providers (in App.tsx):**
- `QueryClientProvider` - React Query for async state management
- `ThemeProvider` - Custom dark/light theme system (stores to localStorage as 'doofs-theme')
- `TooltipProvider` - shadcn-ui tooltip context
- `BrowserRouter` - Client-side routing

### Directory Structure

```
src/
├── assets/           # Images and static assets
├── components/       # React components
│   ├── ui/          # shadcn-ui components (auto-generated, edit with caution)
│   └── *.tsx        # Custom app components (Header, Hero, Footer, etc.)
├── data/            # Static data and type definitions
│   └── products.ts  # Product catalog and lab projects data
├── hooks/           # Custom React hooks
│   └── use-theme.tsx # Theme management hook
├── lib/             # Utilities
│   └── utils.ts     # cn() utility for className merging
├── pages/           # Route pages
│   ├── Index.tsx    # Home page (main product showcase)
│   └── NotFound.tsx # 404 page
└── test/            # Test setup and test files
    └── setup.ts     # Vitest configuration (mocks matchMedia)
```

### Key Architectural Patterns

**Path Aliases:**
- `@/` maps to `src/` throughout the codebase
- Configured in `vite.config.ts`, `tsconfig.json`, and `components.json`

**Styling:**
- Tailwind CSS with custom theme variables via CSS variables (HSL values)
- Custom animations: fade-in, slide-up, glow-pulse, accordion transitions
- Dark mode via class-based switching on `<html>` element
- shadcn-ui components use `cn()` utility for conditional class merging

**Component Composition:**
- Index page = Header + Hero + ProductsSection + About + LabSection + Footer
- Product data centralized in `src/data/products.ts`
- Status badges for products: 'live', 'beta', 'experimental'

**Theme System:**
- Custom implementation (not next-themes despite being installed)
- Persists to localStorage as 'doofs-theme'
- Supports dark/light modes with system preference detection
- Theme variables defined in `src/index.css`

### Data Models

**Product Type:**
```typescript
{
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  status: 'live' | 'beta' | 'experimental';
  icon: string;
  category: string;
  features?: string[];
  techFocus?: string;
  github?: string;
  image?: string;
}
```

**Lab Project Type:**
```typescript
{
  id: string;
  name: string;
  description: string;
  status: 'idea' | 'building' | 'paused';
  eta?: string;
}
```

## Adding shadcn-ui Components

Use the CLI to add new shadcn-ui components:
```bash
npx shadcn@latest add <component-name>
```

Components are added to `src/components/ui/` based on configuration in `components.json`.

## Configuration Notes

### TypeScript
- Lenient configuration: `noImplicitAny: false`, `strictNullChecks: false`
- Unused variables and parameters are allowed
- Project uses composite tsconfig with app and node references

### ESLint
- TypeScript ESLint with React hooks plugin
- Unused vars warning is disabled
- Hot module reloading enforced via react-refresh

### Vite
- Dev server on port 8080, bound to all interfaces (`::`)
- HMR overlay disabled
- Uses SWC for React transforms (fast compilation)

### Vitest
- Test environment: jsdom
- Test pattern: `src/**/*.{test,spec}.{ts,tsx}`
- Setup file mocks window.matchMedia for components using media queries

## Routing

Routes are defined in `App.tsx`:
- `/` - Index (home page)
- `*` - NotFound (catch-all for 404s)

**Adding New Routes:**
Add new Route components ABOVE the catch-all `*` route in App.tsx.

## Important Notes

- The `components/ui/` directory contains auto-generated shadcn-ui components - prefer using the CLI to update them rather than manual edits
- Theme is stored in localStorage and synced with document root class
- Product images are imported directly from assets and bundled by Vite
- The codebase uses relaxed TypeScript rules for rapid prototyping
