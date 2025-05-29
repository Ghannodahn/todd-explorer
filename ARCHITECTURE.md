# Application Architecture

## Overview
TODD (Tool-Orchestrated Development and Diagnostics) is a comprehensive suite of development and diagnostic tools built as a React application with a Cloudflare Workers backend. It provides multiple specialized tools including Prompty for prompt optimization, Rhombus for data analytics, Modely for diagram modeling, Arena for model comparison, and several other productivity-focused applications.

## Tech Stack
- Frontend: React 19 with TypeScript, Vite, TailwindCSS
- Backend: Hono framework on Cloudflare Workers
- Routing: React Router DOM
- Build Tool: Vite with TypeScript compilation
- Styling: TailwindCSS with PostCSS
- Testing: Vitest with Testing Library
- Deployment: Cloudflare Workers via Wrangler

## Directory Structure
```
├── src/
│   ├── react-app/           # React frontend application
│   │   ├── components/      # React components organized by feature
│   │   │   ├── explorer/    # Main app shell and navigation
│   │   │   ├── prompty/     # Prompt optimization tools
│   │   │   └── util/        # Shared utility components
│   │   ├── assets/          # Static assets
│   │   ├── prototypes/      # Prototype components
│   │   └── main.tsx         # React application entry point
│   └── worker/              # Cloudflare Workers backend
│       └── index.ts         # Worker entry point with Hono
├── docs/                    # Documentation and optimization guides
├── public/                  # Public static assets
├── dist/                    # Build output
└── package.json             # Dependencies and scripts
```

## Key Modules
1. **Explorer Module** (`src/react-app/components/explorer/`) - Main application shell, header navigation, and home dashboard
2. **Prompty Module** (`src/react-app/components/prompty/`) - AI prompt optimization and analysis tools
3. **Utilities Module** (`src/react-app/components/util/`) - Shared components like markdown viewer and resizer
4. **Worker API** (`src/worker/`) - Backend API services using Hono framework
5. **Build System** - Vite-based build configuration with TypeScript and TailwindCSS
6. **Configuration** - ESLint, TypeScript, and Cloudflare deployment configs

## Data Flow
The application currently uses a static data architecture with plans for D1 database integration. The main data flow is:
1. User interactions in React components trigger state changes
2. Components fetch static JSON data from `/data/` directory (e.g., prototypes.json)
3. Frontend updates UI based on loaded JSON data
4. React Router manages client-side navigation between different tools
5. Cloudflare Workers backend provides minimal API endpoints (currently just a basic health check)
6. Future: D1 database support will enable dynamic data storage and retrieval

## External Dependencies
- **Cloudflare Workers** - Serverless backend hosting and edge computing
- **Hono** - Lightweight web framework for the worker backend
- **React Router** - Client-side routing and navigation
- **Lucide React** - Icon library for UI components
- **Marked** - Markdown parsing and rendering
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
