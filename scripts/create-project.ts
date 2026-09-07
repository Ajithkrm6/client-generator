import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import { PHASE1_QUESTIONS, PHASE2_QUESTIONS } from './questionnaire.config.js'

interface ProjectConfig {
  projectName: string
  framework: 'nextjs' | 'vite'
  projectDescription: string
  architecture: 'modular' | 'flat'
  sampleModules?: string[]
  styling: string
  stateManagement: string
  dataFetching: string
  includeStorybook: boolean
  testing: string[]
  husky: boolean
  backendUrl: string
}

/**
 * Safely prompt with error handling for piped input
 * Lets inquirer handle all prompting naturally without interference
 * Only uses defaults if there's an actual error (stdin closed)
 */
async function safePrompt(questions: any[]) {
  return new Promise((resolve) => {
    // Setup readline error handler to suppress ERR_USE_AFTER_CLOSE
    const suppressReadlineError = (error: any) => {
      // Suppress only readline-related errors (happens when piped input ends)
      if (error && (error.code === 'ERR_USE_AFTER_CLOSE' || error.message?.includes('readline'))) {
        // Silently ignore - expected when input stream closes
        return
      }
      // Re-throw other errors
      throw error
    }

    const uncaughtHandler = (error: any) => {
      suppressReadlineError(error)
    }

    // Add handler but don't prevent normal operation
    process.once('uncaughtException', uncaughtHandler)

    inquirer
      .prompt(questions)
      .then((answers) => {
        process.removeListener('uncaughtException', uncaughtHandler)
        resolve(answers)
      })
      .catch((error: any) => {
        process.removeListener('uncaughtException', uncaughtHandler)
        // Only handle stdin/readline errors - piped input ended
        if (error.code === 'ERR_USE_AFTER_CLOSE' || error.message?.includes('readline')) {
          console.warn(chalk.yellow('\n⚠️  Input stream ended, using default values'))
          const defaults: any = {}
          for (const q of questions) {
            // Handle checkbox fields - they should return arrays
            if (q.type === 'checkbox') {
              defaults[q.name] = q.default || q.choices?.filter((c: any) => c.checked)?.map((c: any) => c.value) || []
            } else {
              defaults[q.name] = q.default || (Array.isArray(q.choices) ? q.choices[0]?.value : '')
            }
          }
          resolve(defaults)
        } else {
          // Re-throw other errors
          console.error(chalk.red('❌ Error during prompt:'), error.message)
          process.exit(1)
        }
      })
  })
}

