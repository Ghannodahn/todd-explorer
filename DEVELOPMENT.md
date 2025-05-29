# Development Guide

## Prerequisites
- Node.js (version 18 or higher recommended)
- npm (comes with Node.js)
- Cloudflare Workers account (for deployment)
- Wrangler CLI (installed as dev dependency)

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todd-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate Cloudflare types** (optional)
   ```bash
   npm run cf-typegen
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Available Scripts
- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build the application for production (TypeScript compilation + Vite build)
- `npm run preview` - Build and preview the production build locally
- `npm run check` - Full validation: TypeScript check + build + dry-run deployment
- `npm run deploy` - Build and deploy to Cloudflare Workers
- `npm run lint` - Run ESLint on the codebase
- `npm run cf-typegen` - Generate TypeScript types for Cloudflare Workers
- `npm run build:watch` - Watch mode for both TypeScript and Vite builds

## Environment Configuration
This project uses Cloudflare Workers and doesn't require traditional environment variables for local development. However:

- **Worker Configuration**: Modify `wrangler.json` for deployment settings
- **Local Development**: The dev server runs the React app locally while the worker can be tested separately
- **API Endpoints**: Worker endpoints are available at `/api/*` routes

## Development Workflow
1. **Feature Development**: 
   - Work in `src/react-app/components/` for frontend features
   - Use `src/worker/` for backend API development
   - Add prototypes in `src/react-app/prototypes/` for experimental features

2. **Testing Changes**:
   - Use `npm run dev` for live development
   - Run `npm run check` before committing to validate build
   - Use `npm run lint` to ensure code quality

3. **Deployment**:
   - `npm run deploy` builds and deploys to Cloudflare Workers
   - Ensure `wrangler.json` is configured with correct account details

## Key Configuration Files
- `vite.config.ts` - Vite build configuration with Cloudflare plugin
- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.app.json` - Frontend-specific TypeScript settings
- `tsconfig.worker.json` - Worker-specific TypeScript settings
- `tailwind.config.js` - TailwindCSS utility classes and theme
- `postcss.config.js` - CSS processing pipeline
- `eslint.config.js` - Code linting rules and standards
- `wrangler.json` - Cloudflare Workers deployment configuration
- `worker-configuration.d.ts` - TypeScript definitions for Workers runtime

## Troubleshooting
- **Build Errors**: Run `npm run check` to see detailed TypeScript and build errors
- **Module Resolution**: Ensure imports use correct relative paths from `src/react-app/`
- **Worker Issues**: Check `wrangler.json` configuration and ensure Cloudflare account is set up
- **Development Server**: If port 5173 is occupied, Vite will automatically use the next available port
- **TypeScript Errors**: Run `npm run cf-typegen` if you encounter Cloudflare-related type issues
