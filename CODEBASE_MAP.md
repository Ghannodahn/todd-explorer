# Codebase Map

## Entry Points
- `src/react-app/main.tsx` - React application entry point, mounts App component
- `src/react-app/App.tsx` - Main application component with router setup
- `src/worker/index.ts` - Cloudflare Workers backend entry point with Hono
- `index.html` - HTML template with script tag pointing to main.tsx

## Core Components
- `src/react-app/components/explorer/todd-header.tsx` - Main navigation header with dynamic menu loading
- `src/react-app/components/explorer/todd-content.tsx` - Central routing component for all app views
- `src/react-app/components/explorer/todd-home.tsx` - Homepage/dashboard component
- `src/react-app/components/prompty/prompty-home.tsx` - Prompty tool homepage
- `src/react-app/components/prompty/prompty-tile.tsx` - Prompty interface components
- `src/react-app/components/util/markdown-viewer.tsx` - Shared markdown rendering utility
- `src/react-app/components/util/resizer.tsx` - UI resizing utility component
- `src/react-app/prototypes/` - Prototype applications and examples

## Business Logic
- **Navigation Logic**: `src/react-app/components/explorer/todd-header.tsx` - Dynamic menu loading from JSON, dropdown handling
- **Routing Logic**: `src/react-app/components/explorer/todd-content.tsx` - All application routes and view mapping
- **Prompty Logic**: `src/react-app/components/prompty/` - AI prompt optimization tools and interfaces
- **Prototype Logic**: `src/react-app/prototypes/` - Various tool prototypes (modely, recipes, arty, reacty, etc.)
- **API Logic**: `src/worker/index.ts` - Backend API endpoints using Hono framework

## Configuration
- `package.json` - Dependencies, scripts, and project metadata
- `vite.config.ts` - Vite build configuration with Cloudflare Workers plugin
- `tsconfig.json` - TypeScript compiler configuration
- `tsconfig.app.json` - App-specific TypeScript settings
- `tsconfig.worker.json` - Worker-specific TypeScript settings
- `tailwind.config.js` - TailwindCSS configuration
- `postcss.config.js` - PostCSS processing configuration
- `eslint.config.js` - ESLint linting rules
- `wrangler.json` - Cloudflare Workers deployment configuration

## Key Directories
- `src/react-app/components/explorer/` - Main application shell, navigation, and core UI
- `src/react-app/components/prompty/` - Prompt optimization tool components
- `src/react-app/components/util/` - Shared utility components used across the app
- `src/react-app/prototypes/` - Experimental and prototype tool implementations
- `src/react-app/assets/` - Static assets like images and icons
- `src/worker/` - Backend API implementation using Hono on Cloudflare Workers
- `docs/` - Documentation including optimization guides
- `public/` - Static public assets served directly
- `dist/` - Build output directory

## Important Utilities
- **Markdown Rendering**: `src/react-app/components/util/markdown-viewer.tsx` - Processes and displays markdown content
- **UI Utilities**: `src/react-app/components/util/resizer.tsx` - Handles responsive layout adjustments
- **TypeScript Definitions**: `worker-configuration.d.ts` - Cloudflare Workers type definitions
- **Styling**: `src/react-app/index.css` - Global CSS styles with TailwindCSS imports
- **Environment**: `src/react-app/vite-env.d.ts` - Vite environment type definitions

## Testing Structure
Testing is configured but minimal:
- **Test Framework**: Vitest with Testing Library React
- **Configuration**: Tests can be run via `npm run check` or direct vitest commands
- **Test Files**: No existing test files found, but setup is ready for `.test.tsx` files
- **Coverage**: Testing configuration includes Jest DOM matchers for React testing