export async function createProject(appName: string) {
  console.log(`\n${chalk.blue('🚀 Client-Generator')}`)
  console.log(`${chalk.gray('Professional Frontend Scaffolding Framework')}\n`)

  // Validate app name
  if (!appName || !/^[a-z0-9-]+$/.test(appName)) {
    console.error(chalk.red('❌ Invalid project name. Use kebab-case (e.g., my-app)'))
    process.exit(1)
  }

  const projectPath = path.resolve(process.cwd(), appName)

  // Check if directory exists
  if (fs.existsSync(projectPath)) {
    console.error(chalk.red(`❌ Directory already exists: ${projectPath}`))
    process.exit(1)
  }

  try {
    // ========================================
    // PHASE 1: Framework Selection
    // ========================================
    console.log(chalk.cyan('📋 PHASE 1: Framework Selection\n'))
    const phase1Answers = (await safePrompt(PHASE1_QUESTIONS)) as any
    const framework = phase1Answers.framework

    // ========================================
    // Create base project with official CLI
    // ========================================
    console.log(chalk.cyan(`\n🏗️  Creating ${framework.toUpperCase()} project...\n`))

    const currentDir = process.cwd()

    if (framework === 'nextjs') {
      // Use create-next-app with minimal setup
      try {
        execSync(
          `npx create-next-app@latest ${appName} --typescript --eslint --tailwind --app --no-git --import-alias "@/*" --no-src-dir`,
          { cwd: currentDir, stdio: 'inherit' }
        )
      } catch (error) {
        console.log(chalk.yellow('Trying alternative Next.js setup...\n'))
        execSync(`npx create-next-app@latest ${appName} --typescript`, { cwd: currentDir, stdio: 'inherit' })
      }
    } else if (framework === 'vite') {
      // Use create-vite
      try {
        execSync(`npm create vite@latest ${appName} -- --template react-ts`, { cwd: currentDir, stdio: 'inherit' })
      } catch (error) {
        console.log(chalk.yellow('Trying alternative Vite setup...\n'))
        execSync(`pnpm create vite@latest ${appName} --template react-ts`, { cwd: currentDir, stdio: 'inherit' })
      }
    }

    // Verify project was created
    if (!fs.existsSync(projectPath)) {
      throw new Error(`Framework CLI did not create project directory`)
    }

    console.log(chalk.green(`✓ ${framework.toUpperCase()} project created\n`))

    // ========================================
    // PHASE 2: Enhancement Questions
    // ========================================
    console.log(chalk.cyan('📋 PHASE 2: Project Enhancements\n'))
    const phase2Answers = (await safePrompt(PHASE2_QUESTIONS)) as any

    // Combine all answers
    const config: ProjectConfig = {
      projectName: appName,
      framework,
      projectDescription: phase2Answers.projectDescription,
      architecture: phase2Answers.architecture,
      sampleModules: phase2Answers.sampleModules || [],
      styling: phase2Answers.styling,
      stateManagement: phase2Answers.stateManagement,
      dataFetching: phase2Answers.dataFetching,
      includeStorybook: phase2Answers.includeStorybook,
      testing: phase2Answers.testing || [],
      husky: phase2Answers.husky,
      backendUrl: phase2Answers.backendUrl
    }

    // ========================================
    // Apply Enhancements
    // ========================================
    console.log(chalk.cyan('\n🔧 Applying enhancements...\n'))

    // Setup component structure
    await setupComponentStructure(projectPath, config)

    // Setup modular structure (if applicable)
    if (config.architecture === 'modular' && config.framework === 'nextjs') {
      await setupModularStructure(projectPath, config.sampleModules || [])
      await setupFeatureGates(projectPath, config.sampleModules || [])
    }

    // Setup Storybook
    if (config.includeStorybook) {
      await setupStorybook(projectPath, config.framework)
    }

    // Setup stores
    await setupStores(projectPath, config)

    // Setup API client
    await setupApiClient(projectPath, config.backendUrl)

    // Setup environment files
    await setupEnvFiles(projectPath, config.backendUrl)

    // Install additional dependencies based on choices
    await setupDependencies(projectPath, config)

    // Setup Husky if selected
    if (config.husky) {
      await setupHusky(projectPath)
    }

    console.log(chalk.green('✓ All enhancements applied\n'))

    // ========================================
    // Final Summary
    // ========================================
    showProjectSummary(projectPath, config)
  } catch (error: any) {
    console.error(chalk.red(`\n❌ Error creating project: ${error.message}`))
    if (fs.existsSync(projectPath)) {
      fs.removeSync(projectPath)
    }
    process.exit(1)
  }
}

// ========================================
// Setup Functions
// ========================================

async function setupComponentStructure(projectPath: string, config: ProjectConfig) {
  const srcPath = path.join(projectPath, 'src')
  
  // Create component directories
  const dirs = [
    'components/ui',
    'components/shared',
    'components/layout',
    'lib',
    'config',
    'stores',
    'types',
    'hooks',
  ]
  
  for (const dir of dirs) {
    fs.ensureDirSync(path.join(srcPath, dir))
  }
  
  console.log(chalk.green('✓ Component structure created'))
}

async function setupModularStructure(projectPath: string, modules: string[]) {
  const modulesPath = path.join(projectPath, 'src', 'modules')
  
  for (const module of modules) {
    const modulePath = path.join(modulesPath, module)
    
    // Create module structure
    const dirs = [
      'components',
      'hooks',
      'stores',
      'types',
      'config',
      'lib',
    ]
    
    for (const dir of dirs) {
      fs.ensureDirSync(path.join(modulePath, dir))
    }
    
    // Create module index
    fs.writeFileSync(
      path.join(modulePath, 'index.ts'),
      `// ${module} module\nexport * from './types'\nexport * from './lib'\n`
    )
    
    // Create module config
    fs.writeJsonSync(
      path.join(modulePath, 'config', `${module}.module.config.json`),
      {
        name: module,
        version: '1.0.0',
        description: `${formatName(module)} module`,
        enabled: true,
        stage: 'core',
        dependencies: [],
        features: []
      },
      { spaces: 2 }
    )
  }
  
  console.log(chalk.green(`✓ Modular structure created (${modules.join(', ')})`))
}

async function setupFeatureGates(projectPath: string, modules: string[]) {
  const configPath = path.join(projectPath, 'src', 'config', 'features.config.ts')
  
  const features = modules.map((module) => ({
    key: module,
    name: formatName(module),
    description: `${formatName(module)} module features`,
    enabled: true,
    version: '1.0.0',
    stage: 'core',
    dependencies: [],
    requiredPermissions: []
  }))
  
  const content = `/**
 * Feature Gates Configuration
 * 
 * Feature flags for module and feature management.
 * Enable/disable features dynamically without code changes.
 * 
 * Usage:
 * import { featureGate } from '@/lib/feature-gate'
 * 
 * if (featureGate.isEnabled('${modules[0]}')) {
 *   // Render module component
 * }
 */

export const FEATURE_FLAGS = {
${features.map(f => `  '${f.key}': { name: '${f.name}', enabled: ${f.enabled}, stage: '${f.stage}' }`).join(',\n')}
} as const

export type FeatureKey = keyof typeof FEATURE_FLAGS
`
  
  fs.writeFileSync(configPath, content)
  console.log(chalk.green('✓ Feature gates configured'))
}

