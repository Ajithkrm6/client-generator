# Development Guide

## Overview

Client-Generator is a scaffolding tool that creates well-structured Next.js and Vite projects with professional development patterns.

## Architecture

### Directory Structure

```
client-generator/
├── bin/
│   └── cli.js                  # CLI entry point
├── scripts/
│   ├── create-project.ts       # Main project creation logic
│   ├── questionnaire.config.ts # Interactive questions
│   └── dependencies.config.ts  # Framework-specific dependencies
├── templates/
│   ├── nextjs/                 # Next.js template
│   └── vite/                   # Vite template
├── dist/                       # Compiled JavaScript (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

### Key Files

#### `bin/cli.js`
- Entry point for the CLI tool
- Parses command-line arguments
- Calls `createProject(appName)`

#### `scripts/create-project.ts`
- Main orchestrator for project creation
- Copies template
- Sets up directory structure
- Configures dependencies
- Generates sample files

#### `scripts/questionnaire.config.ts`
- Interactive questions asked to user
- Determines project configuration
- Framework, architecture, dependencies, etc.

#### `scripts/dependencies.config.ts`
- Framework-specific package versions
- Shared dependencies for both frameworks
- Ensures consistency across projects

### How It Works

1. **CLI Called**: `pnpm create client-generator my-app`
2. **Questions Asked**: Interactive questionnaire
3. **Project Initialized**:
   - Directory created
   - Template copied
   - Structure set up
   - Stores created
   - API client configured
   - Environment files generated
4. **Dependencies Installed**: `pnpm install`
5. **Project Ready**: Developer can start coding

## Development Workflow

### Setup

```bash
cd client-generator
pnpm install
pnpm run build
```

### Make Changes

1. Edit TypeScript files in `scripts/` or `bin/`
2. Test changes before committing
3. Rebuild: `pnpm run build`

### Testing

#### Manual Testing

```bash
# Test CLI
node dist/bin/cli.js test-app

# Then follow the prompts
```

#### Automated Testing (Future)

```bash
# When tests are added
pnpm test
```

### Build

```bash
# Compile TypeScript
pnpm run build

# Output goes to dist/
```

## Key Features to Maintain

### 1. Questionnaire
- Must be interactive and clear
- All questions should have sensible defaults
- Advanced users should be able to proceed quickly

### 2. Template Compatibility
- Same output for Next.js and Vite
- Unified component structure
- Framework-specific configs handled automatically

### 3. Store Configuration
- Global store + per-module stores
- Zustand + Immer integration
- Automatic store creation

### 4. API Integration
- Axios client pre-configured
- Auth token handling
- .NET backend URL configurable

### 5. Component System
- Tailwind CSS + shadcn/ui
- Storybook auto-discovery
- react-hook-form + Zod

## Adding New Features

### Add a New Question

Edit `scripts/questionnaire.config.ts`:

```typescript
{
  type: 'confirm',
  name: 'myFeature',
  message: 'Include my feature?',
  default: false
}
```

Then handle in `create-project.ts`:

```typescript
if (config.myFeature) {
  // Setup feature
}
```

### Add Framework Support

1. Create `templates/newframework/` directory
2. Add template files
3. Update questionnaire to include new framework
4. Add framework-specific config in `dependencies.config.ts`
5. Handle in `create-project.ts`

### Modify Template

1. Update files in `templates/nextjs/` or `templates/vite/`
2. They're copied verbatim to generated projects
3. Changes affect all newly created projects

### Update Dependencies

Edit `scripts/dependencies.config.ts`:

```typescript
export const DEPENDENCIES = {
  shared: {
    'new-package': '1.0.0'  // Add here
  }
}
```

## Code Style

### TypeScript
- Strict mode enabled
- No `any` types
- Full type coverage

### Naming
- camelCase for variables/functions
- PascalCase for types/interfaces
- kebab-case for file names (when applicable)

### Comments
- JSDoc for functions
- Explain the "why", not the "what"
- Keep comments up-to-date with code

## Common Tasks

### Generate a Test Project

```bash
# Test CLI
node dist/bin/cli.js test-app

# Or if globally installed
client-generator my-test-app
```

### Update Package Version

1. Edit `package.json` version
2. Commit changes
3. Tag release: `git tag v1.1.0`
4. Push tags: `git push origin --tags`
5. Publish: `npm publish`

### Test in Different Environment

```bash
# Test in temporary directory
cd /tmp
pnpm create /path/to/client-generator my-test-app
```

## Publishing

### For Private Npm Registry

```bash
# Update package.json with registry
pnpm publish --registry https://your-registry
```

### For Public Npm

```bash
# Must be logged in
npm login

# Publish
npm publish

# Or with pnpm
pnpm publish
```

## Troubleshooting

### TypeScript Errors

```bash
pnpm run build
# Check dist/ for compilation errors
```

### CLI Not Found

Make sure:
1. `pnpm run build` completed successfully
2. `dist/bin/cli.js` exists
3. `bin/cli.js` has correct shebang: `#!/usr/bin/env node`

### Template Issues

Check that template files exist in:
- `templates/nextjs/`
- `templates/vite/`

### Dependency Resolution

Verify in `scripts/dependencies.config.ts`:
- All packages specified with exact versions
- No conflicts between framework versions

## Next Steps

- [ ] Add automated tests
- [ ] Add E2E tests for project generation
- [ ] Create module generator (`create-module` command)
- [ ] Add configuration migration tool
- [ ] Create plugin system
- [ ] Add analytics/telemetry
- [ ] Create VS Code extension
