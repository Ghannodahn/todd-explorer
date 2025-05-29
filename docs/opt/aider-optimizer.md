# Instructions for Optimization of a Repo for Aider

## Overview
You are tasked with analyzing this codebase and creating comprehensive repository index files that will help AI assistants (like Aider/Qwen) understand the project structure without loading all files into context. Follow these instructions step by step.

## Step 1: Initial Codebase Analysis
First, examine the repository structure by:
1. Identifying the primary programming language(s) and frameworks
2. Locating the main entry points (e.g., `main.py`, `index.js`, `App.js`, `server.js`)
3. Understanding the directory structure and organization patterns
4. Identifying configuration files (`package.json`, `requirements.txt`, `.env`, etc.)
5. Finding existing documentation files (`README.md`, docs folder, etc.)

## Step 2: Create ARCHITECTURE.md
Create a file called `ARCHITECTURE.md` in the project root with the following structure:

```markdown
# Application Architecture

## Overview
[Write 2-3 sentences describing what this application does and its main purpose]

## Tech Stack
[List the main technologies, frameworks, and tools used]
- Frontend: [Framework/library used]
- Backend: [Server technology]
- Database: [Database type and name]
- Infrastructure: [Deployment/hosting info if apparent]

## Directory Structure
[Create a tree view of the main directories with brief descriptions]

## Key Modules
[Identify 4-6 main functional areas of the application and their locations]

## Data Flow
[Describe how data moves through the application at a high level]

## External Dependencies
[List major external services, APIs, or third-party integrations]
```

**Instructions for content:**
- Focus on architecture, not implementation details
- Keep descriptions concise but informative
- Include file paths where relevant
- Identify the main business logic areas

## Step 3: Create CODEBASE_MAP.md
Create a file called `CODEBASE_MAP.md` in the project root:

```markdown
# Codebase Map

## Entry Points
[List the main entry files and their purposes]

## Core Components
[Identify the 8-12 most important files/directories that developers frequently modify]

## Business Logic
[Map out where the main business logic lives]

## Configuration
[List configuration files and their purposes]

## Key Directories
[Provide a guide to the main directories and what they contain]

## Important Utilities
[Identify helper functions, constants, and shared utilities]

## Testing Structure
[Describe how tests are organized if tests exist]
```

**Instructions for content:**
- Focus on files that are frequently modified or central to the application
- Include full file paths from project root
- Prioritize files that contain business logic over boilerplate
- Group related files together logically

## Step 4: Create API_REFERENCE.md (If Applicable)
If this is a web application with API endpoints, create `API_REFERENCE.md`:

```markdown
# API Reference

## Base URL
[API base URL if applicable]

## Authentication
[How authentication works, if applicable]

## Endpoints
[Group endpoints by functionality and list the main ones with brief descriptions]

### [Category Name]
- `METHOD /path` - Brief description
- `METHOD /path/:id` - Brief description

## Data Models
[If there are clear data models, list the main ones]
```

**Instructions for content:**
- Only create this file if there are clear API endpoints
- Focus on the main endpoints, not exhaustive documentation
- Group logically by feature or resource type

## Step 5: Create DATABASE_SCHEMA.md (If Applicable)
If there's clear database usage, create `DATABASE_SCHEMA.md`:

```markdown
# Database Schema

## Overview
[Database type and brief description]

## Main Tables/Collections
[List the primary data entities]

### [Entity Name]
[Key fields and their purposes]

## Relationships
[How the main entities relate to each other]

## Migrations/Schema Files
[Location of schema files if they exist]
```

**Instructions for content:**
- Only create if you can identify clear database schemas
- Focus on main entities, not every field
- Include file locations for schema definitions

## Step 6: Create DEVELOPMENT.md
Create `DEVELOPMENT.md` with setup and workflow information:

```markdown
# Development Guide

## Prerequisites
[What needs to be installed to run this project]

## Setup Instructions
[Step-by-step setup process based on available scripts and config]

## Available Scripts
[List npm scripts, make targets, or other available commands]

## Environment Configuration
[How to set up environment variables if .env files exist]

## Development Workflow
[Any apparent workflow patterns or branch strategies]

## Key Configuration Files
[List important config files and their purposes]

## Troubleshooting
[Common issues if you can infer them from the codebase]
```

## Step 7: Create .aider-repo-map
Create a specialized file for Aider called repo_map.md`:

See [sample-repo_map.md](docs/opt/sample-repo_map.md) for an example.

## Step 8: Quality Check and Validation
Before finalizing, verify:
1. All file paths mentioned in the documentation actually exist
2. The technology stack information is accurate based on package files
3. The directory structure matches the actual project structure
4. The most important files for development are clearly identified
5. Each file serves a distinct purpose without too much overlap

## Guidelines for Writing Style
- Use clear, concise language
- Include specific file paths when referencing code
- Focus on structure and organization, not implementation details
- Prioritize information that would help someone new understand the codebase quickly
- Keep each section focused and scannable
- Use consistent formatting and markdown structure

## Final Deliverable Checklist
- [ ] ARCHITECTURE.md created with complete sections
- [ ] CODEBASE_MAP.md created with file paths and descriptions
- [ ] API_REFERENCE.md created (if applicable)
- [ ] DATABASE_SCHEMA.md created (if applicable)  
- [ ] DEVELOPMENT.md created with setup instructions
- [ ] .aider-repo-map created with AI-specific guidance
- [ ] All file paths verified to exist
- [ ] Documentation is concise but comprehensive
- [ ] Focus is on structure and relationships, not implementation details

## Notes
- Skip any sections that don't apply to this specific codebase
- If certain information cannot be determined from the code, note this in the documentation
- Prioritize accuracy over completeness
- These files should help an AI assistant understand the codebase without needing to load all source files into context