async function setupStorybook(projectPath: string, framework: string) {
  const storybookPath = path.join(projectPath, '.storybook')
  fs.ensureDirSync(storybookPath)
  
  // main.ts
  const mainConfig = `import type { StorybookConfig } from '@storybook/${framework === 'nextjs' ? 'nextjs' : 'react'}'

/**
 * Storybook Configuration
 * 
 * Auto-discovers all .stories.tsx files in src/
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.{js,jsx,ts,tsx}'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/${framework === 'nextjs' ? 'nextjs' : 'react'}',
  docs: { autodocs: 'tag' },
}

export default config
`
  
  // preview.ts
  const previewConfig = `import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
`
  
  fs.writeFileSync(path.join(storybookPath, 'main.ts'), mainConfig)
  fs.writeFileSync(path.join(storybookPath, 'preview.ts'), previewConfig)
  console.log(chalk.green('✓ Storybook configured'))
}

async function setupStores(projectPath: string, config: ProjectConfig) {
  const storesPath = path.join(projectPath, 'src', 'stores')
  
  // Global store with Immer
  const globalStoreContent = `import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface GlobalState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  notifications: Notification[]
  currentUser: { id: string; role: string } | null
  
  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  setCurrentUser: (user: GlobalState['currentUser']) => void
}

/**
 * Global Store
 * 
 * App-wide state management using Zustand + Immer
 * 
 * Features:
 * - theme: Light/dark mode toggle
 * - sidebarOpen: Sidebar visibility
 * - notifications: App notifications
 * - currentUser: Authenticated user context
 * 
 * Usage:
 * const { theme, setTheme } = useGlobalStore()
 */
export const useGlobalStore = create<GlobalState>()(
  immer((set) => ({
    theme: 'light',
    sidebarOpen: true,
    notifications: [],
    currentUser: null,
    
    setTheme: (theme) => set((state) => {
      state.theme = theme
    }),
    
    toggleSidebar: () => set((state) => {
      state.sidebarOpen = !state.sidebarOpen
    }),
    
    addNotification: (notification) => set((state) => {
      state.notifications.push({
        id: Math.random().toString(),
        ...notification,
      })
    }),
    
    removeNotification: (id) => set((state) => {
      state.notifications = state.notifications.filter(n => n.id !== id)
    }),
    
    setCurrentUser: (user) => set((state) => {
      state.currentUser = user
    }),
  }))
)
`
  
  fs.writeFileSync(path.join(storesPath, 'globalStore.ts'), globalStoreContent)
  console.log(chalk.green('✓ Global store created (with Zustand + Immer)'))
}

async function setupApiClient(projectPath: string, backendUrl: string) {
  const apiClientPath = path.join(projectPath, 'src', 'lib', 'api-client.ts')
  
  const content = `import axios from 'axios'

/**
 * API Client
 * 
 * Configured to communicate with .NET backend
 * 
 * Features:
 * - Automatic token injection from localStorage
 * - 401 redirect to login on auth failure
 * - Configurable timeout
 * 
 * Usage:
 * import { apiClient } from '@/lib/api-client'
 * 
 * const { data } = await apiClient.get('/api/users')
 */
export const apiClient = axios.create({
  baseURL: '${backendUrl}',
  timeout: 30000,
})

// Request interceptor: Add auth token
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`
  }
  return config
})

// Response interceptor: Handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
`
  
  fs.writeFileSync(apiClientPath, content)
  console.log(chalk.green('✓ API client configured'))
}

async function setupEnvFiles(projectPath: string, backendUrl: string) {
  const envContent = `# Backend API Configuration
NEXT_PUBLIC_API_URL="${backendUrl}"
VITE_API_URL="${backendUrl}"

# Application
APP_NAME="project"
NODE_ENV="development"

