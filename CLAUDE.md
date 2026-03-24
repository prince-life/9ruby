# CLAUDE.md — 9 Ruby Command Center

## Project Overview

AI-powered command center SPA built with React 18, TypeScript, and Vite. Client-side only (no backend). Live at https://ruby-command.lovable.app.

## Tech Stack

- **Framework:** React 18.3 + TypeScript 5.8
- **Build:** Vite 5.4 with SWC plugin
- **Styling:** Tailwind CSS 3.4 + shadcn/ui + Framer Motion
- **State:** TanStack Query (React Query), React Hook Form + Zod
- **Routing:** React Router v6
- **Testing:** Vitest + Testing Library (JSDOM)
- **Package Manager:** Bun (primary), npm (compatible)

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Dev server on localhost:8080
bun run build        # Production build → /dist
bun run build:dev    # Development build
bun run lint         # ESLint check
bun test             # Run tests (single run)
bun test -- --watch  # Watch mode
```

## Project Structure

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Root: QueryClient, Router, Providers
├── index.css                # Global styles, CSS custom properties, design tokens
├── pages/
│   ├── Index.tsx            # Main page — view router with activeView state
│   └── NotFound.tsx         # 404 page
├── views/                   # Feature views (switched by activeView in Index.tsx)
│   ├── HubView.tsx          # Dashboard: terminal log, quick actions, stats
│   ├── GemVault.tsx         # Gem collection with 3D visualization
│   ├── AgentBuilder.tsx     # Workflow automation builder
│   ├── NeuralSettings.tsx   # AI behavior toggles + metrics chart
│   └── GitHubView.tsx       # GitHub integration (PAT auth, repos, commits)
├── components/
│   ├── AdaptiveNav.tsx      # Responsive nav: sidebar (desktop) / bottom bar (mobile)
│   ├── BottomNav.tsx        # Mobile bottom navigation
│   ├── Gem3D.tsx            # 3D gem SVG visualization
│   ├── GlassCard.tsx        # Reusable glass-morphism card with motion
│   ├── NavLink.tsx          # Navigation link
│   ├── TerminalLog.tsx      # Live terminal stream display
│   └── ui/                  # 30+ shadcn/ui primitives (do not edit directly)
├── hooks/
│   ├── use-mobile.tsx       # Mobile viewport detection (< 768px)
│   └── use-toast.ts         # Toast notification hook
├── lib/
│   └── utils.ts             # cn() utility (clsx + tailwind-merge)
└── test/
    ├── setup.ts             # Vitest setup: jest-dom matchers, matchMedia polyfill
    ├── GitHubView.test.tsx   # GitHub view tests
    └── example.test.ts       # Example test template
```

## Architecture & Conventions

### Routing
Single-page app with one route (`/`). Views are toggled via `activeView` state in `pages/Index.tsx`, not via URL routing.

### Component Patterns
- **Views** (`src/views/`) — full-page feature panels, rendered by Index.tsx
- **Components** (`src/components/`) — shared reusable components
- **UI primitives** (`src/components/ui/`) — shadcn/ui components; avoid modifying directly
- All custom components use Framer Motion for entrance animations
- `GlassCard` is the standard card wrapper (glass-morphism effect)

### Styling
- **Dark mode by default**, class-based toggle via `next-themes`
- Design tokens defined as CSS custom properties in `src/index.css`
- Gem color palette: ruby, sapphire, emerald, amber, amethyst, topaz, diamond
- Glass morphism utilities: `glass`, `glass-strong`, `glass-nav`, `glass-sidebar`
- Ruby glow effects: `ruby-glow`, `ruby-glow-strong`
- Fonts: Inter (sans), Fira Code (mono)

### Path Aliases
`@/*` maps to `src/*` — use `@/components/ui/button` not `../../components/ui/button`

### TypeScript
- `noImplicitAny: false`, `strictNullChecks: false` — relaxed strict mode
- Target: ES2020

### State Management
- Server state: TanStack Query
- Form state: React Hook Form + Zod validation
- UI state: React useState/useReducer (local)
- No global state store

## Testing

- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Environment: JSDOM with global test APIs
- Mock `framer-motion` in component tests to avoid animation issues
- Mock `fetch` for API call tests
- Use `@testing-library/react` utilities (`render`, `screen`, `waitFor`)
- Run `bun test` before committing changes

## Git Workflow

- GitHub Flow: feature branches merged via PRs to `main`
- Branch naming: `copilot/<feature>` or `claude/<feature>`
- Keep commits focused with descriptive messages

## Key Files for Common Tasks

| Task | Files |
|---|---|
| Add a new view | `src/views/NewView.tsx`, `src/pages/Index.tsx` (add to view router), `src/components/AdaptiveNav.tsx` (add nav item) |
| Add a UI component | `src/components/` (custom) or `src/components/ui/` (shadcn) |
| Modify navigation | `src/components/AdaptiveNav.tsx` + `src/components/BottomNav.tsx` |
| Change design tokens | `src/index.css` (CSS vars) + `tailwind.config.ts` |
| Add a new hook | `src/hooks/` |
| Add/modify tests | `src/test/` |
