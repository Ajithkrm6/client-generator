// ========================================
// PHASE 1: Framework Selection Only
// ========================================
export const PHASE1_QUESTIONS = [
  {
    type: 'list',
    name: 'framework',
    message: 'Which framework?',
    choices: [
      { name: 'Next.js (recommended, full-stack, SSR)', value: 'nextjs' },
      { name: 'Vite + React (lightweight SPA)', value: 'vite' }
    ],
    default: 'nextjs'
  }
]

// ========================================
// PHASE 2: Enhancement Questions
// ========================================
export const PHASE2_QUESTIONS = [
  // === PROJECT BASICS ===
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Project description?',
    default: 'Frontend application'
  },

  // === ARCHITECTURE ===
  {
    type: 'list',
    name: 'architecture',
    message: 'Project structure?',
    choices: [
      { name: 'Modular Monolithic (features as modules)', value: 'modular' },
      { name: 'Flat (simple structure)', value: 'flat' }
    ],
    default: 'modular'
  },

  {
    type: 'checkbox',
    name: 'sampleModules',
    message: 'Sample modules to include?',
    when: (answers: any) => answers.architecture === 'modular',
    choices: [
      { name: 'Auth Module (login, signup)', value: 'auth', checked: true },
      { name: 'Profile Module (user profile)', value: 'profile', checked: true },
      { name: 'Dashboard Module (overview)', value: 'dashboard', checked: false },
      { name: 'Documents Module (file management)', value: 'documents', checked: false }
    ]
  },

  // === STYLING ===
  {
    type: 'list',
    name: 'styling',
    message: 'Styling approach?',
    choices: [
      { name: 'Tailwind CSS (utility-first)', value: 'tailwind' },
      { name: 'CSS Modules (scoped styles)', value: 'css-modules' }
    ],
    default: 'tailwind'
  },

  // === UI COMPONENTS ===
  {
    type: 'confirm',
    name: 'useShadcnUI',
    message: 'Use shadcn/ui component library? (includes pre-built accessible components)',
    when: (answers: any) => answers.styling === 'tailwind',
    default: true
  },

  // === STATE MANAGEMENT ===
  {
    type: 'list',
    name: 'stateManagement',
    message: 'Client state management?',
    choices: [
      { name: 'Zustand + Immer (lightweight, recommended)', value: 'zustand' },
      { name: 'Redux + Toolkit', value: 'redux' },
      { name: 'React Context only', value: 'context' }
    ],
    default: 'zustand'
  },

  // === DATA FETCHING ===
  {
    type: 'list',
    name: 'dataFetching',
    message: 'Data fetching library?',
    choices: [
      { name: 'React Query (TanStack) (recommended)', value: 'react-query' },
      { name: 'SWR', value: 'swr' },
      { name: 'Axios only (manual)', value: 'axios' }
    ],
    default: 'react-query'
  },

  // === STORYBOOK ===
  {
    type: 'confirm',
    name: 'includeStorybook',
    message: 'Include Storybook for component development?',
    default: true
  },

  // === TESTING ===
  {
    type: 'checkbox',
    name: 'testing',
    message: 'Testing setup?',
    choices: [
      { name: 'Unit/Component Testing (Vitest)', value: 'vitest', checked: true },
      { name: 'E2E Testing (Playwright)', value: 'playwright', checked: false }
    ]
  },

  // === QUALITY GATES ===
  {
    type: 'confirm',
    name: 'husky',
    message: 'Include pre-commit hooks (Husky)?',
    default: true
  },

  // === BACKEND CONFIG ===
  {
    type: 'input',
    name: 'backendUrl',
    message: '.NET Backend API URL (e.g., http://localhost:5000)?',
    default: 'http://localhost:5000'
  }
]

// Legacy export for backward compatibility
export const QUESTIONS = PHASE1_QUESTIONS