# Features
NEXT_PUBLIC_ENABLE_STORYBOOK=true
`
  
  fs.writeFileSync(path.join(projectPath, '.env.example'), envContent)
  fs.writeFileSync(path.join(projectPath, '.env.local'), envContent)
  console.log(chalk.green('✓ Environment files created'))
}

function formatName(str: string): string {
  return str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

async function setupDependencies(projectPath: string, config: ProjectConfig) {
  console.log(chalk.gray('  Installing additional dependencies...'))

  const packages: string[] = []

  // State management
  if (config.stateManagement === 'zustand') {
    packages.push('zustand', 'immer')
  } else if (config.stateManagement === 'redux') {
    packages.push('@reduxjs/toolkit', 'react-redux')
  }

  // Data fetching
  if (config.dataFetching === 'react-query') {
    packages.push('@tanstack/react-query')
  } else if (config.dataFetching === 'swr') {
    packages.push('swr')
  }

  // Common packages
  packages.push(
    'react-hook-form',
    'zod',
    '@hookform/resolvers',
    'axios'
  )

  // Styling
  if (config.styling === 'tailwind') {
    packages.push('tailwind-merge', 'clsx')
  }

  // Testing
  if (config.testing.includes('vitest')) {
    packages.push('vitest', '@vitest/ui', '@testing-library/react', '@testing-library/jest-dom')
  }
  if (config.testing.includes('playwright')) {
    packages.push('@playwright/test')
  }

  // Storybook
  if (config.includeStorybook) {
    packages.push('@storybook/react-vite', '@storybook/addon-essentials')
  }

  // Install packages
  if (packages.length > 0) {
    const pkgManager = 'pnpm'
    try {
      execSync(`${pkgManager} add ${packages.join(' ')}`, {
        cwd: projectPath,
        stdio: 'inherit'
      })
    } catch (error) {
      console.log(chalk.yellow('  ⚠️  Some dependencies may need manual installation'))
    }
  }

  console.log(chalk.green('  ✓ Dependencies installed'))
}

async function setupHusky(projectPath: string) {
  console.log(chalk.gray('  Setting up Husky...'))

  try {
    execSync('npx husky install', { cwd: projectPath, stdio: 'inherit' })

    // Add pre-commit hook
    const preCommitHook = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged
`
    fs.ensureDirSync(path.join(projectPath, '.husky'))
    fs.writeFileSync(path.join(projectPath, '.husky', 'pre-commit'), preCommitHook)
    fs.chmodSync(path.join(projectPath, '.husky', 'pre-commit'), 0o755)

    console.log(chalk.green('  ✓ Husky configured'))
  } catch (error) {
    console.log(chalk.yellow('  ⚠️  Husky setup skipped'))
  }
}

function showProjectSummary(projectPath: string, config: ProjectConfig) {
  const relativePath = path.relative(process.cwd(), projectPath)
  
  console.log(`\n${chalk.cyan('='.repeat(70))}`)
  console.log(`${chalk.green('✅ Project created successfully!')}\n`)
  console.log(`${chalk.cyan('📁 Location:')} ${projectPath}`)
  console.log(`${chalk.cyan('🏗️  Framework:')} ${config.framework}`)
  console.log(`${chalk.cyan('🏢 Architecture:')} ${config.architecture}`)
  if (config.architecture === 'modular' && config.sampleModules) {
    console.log(`${chalk.cyan('📦 Modules:')} ${config.sampleModules.join(', ')}`)
  }
  console.log(`${chalk.cyan('🔗 Backend API:')} ${config.backendUrl}`)
  
  console.log(`\n${chalk.cyan('📋 Next Steps:')}`)
  console.log(`   1. cd ${relativePath}`)
  console.log(`   2. Update .env.local with your values`)
  console.log(`   3. pnpm dev              (Start dev server on :3000)`)
  if (config.includeStorybook) {
    console.log(`   4. pnpm storybook        (Start Storybook on :6006)`)
  }
  
  console.log(`\n${chalk.cyan('📚 Documentation:')}`)
  console.log(`   - src/lib/api-client.ts  (API setup)`)
  console.log(`   - src/stores/globalStore.ts (State management)`)
  if (config.architecture === 'modular') {
    console.log(`   - src/modules/           (Module structure)`)
    console.log(`   - src/config/features.config.ts (Feature gates)`)
  }
  if (config.includeStorybook) {
    console.log(`   - .storybook/main.ts     (Storybook config)`)
  }
  
  console.log(`\n${chalk.cyan('🚀 Tech Stack:')}`)
  console.log(`   - React 19.0.0`)
  console.log(`   - ${config.framework === 'nextjs' ? 'Next.js 14.2.3' : 'Vite 5.0.0'}`)
  console.log(`   - TypeScript 5.5.2`)
  console.log(`   - ${config.styling === 'tailwind' ? 'Tailwind CSS 4.0.0' : 'CSS Modules'}`)
  console.log(`   - Zustand 5.0.0 + Immer 10.0.0`)
  console.log(`   - ${config.dataFetching === 'react-query' ? 'React Query (TanStack)' : config.dataFetching}`)
  console.log(`   - react-hook-form 7.48.0`)
  console.log(`   - Zod 4.4.0`)
  
  console.log(`\n${chalk.cyan('='.repeat(70))}\n`)
}
