# Tech Stack

## Core Technologies

- **TypeScript** (ES2020 target, strict mode enabled)
- **Vite** - Build tool and dev server
- **Vanilla TypeScript** - No framework, component-based architecture
- **LocalStorage** - Client-side data persistence

## Dependencies

- `date-fns` - Date manipulation and formatting

## Dev Dependencies

- `vitest` - Testing framework
- `@testing-library/dom` - DOM testing utilities
- `fast-check` - Property-based testing
- `jsdom` - DOM environment for tests

## Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)

# Building
npm run build            # TypeScript compile + Vite build → dist/

# Testing
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode

# Preview
npm run preview          # Preview production build locally
```

## TypeScript Configuration

- Strict mode enabled
- No unused locals/parameters
- Bundler module resolution
- ES2020 + DOM libs
