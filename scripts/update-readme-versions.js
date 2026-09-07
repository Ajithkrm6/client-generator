#!/usr/bin/env node

/**
 * Auto-generates version information in README.md from dependencies.config.ts
 * Ensures README always shows the actual versions being used
 * Run before building or publishing
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read dependencies.config.ts
const configPath = path.join(__dirname, 'dependencies.config.ts')
const configContent = fs.readFileSync(configPath, 'utf-8')

// Extract DEPENDENCIES object using regex
const dependenciesMatch = configContent.match(/export const DEPENDENCIES = ({[\s\S]*?^}\s*$)/m)
if (!dependenciesMatch) {
  console.error('❌ Could not parse dependencies.config.ts')
  process.exit(1)
}

// Simple extraction function for version strings
function extractVersion(content, packageName) {
  const regex = new RegExp(`['"]${packageName}['"]\\s*:\\s*['"]([^'"]+)['"]`)
  const match = content.match(regex)
  return match ? match[1] : 'unknown'
}

// Get versions
const versions = {
  nextjs: extractVersion(configContent, 'next'),
  vite: extractVersion(configContent, 'vite'),
  react: extractVersion(configContent, 'react'),
  typescript: extractVersion(configContent, 'typescript'),
  zustand: extractVersion(configContent, 'zustand'),
  immer: extractVersion(configContent, 'immer'),
  'react-query': extractVersion(configContent, '@tanstack/react-query'),
  'react-hook-form': extractVersion(configContent, 'react-hook-form'),
  zod: extractVersion(configContent, 'zod'),
  tailwind: extractVersion(configContent, 'tailwindcss'),
  axios: extractVersion(configContent, 'axios'),
  storybook: extractVersion(configContent, '@storybook/react'),
  husky: 'latest',
  'lint-staged': 'latest',
  pnpm: '9.0.0+'
}

// Generate Tech Stack section
const techStackSection = `## 🛠️ Tech Stack

### Core Frameworks
- **Next.js ${versions.nextjs}** - Full-stack React framework with App Router
- **Vite ${versions.vite}** - Lightning-fast SPA bundler
- **React ${versions.react}** - Modern UI library with server components

### Language & Type Safety
- **TypeScript ${versions.typescript}** - Strict mode, 0 \`any\` types
- **ESLint + Prettier** - Code quality & formatting

### State Management
- **Zustand ${versions.zustand}** - Lightweight, intuitive global state
- **Immer ${versions.immer}** - Immutable state updates
- **React Query ${versions['react-query']}** - Server state management with automatic caching

### Forms & Validation
- **react-hook-form ${versions['react-hook-form']}** - Performant form state management
- **Zod ${versions.zod}** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration layer

### API & HTTP
- **Axios ${versions.axios}** - HTTP client with interceptors
- **JWT Token Management** - Automatic localStorage token injection
- **401 Redirect** - Automatic login redirect on auth failure

### UI & Styling
- **Tailwind CSS ${versions.tailwind}** - Utility-first CSS framework
- **shadcn/ui** - 18+ pre-built accessible components
- **Storybook ${versions.storybook}** - Component documentation & visual regression

### Testing
- **Vitest** - Unit & component testing
- **Playwright** - End-to-end testing
- **@testing-library/react** - Testing utilities

### Developer Experience
- **Husky** - Git pre-commit hooks
- **lint-staged** - Run linters on staged files
- **pnpm ${versions.pnpm}** - Fast, space-efficient package manager

---

⚠️ **Version Note:** The versions listed in the Tech Stack section above are **reference versions used by Client-Generator**. When generating a project:
- **Framework versions** (Next.js, Vite) will be the **latest available** at generation time since we use \`create-next-app@latest\` and \`create-vite@latest\`
- **Other package versions** follow the specifications in \`scripts/dependencies.config.ts\`
- **Check your generated project's \`package.json\`** to see actual installed versions

**Why?** Using \`@latest\` ensures:
- ✅ Latest security patches are always included
- ✅ Latest bug fixes are available
- ✅ Projects are built on current, stable versions
- ⚠️ Your versions may differ slightly from documentation (this is expected and healthy)`

// Read README.md
const readmePath = path.join(__dirname, '..', 'README.md')
const readmeContent = fs.readFileSync(readmePath, 'utf-8')

// Find and replace the Tech Stack section
// Match from "## 🛠️ Tech Stack" all the way to the next "## " section
// This includes all the version notes that follow
const techStackRegex = /## 🛠️ Tech Stack[\s\S]*?(?=\n## [^#])/

if (!readmeContent.match(techStackRegex)) {
  console.error('❌ Could not find Tech Stack section in README.md')
  process.exit(1)
}

const updatedReadme = readmeContent.replace(
  techStackRegex,
  techStackSection + '\n'
)

// Write updated README
fs.writeFileSync(readmePath, updatedReadme, 'utf-8')

console.log('✅ README.md updated with latest versions from dependencies.config.ts')
console.log('\n📦 Versions used:')
console.log(`  Next.js: ${versions.nextjs}`)
console.log(`  Vite: ${versions.vite}`)
console.log(`  React: ${versions.react}`)
console.log(`  TypeScript: ${versions.typescript}`)
console.log(`  Zustand: ${versions.zustand}`)
console.log(`  Tailwind CSS: ${versions.tailwind}`)
