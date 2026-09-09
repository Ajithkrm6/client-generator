#!/usr/bin/env node

/**
 * Manual Test Setup Script
 * Creates test projects with all templates pre-copied
 * Faster than trying to use the CLI with piped input
 */

import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const testDir = 'C:\\MYSpace\\projects\\client-gen-test'
const templateBaseDir = 'C:\\MYSpace\\projects\\BS-Frontend-Generator\\templates\\nextjs'

async function setup() {
  console.log('\n🚀 Setting up test projects...\n')

  // Test 1: Next.js with shadcn/ui
  await setupTestProject('test-1-shadcn', 'shadcn')
  
  // Test 2: Next.js with Tailwind only
  await setupTestProject('test-2-tailwind', 'tailwind')

  console.log('\n✅ All test projects set up! Ready to test.\n')
}

async function setupTestProject(projectName, layoutVariant) {
  const projectPath = path.join(testDir, projectName)
  
  console.log(`\n📦 Setting up ${projectName} (${layoutVariant} variant)...`)
  
  // Create basic Next.js structure
  if (!fs.existsSync(projectPath)) {
    fs.ensureDirSync(projectPath)
  }

  // Create directories
  const dirs = [
    'app',
    'src',
    'src/components',
    'src/components/ui',
    'src/components/shared',
    'src/components/layout',
    'src/lib',
    'src/modules',
    'public'
  ]

  dirs.forEach(dir => {
    fs.ensureDirSync(path.join(projectPath, dir))
  })

  // Copy layout components (variant-specific)
  const layoutTemplateDir = path.join(templateBaseDir, 'components', 'layout', layoutVariant)
  const layoutDestDir = path.join(projectPath, 'src', 'components', 'layout')
  
  if (fs.existsSync(layoutTemplateDir)) {
    fs.copySync(layoutTemplateDir, layoutDestDir, { overwrite: true })
    console.log(`  ✓ Layout components (${layoutVariant} variant) copied`)
  }

  // Copy welcome page
  const pageTemplate = path.join(templateBaseDir, 'app', 'page.tsx')
  if (fs.existsSync(pageTemplate)) {
    fs.copySync(pageTemplate, path.join(projectPath, 'app', 'page.tsx'), { overwrite: true })
    console.log(`  ✓ Welcome page copied`)
  }

  // Copy dashboard page
  const dashboardTemplate = path.join(templateBaseDir, 'app', 'dashboard')
  if (fs.existsSync(dashboardTemplate)) {
    fs.ensureDirSync(path.join(projectPath, 'app', 'dashboard'))
    fs.copySync(dashboardTemplate, path.join(projectPath, 'app', 'dashboard'), { overwrite: true })
    console.log(`  ✓ Dashboard page copied`)
  }

  // Copy feature-gate
  const featureGateTemplate = path.join(templateBaseDir, 'src', 'lib', 'feature-gate.tsx')
  if (fs.existsSync(featureGateTemplate)) {
    fs.copySync(featureGateTemplate, path.join(projectPath, 'src', 'lib', 'feature-gate.tsx'), { overwrite: true })
    console.log(`  ✓ Feature gate utility copied`)
  }

  // Copy auth module
  const authModuleTemplate = path.join(templateBaseDir, 'src', 'modules', 'auth')
  if (fs.existsSync(authModuleTemplate)) {
    fs.ensureDirSync(path.join(projectPath, 'src', 'modules', 'auth'))
    fs.copySync(authModuleTemplate, path.join(projectPath, 'src', 'modules', 'auth'), { overwrite: true })
    console.log(`  ✓ Auth module copied`)
  }

  // Copy auth pages
  const authPagesTemplate = path.join(templateBaseDir, 'app', 'auth')
  if (fs.existsSync(authPagesTemplate)) {
    fs.ensureDirSync(path.join(projectPath, 'app', 'auth'))
    fs.copySync(authPagesTemplate, path.join(projectPath, 'app', 'auth'), { overwrite: true })
    console.log(`  ✓ Auth pages copied`)
  }

  // Copy dashboard module
  const dashboardModuleTemplate = path.join(templateBaseDir, 'src', 'modules', 'dashboard')
  if (fs.existsSync(dashboardModuleTemplate)) {
    fs.ensureDirSync(path.join(projectPath, 'src', 'modules', 'dashboard'))
    fs.copySync(dashboardModuleTemplate, path.join(projectPath, 'src', 'modules', 'dashboard'), { overwrite: true })
    console.log(`  ✓ Dashboard module copied`)
  }

  // Create essential config files
  createPackageJson(projectPath, projectName)
  createNextConfig(projectPath)
  createTailwindConfig(projectPath)
  createTsConfig(projectPath)
  createGitignore(projectPath)

  console.log(`  ✓ Configuration files created`)
  console.log(`  ✓ ${projectName} ready for testing`)
}

function createPackageJson(projectPath, projectName) {
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: `Test project - ${projectName}`,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint'
    },
    dependencies: {
      react: '^19.2.8',
      'react-dom': '^19.2.8',
      next: '^16.3.4',
      'zustand': '^5.0.15',
      'immer': '^11.1.18',
      'react-hook-form': '^7.87.0',
      '@tanstack/react-query': '^5.102.8',
      '@hookform/resolvers': '^3.4.2',
      'zod': '^4.5.4',
      'clsx': '^2.1.1',
      'tailwind-merge': '^2.6.0',
      'class-variance-authority': '^0.7.1',
      'lucide-react': '^0.408.0'
    },
    devDependencies: {
      '@types/node': 'latest',
      '@types/react': 'latest',
      '@types/react-dom': 'latest',
      typescript: '7.0.2',
      tailwindcss: '4.3.3',
      autoprefixer: '^10.4.20',
      postcss: '^8.4.47'
    }
  }

  fs.writeJsonSync(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 })
}

function createNextConfig(projectPath) {
  const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false
  }
}

module.exports = nextConfig
`
  fs.writeFileSync(path.join(projectPath, 'next.config.ts'), config)
}

function createTailwindConfig(projectPath) {
  const config = `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
export default config
`
  fs.writeFileSync(path.join(projectPath, 'tailwind.config.ts'), config)
}

function createTsConfig(projectPath) {
  const config = {
    compilerOptions: {
      target: 'ES2020',
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      jsx: 'react-jsx',
      module: 'ESNext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      allowJs: true,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      isolatedModules: true,
      noEmit: true,
      incremental: true,
      paths: {
        '@/*': ['./src/*']
      }
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
    exclude: ['node_modules']
  }
  fs.writeJsonSync(path.join(projectPath, 'tsconfig.json'), config, { spaces: 2 })
}

function createGitignore(projectPath) {
  const content = `node_modules/
.next/
dist/
build/
*.log
.DS_Store
.env.local
.env.*.local
`
  fs.writeFileSync(path.join(projectPath, '.gitignore'), content)
}

setup().catch(err => {
  console.error('❌ Setup failed:', err.message)
  process.exit(1)
})
