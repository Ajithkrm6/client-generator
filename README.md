# Client-Generator 🚀

**Welcome to Client-Generator**

**Professional Frontend Scaffolding Framework for Enterprise-Grade React Applications**

---

## 📋 Quick Info

| Item | Details |
|------|---------|
| **Version** | 1.1.0 |
| **Status** | ✅ Production Ready (Clone & Link Globally) |
| **Author** | Ajith kumar |
| **License** | MIT |
| **Repository** | [GitHub](https://github.com/Ajithkrm6/client-generator.git) |
| **Contact** | ajithkumar.tech22@gmail.com |

⚠️ **Current Setup:** Must clone repository and use `pnpm link --global .` to make command available. See [Installation](#installation---current-development-version) section below.


---

## 🛠️ Tech Stack

### Core Frameworks
- **Next.js 14.2.3** - Full-stack React framework with App Router
- **Vite 5.0.0** - Lightning-fast SPA bundler
- **React 19.0.0** - Modern UI library with server components

### Language & Type Safety
- **TypeScript 5.5.2** - Strict mode, 0 `any` types
- **ESLint + Prettier** - Code quality & formatting

### State Management
- **Zustand 5.0.0** - Lightweight, intuitive global state
- **Immer 10.0.0** - Immutable state updates
- **React Query 5.28.0** - Server state management with automatic caching

### Forms & Validation
- **react-hook-form 7.48.0** - Performant form state management
- **Zod 4.4.0** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration layer

### API & HTTP
- **Axios 1.6.0** - HTTP client with interceptors
- **JWT Token Management** - Automatic localStorage token injection
- **401 Redirect** - Automatic login redirect on auth failure

### UI & Styling
- **Tailwind CSS 4.0.0** - Utility-first CSS framework
- **shadcn/ui** - 18+ pre-built accessible components
- **Storybook 7.6.0** - Component documentation & visual regression

### Testing
- **Vitest** - Unit & component testing
- **Playwright** - End-to-end testing
- **@testing-library/react** - Testing utilities

### Developer Experience
- **Husky** - Git pre-commit hooks
- **lint-staged** - Run linters on staged files
- **pnpm 9.0.0+** - Fast, space-efficient package manager

---

⚠️ **Version Note:** The versions listed in the Tech Stack section above are **reference versions at the time of writing**. When generating a project:
- **Framework versions** (Next.js, Vite) will be the **latest available** at generation time since we use `create-next-app@latest` and `create-vite@latest`
- **Other package versions** follow the specifications in `scripts/dependencies.config.ts`
- **Check your generated project's `package.json`** to see actual installed versions

**Why?** Using `@latest` ensures:
- ✅ Latest security patches are always included
- ✅ Latest bug fixes are available
- ✅ Projects are built on current, stable versions
- ⚠️ Your versions may differ slightly from documentation (this is expected and healthy)

---

## 📖 What Is Client-Generator?

Client-Generator is an **enterprise-grade frontend scaffolding framework** that eliminates repetitive setup and boilerplate when creating new React applications. It generates production-ready projects with:

✅ **Professional Architecture** - Modular, scalable, maintainable structure  
✅ **Best Practices Built-In** - Industry standards applied automatically  
✅ **Two-Phase Generation** - Official framework setup + smart customizations  
✅ **Full Feature Parity** - Same features work on both Next.js and Vite  
✅ **Zero Configuration** - Interactive setup handles everything  
✅ **Enterprise Ready** - TypeScript strict mode, testing, CI/CD prepared  

---

## 💡 The Idea Behind It

**Problem:** Every new React project requires:
- Manual folder structure setup
- Dependency selection and installation
- Configuration of state management, API clients, forms, validation
- Storybook setup for components
- Testing infrastructure
- Pre-commit hooks
- Documentation about how everything works
- This takes **6-8 hours per project**

**Solution:** Client-Generator automates all of this in **5 minutes**. You answer 14 simple questions, and get a fully-configured, production-ready React project with:
- Chosen architecture (flat or modular)
- Proper folder structure
- All dependencies pre-installed
- API client configured for your backend
- State management ready to use
- Component documentation (Storybook)
- Testing infrastructure
- Pre-commit quality gates
- Comprehensive inline documentation

**Result:** More time coding features, less time configuring infrastructure.

---

## Features

✅ **Framework Choice** - Next.js (full-stack) or Vite (SPA)  
✅ **Modular Architecture** - Features as independent, feature-gated modules  
✅ **Component System** - Unified structure with Storybook auto-discovery  
✅ **State Management** - Zustand + Immer (global + per-module stores)  
✅ **Form Handling** - react-hook-form + Zod validation  
✅ **API Integration** - Axios client pre-configured for .NET backend  
✅ **Styling** - Tailwind CSS + shadcn/ui  
✅ **Testing** - Vitest & Playwright ready  
✅ **Component Documentation** - Storybook with auto-discovered stories  
✅ **Quality Gates** - Pre-commit hooks (Husky)  
✅ **TypeScript** - Strict mode, full type safety  

---

## ⚡ Quick Start (5 Minutes)

### 🚀 Installation - Current Development Version

Since Client-Generator is still in development, you need to **clone and link** it:

#### Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/your-org/client-generator.git
cd client-generator
```

#### Step 2: Install Dependencies

```bash
# Install all dependencies
pnpm install

# Verify installation
pnpm --version  # Should be >=9.0.0
node --version  # Should be >=18.17.0
```

#### Step 3: Build the Project

```bash
# Compile TypeScript to JavaScript
pnpm run build

# Check for any errors
# Output: ✅ Compiled successfully
```

#### Step 4: Link Globally (Make Command Available Everywhere)

```bash
# Create symlink globally so command is available from any directory
pnpm link --global .

# This makes 'client-generator' command available system-wide
```

#### Step 5: Verify Installation

```bash
# Test the command from any directory
client-generator --version
# Output: 1.0.0

# Test from a different location
cd C:\
client-generator --version
# Still works! ✅
```

---

### 📍 Current Directory Setup

**Current setup is LOCAL DEVELOPMENT only:**

```
Your Setup:
Machine A (Your Computer)
└── C:\MYSpace\projects\client-generator/
    └── pnpm link --global . ✅ Available here only
```

**Other machines (Team/Different Computers):**
```
Machine B (Another Team Member)
└── They need to clone and link too ❌
    └── Repeat steps 1-4 on their machine

Machine C (Another Computer)
└── They need to clone and link too ❌
    └── Repeat steps 1-4 on their machine
```

---

### Step 2: Create a New Project

After installation, use the command from **any directory**:

```bash
# Go to your projects folder
cd C:\MYSpace\projects

# Create a new project (works from anywhere!)
client-generator my-awesome-app

# OR use pnpm create
pnpm create client-generator my-awesome-app

# OR use npm create
npm create client-generator my-awesome-app
```

**Note:** Projects are created in your **current working directory**:
```bash
cd C:\MYSpace\projects
client-generator my-app
# Creates: C:\MYSpace\projects\my-app
```

#### Step 3: Answer Interactive Questions

The CLI will ask you **14 quick questions** (Phase 1 + Phase 2):

##### Phase 1: Framework Selection
```
? Which framework would you like to use? (Use arrow keys)
  › Next.js (Full-stack, Recommended)
    Vite (SPA, Lightweight)
```
**Why it matters:** Next.js includes server-side rendering, API routes, and automatic optimizations. Vite is lighter if you only need a SPA.

#### Phase 2: 13 Enhancement Questions
```
? Project description (briefly describe what it does)
  › My tax management and compliance application

? Architecture preference?
  › Modular (Multiple features, each isolated)
    Flat (Simple project, all features together)

? Which modules to generate? (Select with Space, confirm with Enter)
  ◉ auth
  ◉ profile
  ◉ dashboard
  ◉ documents

? Styling approach?
  › Tailwind CSS + shadcn/ui (Recommended)
    CSS Modules (Scoped, isolated styles)

? State management?
  › Zustand + Immer (Lightweight, Recommended)
    Redux Toolkit (Complex, feature-rich)
    Context API (Simple)

? Data fetching library?
  › React Query (Advanced caching, Recommended)
    SWR (Simple, lightweight)
    Axios only (Manual caching)

? Include Storybook?
  › Yes (Component documentation)
    No

? Testing framework?
  › Vitest + Playwright (Recommended)
    Jest + Cypress
    None

? Add Husky pre-commit hooks?
  › Yes (Quality gates)
    No

? Backend API URL?
  › http://localhost:5000

? Initialize git repository?
  › Yes
    No

? Install dependencies?
  › Yes
    No
```

**What happens next:**
1. ✅ Official framework CLI runs (create-next-app or create-vite)
2. ✅ Your architecture is generated (modular or flat)
3. ✅ All dependencies are installed
4. ✅ Storybook is configured
5. ✅ API client is configured for your backend URL
6. ✅ State management is initialized
7. ✅ Testing infrastructure is set up
8. ✅ Pre-commit hooks are configured
9. ✅ Project is ready to code!

### Start Developing

```bash
cd my-app

# Development server
pnpm dev

# Storybook (component development)
pnpm storybook

# Tests
pnpm test

# Build
pnpm build
```

---

## 🌐 Making It Globally Available

### Current Setup (Development Version)

Client-Generator is currently a **development project**, not yet published to npm. Here's how it works across different scenarios:

#### On Your Machine (Development)

**Quick Setup Workflow:**
```bash
# 1️⃣ Clone once
git clone https://github.com/your-org/client-generator.git
cd client-generator

# 2️⃣ Install dependencies
pnpm install

# 3️⃣ Build the project
pnpm run build

# 4️⃣ Link globally (creates symlink - this makes the command available everywhere!)
pnpm link --global .

# 5️⃣ Verify it works from any directory
cd C:\
client-generator --version
# Output: 1.1.0 ✅

# 6️⃣ Now use it from anywhere
cd C:\MYSpace\projects
client-generator my-app  # ✅ Works!
```

#### On Team/Different Machines

**Currently:** Each team member needs to do the same steps:

**Machine A (You):**
```bash
git clone https://github.com/your-org/client-generator.git
cd client-generator
pnpm install
pnpm run build
pnpm link --global .
client-generator my-app  # ✅ Works on this machine
```

**Machine B (Team Member's Computer):**
```bash
# Same steps needed
git clone https://github.com/your-org/client-generator.git
cd client-generator
pnpm install
pnpm run build
pnpm link --global .
client-generator my-app  # ✅ Works on this machine
```

**Machine C (Another Team Member):**
```bash
# Same steps needed
git clone https://github.com/your-org/client-generator.git
cd client-generator
pnpm install
pnpm run build
pnpm link --global .
client-generator my-app  # ✅ Works on this machine
```

---

### Understanding pnpm link --global

**What it does:**
```bash
pnpm link --global .
# Creates a symlink (shortcut) from global pnpm folder to your local project
# Makes 'client-generator' command available from any directory
```

**Behind the scenes:**
```
Global pnpm folder (symlink created here)
    ↓
    └─→ Points to: C:\MYSpace\projects\client-generator\dist\bin\cli.js
```

**When to use `pnpm link --global .`:**
- ✅ During development (test changes immediately)
- ✅ Local testing before publishing to npm
- ✅ Team development with shared repository
- ✅ Before publishing to npm registry

**When NOT to use:**
- ❌ Production use (publish to npm instead)
- ❌ Regular users who just want to use the tool

---

### Unlinking (When Done Developing)

```bash
# Remove the global symlink
pnpm unlink --global client-generator

# Verify it's removed
client-generator --version
# Command not found ✅ (successfully unlinked)
```

---

### Future Setup (After Publishing to npm)

Once published to **npm registry**, no cloning needed:

```bash
# Any machine, any user:
npm install -g client-generator
# OR
pnpm add -g client-generator

# Command available immediately, no cloning!
client-generator my-app  # ✅ Works everywhere

# To remove
npm uninstall -g client-generator
```

---

### Step-by-Step for Different Scenarios

#### Scenario 1: You (Developer - Want to Test Changes)
```bash
cd C:\MYSpace\projects\client-generator
pnpm link --global .         # Link once (. = current directory)
# Make changes to code...
pnpm run build               # Rebuild after changes
client-generator my-app # Test your changes
pnpm unlink --global         # Cleanup when done
```

#### Scenario 2: Team Member (Want to Use/Contribute)
```bash
# First time only
git clone https://github.com/your-org/client-generator.git
cd client-generator
pnpm install
pnpm run build
pnpm link --global .

# Now they can use it
client-generator my-app ✅

# If they pull new changes
cd client-generator
git pull
pnpm run build  # Rebuild
# Command automatically updated! ✅
```

---

## 📟 CLI Commands Reference

### Client-Generator Commands

These commands work after you've linked globally (`pnpm link --global .`):

#### Create a Project
```bash
client-generator <app-name>
```

**Example:**
```bash
client-generator tax-management-app
# Creates: tax-management-app/ in current directory
```

**Validation:**
- ✅ App name must be kebab-case (lowercase, hyphens only)
- ✅ Directory must not already exist
- ✅ Node.js >=18.17.0 and pnpm >=9.0.0 required

#### Get Version
```bash
client-generator --version
# Output: 1.1.0

# Alternative:
client-generator -v
```

#### Get Help
```bash
client-generator --help
# Shows all available options

# Alternative:
client-generator -h
```

#### Advanced Options (CLI Flags)

```bash
# Use default choices for everything (non-interactive mode)
client-generator <app-name> --defaults

# Skip dependency installation (install manually later)
client-generator <app-name> --no-install

# Don't initialize git repository
client-generator <app-name> --no-git

# Combine options
client-generator my-app --defaults --no-install
```

---

## 📁 Generated Project Structure

### Next.js - Flat Architecture (Recommended for Small to Medium Projects)

**Best for:** Simple apps, single-page applications, learning projects

**Command:** Select `Next.js` → `Flat` architecture

```
my-app/
├── app/                         # ✨ Next.js App Router (ROOT level - not in src/)
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── public/                      # Static assets
│   └── favicon.ico
├── src/                         # ✨ All your code here
│   ├── components/              # All reusable components
│   │   ├── ui/                  # shadcn/ui components (pre-installed)
│   │   │   ├── Button.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── ...
│   │   ├── shared/              # Reusable across app
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.stories.tsx
│   │   │   └── Footer.tsx
│   │   └── layout/              # Page layout wrappers
│   │       ├── MainLayout.tsx
│   │       └── AuthLayout.tsx
│   ├── lib/
│   │   ├── api-client.ts        # ✨ Pre-configured Axios
│   │   ├── utils.ts             # cn(), helpers
│   │   ├── constants.ts         # App constants
│   │   └── types.ts             # Shared types
│   ├── stores/
│   │   └── globalStore.ts       # ✨ Zustand + Immer global state
│   ├── config/
│   │   └── api.config.ts        # API endpoints
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   └── hooks/
│       ├── useApi.ts
│       └── useMobile.ts
├── .storybook/                  # Component documentation
│   ├── main.ts
│   └── preview.ts
├── .husky/                      # Git pre-commit hooks
│   └── pre-commit
├── .github/workflows/           # CI/CD workflows (optional)
├── .env.example                 # Environment template
├── .env.local                   # ⚠️ Local env (git ignored)
├── .gitignore
├── next.config.ts               # ✨ Next.js config
├── tsconfig.json                # ✨ TypeScript strict mode
├── vitest.config.ts             # Testing config
├── eslint.config.mjs            # ESLint rules
├── .prettierrc                  # Code formatting
├── package.json                 # ✨ Pre-configured dependencies
├── pnpm-lock.yaml               # Locked versions
└── README.md
```

---

### Next.js - Modular Architecture (Recommended for Large/Team Projects)

**Best for:** Large codebases, multiple teams, scalable products

**Command:** Select `Next.js` → `Modular` architecture

```
my-app/
├── app/                         # ✨ Next.js App Router (ROOT level - not in src/)
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── public/                      # Static assets
│   └── favicon.ico
├── src/                         # ✨ All your code here
│   ├── components/              # Shared components only
│   │   ├── ui/                  # shadcn/ui components (pre-installed)
│   │   │   ├── Button.tsx
│   │   │   ├── Dialog.tsx
│   │   │   └── Button.stories.tsx
│   │   └── layout/              # Shared layouts
│   │       ├── MainLayout.tsx
│   │       └── AuthLayout.tsx
│   ├── modules/                 # ✨ Feature modules (isolated, independent)
│   │   ├── auth/
│   │   │   ├── components/      # Auth-specific components only
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   └── LoginForm.stories.tsx
│   │   │   ├── stores/
│   │   │   │   └── authStore.ts # ✨ Auth state (Zustand)
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useLogin.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   ├── config/
│   │   │   │   └── auth.config.ts
│   │   │   ├── lib/
│   │   │   │   └── authService.ts
│   │   │   └── index.ts         # Barrel export
│   │   ├── profile/             # (Same structure as auth)
│   │   │   ├── components/
│   │   │   ├── stores/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   ├── config/
│   │   │   └── index.ts
│   │   ├── dashboard/           # (Same structure as auth)
│   │   │   ├── components/
│   │   │   ├── stores/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   ├── config/
│   │   │   └── index.ts
│   │   └── documents/           # (Same structure as auth)
│   │       ├── components/
│   │       ├── stores/
│   │       ├── hooks/
│   │       ├── types/
│   │       └── index.ts
│   ├── stores/                  # Global store only
│   │   └── globalStore.ts       # ✨ App-wide state (theme, notifications, user)
│   ├── lib/
│   │   ├── api-client.ts        # ✨ Pre-configured Axios
│   │   ├── feature-gate.ts      # ✨ Feature flag manager
│   │   ├── utils.ts
│   │   └── types.ts
│   ├── config/
│   │   ├── features.config.ts   # ✨ Feature definitions (47+ features)
│   │   └── api.config.ts
│   ├── hooks/                   # Global hooks
│   │   └── useMobile.ts
│   └── types/
│       └── index.ts
├── .storybook/                  # Component documentation
│   ├── main.ts
│   └── preview.ts
├── .husky/                      # Git pre-commit hooks
│   └── pre-commit
├── .github/workflows/           # CI/CD workflows (optional)
├── .env.example                 # Environment template
├── .env.local                   # ⚠️ Local env (git ignored)
├── .gitignore
├── next.config.ts               # ✨ Next.js config
├── tsconfig.json                # ✨ TypeScript strict mode
├── vitest.config.ts             # Testing config
├── eslint.config.mjs            # ESLint rules
├── .prettierrc                  # Code formatting
├── package.json                 # ✨ Pre-configured dependencies
├── pnpm-lock.yaml               # Locked versions
└── README.md
```

---

### Vite - Flat Architecture (Recommended for Small to Medium Projects)

**Best for:** Single-page applications (SPA), learning projects, lightweight apps

**Command:** Select `Vite` → `Flat` architecture

```
my-app/
├── index.html                   # ✨ Vite entry point (ROOT level)
├── src/                         # ✨ All your code here
│   ├── main.tsx                 # ✨ React entry point (replaces app/page.tsx)
│   ├── App.tsx                  # Root component
│   ├── App.css                  # Global styles
│   ├── components/              # All reusable components
│   │   ├── ui/                  # shadcn/ui components (pre-installed)
│   │   │   ├── Button.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── ...
│   │   ├── shared/              # Reusable across app
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.stories.tsx
│   │   │   └── Footer.tsx
│   │   └── layout/              # Page layout wrappers
│   │       ├── MainLayout.tsx
│   │       └── AuthLayout.tsx
│   ├── lib/
│   │   ├── api-client.ts        # ✨ Pre-configured Axios
│   │   ├── utils.ts             # cn(), helpers
│   │   ├── constants.ts         # App constants
│   │   └── types.ts             # Shared types
│   ├── stores/
│   │   └── globalStore.ts       # ✨ Zustand + Immer global state
│   ├── config/
│   │   └── api.config.ts        # API endpoints
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── hooks/
│   │   ├── useApi.ts
│   │   └── useMobile.ts
│   └── pages/                   # Page components (if using routing)
│       ├── Home.tsx
│       ├── Login.tsx
│       └── Dashboard.tsx
├── public/                      # Static assets
│   └── favicon.svg
├── .storybook/                  # Component documentation
│   ├── main.ts
│   └── preview.ts
├── .husky/                      # Git pre-commit hooks
│   └── pre-commit
├── .github/workflows/           # CI/CD workflows (optional)
├── .env.example                 # Environment template
├── .env.local                   # ⚠️ Local env (git ignored)
├── .gitignore
├── vite.config.ts               # ✨ Vite config
├── tsconfig.json                # ✨ TypeScript strict mode
├── vitest.config.ts             # Testing config
├── eslint.config.mjs            # ESLint rules
├── .prettierrc                  # Code formatting
├── package.json                 # ✨ Pre-configured dependencies
├── pnpm-lock.yaml               # Locked versions
└── README.md
```

---

### Vite - Modular Architecture (Recommended for Large/Team Projects)

**Best for:** Large SPA projects, multiple teams, complex state management

**Command:** Select `Vite` → `Modular` architecture

```
my-app/
├── index.html                   # ✨ Vite entry point (ROOT level)
├── src/                         # ✨ All your code here
│   ├── main.tsx                 # ✨ React entry point
│   ├── App.tsx                  # Root component
│   ├── App.css                  # Global styles
│   ├── components/              # Shared components only
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── Button.tsx
│   │   │   ├── Dialog.tsx
│   │   │   └── Button.stories.tsx
│   │   └── layout/              # Shared layouts
│   │       ├── MainLayout.tsx
│   │       └── AuthLayout.tsx
│   ├── modules/                 # ✨ Feature modules (isolated, independent)
│   │   ├── auth/
│   │   │   ├── components/      # Auth-specific components only
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   └── LoginForm.stories.tsx
│   │   │   ├── stores/
│   │   │   │   └── authStore.ts # ✨ Auth state (Zustand)
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useLogin.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   ├── config/
│   │   │   │   └── auth.config.ts
│   │   │   ├── lib/
│   │   │   │   └── authService.ts
│   │   │   └── index.ts         # Barrel export
│   │   ├── profile/             # (Same structure as auth)
│   │   │   ├── components/
│   │   │   ├── stores/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   ├── config/
│   │   │   └── index.ts
│   │   └── dashboard/           # (Same structure as auth)
│   │       ├── components/
│   │       ├── stores/
│   │       ├── hooks/
│   │       ├── types/
│   │       ├── config/
│   │       └── index.ts
│   ├── stores/                  # Global store only
│   │   └── globalStore.ts       # ✨ App-wide state (theme, notifications, user)
│   ├── lib/
│   │   ├── api-client.ts        # ✨ Pre-configured Axios
│   │   ├── feature-gate.ts      # ✨ Feature flag manager
│   │   ├── utils.ts
│   │   └── types.ts
│   ├── config/
│   │   ├── features.config.ts   # ✨ Feature definitions (47+ features)
│   │   └── api.config.ts
│   ├── hooks/                   # Global hooks
│   │   └── useMobile.ts
│   ├── types/
│   │   └── index.ts
│   └── pages/                   # Page components (if using routing)
│       ├── Home.tsx
│       ├── Login.tsx
│       └── Dashboard.tsx
├── public/                      # Static assets
│   └── favicon.svg
├── .storybook/                  # Component documentation
│   ├── main.ts
│   └── preview.ts
├── .husky/                      # Git pre-commit hooks
│   └── pre-commit
├── .github/workflows/           # CI/CD workflows (optional)
├── .env.example                 # Environment template
├── .env.local                   # ⚠️ Local env (git ignored)
├── .gitignore
├── vite.config.ts               # ✨ Vite config
├── tsconfig.json                # ✨ TypeScript strict mode
├── vitest.config.ts             # Testing config
├── eslint.config.mjs            # ESLint rules
├── .prettierrc                  # Code formatting
├── package.json                 # ✨ Pre-configured dependencies
├── pnpm-lock.yaml               # Locked versions
└── README.md
```

---

### Architecture Comparison

| Aspect | Next.js Flat | Next.js Modular | Vite Flat | Vite Modular |
|--------|-------------|-----------------|-----------|--------------|
| **Entry Point** | `app/` at root | `app/` at root | `src/main.tsx` | `src/main.tsx` |
| **Framework Type** | Full-stack SSR/ISR | Full-stack SSR/ISR | SPA | SPA |
| **API Routes** | ✅ `app/api/` | ✅ `app/api/` | ❌ Use external API | ❌ Use external API |
| **Components** | `src/components/` | `src/components/` + `src/modules/` | `src/components/` | `src/components/` + `src/modules/` |
| **Best For** | Simple websites | Large products | Single-page apps | Large SPAs |
| **Team Size** | 1-3 devs | 5+ devs | 1-3 devs | 5+ devs |
| **Scalability** | Up to ~20 pages | 100+ pages | Up to ~50 pages | 100+ pages |

---

### Key Structural Differences

#### Next.js
- ✅ `app/` folder at **ROOT** (NOT in `src/`)
- ✅ Pages and routes in `app/`
- ✅ API routes in `app/api/`
- ✅ Components and logic in `src/`
- ✅ Built-in Server Components

#### Vite
- ✅ `src/main.tsx` is entry point (replaces Next.js `app/`)
- ✅ `index.html` at root (Vite entry file)
- ✅ No built-in routing (use `react-router-dom`)
- ✅ All code in `src/` folder
- ✅ Client-side rendering only

---

### ✨ What's Pre-configured

Files with ✨ are **auto-generated and pre-configured** by Client-Generator:

- **`tsconfig.json`** - TypeScript strict mode (no `any` types)
- **`package.json`** - All dependencies exact versions (no `^` or `~`)
- **`.env.example`** & **`.env.local`** - Backend API URL already set
- **`api-client.ts`** - Axios with JWT, 401 redirect, interceptors
- **`globalStore.ts`** - Zustand + Immer ready to use
- **`features.config.ts`** - Feature flags for 47+ features (modular only)
- **`.storybook/`** - Auto-discovery of `.stories.tsx` files
- **`.husky/`** - Pre-commit hooks checking TypeScript, ESLint, Prettier
- **`next.config.ts` or `vite.config.ts`** - Framework configuration
- **`App router (app/)` for Next.js** or **`src/main.tsx` for Vite**

## Key Concepts

### Global Store (Zustand + Immer)

```typescript
import { useGlobalStore } from '@/stores/globalStore'

// In components
const { theme, setTheme } = useGlobalStore()
```

**Global state covers:**
- theme (light/dark)
- sidebarOpen
- notifications
- currentUser

### Per-Module Stores

Each module has its own isolated Zustand store:

```typescript
// src/modules/auth/stores/authStore.ts
export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    user: null,
    login: async (email, password) => {
      // Login logic
    }
  }))
)
```

### Feature Gates

Control features and modules dynamically:

```typescript
import { FEATURE_FLAGS } from '@/config/features.config'

if (FEATURE_FLAGS['auth'].enabled) {
  <LoginForm />
}
```

### API Client

Pre-configured Axios client:

```typescript
import { apiClient } from '@/lib/api-client'

// GET
const { data } = await apiClient.get('/api/users')

// POST
await apiClient.post('/api/auth/login', { email, password })
```

Automatically:
- Adds JWT token from localStorage
- Redirects to /login on 401
- Handles timeouts

### Form Validation (react-hook-form + Zod)

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>
}
```

### Storybook Stories

Place `.stories.tsx` files next to components:

```typescript
// src/components/shared/Header/Header.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './index'

const meta = {
  title: 'Shared/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: 'Welcome' }
}
```

Then run `pnpm storybook` to see all stories!

## Environment Configuration

Update `.env.local` with your backend URL:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000

# Features
NEXT_PUBLIC_ENABLE_STORYBOOK=true
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 or Vite 5 |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **State** | Zustand 5 + Immer 10 |
| **Forms** | react-hook-form 7 + Zod 4 |
| **Data Fetching** | React Query 5 / SWR / Axios |
| **Components** | Storybook 7 |
| **Testing** | Vitest + Playwright |
| **Quality** | Husky + ESLint + Prettier |

## Development Workflow

### Daily Development

```bash
# 1. Start dev server
pnpm dev

# 2. Develop components with Storybook
pnpm storybook

# 3. Write/run tests
pnpm test
pnpm test:watch

# 4. Format & lint
pnpm lint
pnpm format
```

### Before Committing

Pre-commit hooks automatically run:
- TypeScript validation
- ESLint
- Prettier formatting

Just commit - hooks handle the rest!

### Deploying

```bash
# Build
pnpm build

# Test production build locally
pnpm preview

# Deploy to Vercel (Next.js) or any host
# See your deployment platform docs
```

## API Integration

All API calls go to your .NET backend:

```typescript
// Example: Login
const { data } = await apiClient.post('/api/auth/login', {
  email: 'user@example.com',
  password: 'password'
})

// Response expected:
{
  user: { id: '123', email: 'user@example.com', role: 'user' },
  token: 'eyJhbGc...'
}
```

Your components handle UI, .NET backend handles business logic!

## Module System (Next.js Modular Only)

Each module is independent:

```typescript
// Auth Module
export const useAuthStore = create<AuthState>()(...)
export const LoginForm: React.FC = () => { ... }

// Profile Module (completely separate)
export const useProfileStore = create<ProfileState>()(...)
export const ProfileCard: React.FC = () => { ... }

// Dashboard Module (independent)
export const useDashboardStore = create<DashboardState>()(...)
export const Dashboard: React.FC = () => { ... }
```

Modules can:
- Be enabled/disabled via feature gates
- Have independent stores
- Be developed in isolation
- Be tested independently
- Be deployed separately (future)

## Commands Reference

```bash
# Development
pnpm dev              # Start dev server
pnpm dev --port 3001  # Custom port

# Storybook
pnpm storybook        # Start Storybook
pnpm storybook:build  # Build Storybook

# Testing
pnpm test             # Run tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # Coverage report

# Quality
pnpm lint             # ESLint check
pnpm lint:fix         # Fix issues
pnpm format           # Prettier format
pnpm type-check       # TypeScript check

# Build & Deploy
pnpm build            # Production build
pnpm start            # Start production server
pnpm preview          # Preview build locally
```

## Customization

### Change Backend API URL Later

Update `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://new-backend-url:5000
```

Or create a script:

```bash
pnpm update-api http://new-url:5000
```

### Add New Module

Create manually following the structure, or wait for `create-module` command (coming soon):

```
src/modules/payments/
├── components/
├── stores/
├── hooks/
├── types/
└── index.ts
```

### Add New Component

```bash
# Create in appropriate location
src/components/shared/MyComponent/
├── index.tsx           # Component code
└── MyComponent.stories.tsx  # Storybook story
```

Run `pnpm storybook` - story auto-discovered!

## Troubleshooting

### Port Already in Use

```bash
pnpm dev --port 3001
pnpm storybook -- -p 6007
```

### Node Modules Issues

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors

```bash
pnpm type-check
```

### Storybook Not Showing Stories

Make sure files are named `.stories.tsx` and placed next to components.

### Known Limitations & Workarounds

#### 1. **Piped Input Defaults to Vite Framework**
   - **Issue:** When using piped input (e.g., `cat input.txt | client-generator my-app`), the first question (framework selection) times out and defaults to Vite
   - **Workaround:** For reproducible builds in CI/CD, use piped input with all questions answered. Users will get a Vite project instead of Next.js if the framework choice isn't properly read
   - **Recommendation:** For interactive use, run without piping to select your preferred framework
   - **Status:** Mitigated by graceful defaults; project generation still succeeds

#### 2. **Vite Projects Don't Generate .env Files**
   - **Issue:** Vite doesn't require `.env` files for basic usage (uses `import.meta.env` instead)
   - **Why:** This is Vite's design. Environment variables are handled differently than Next.js
   - **Workaround:** Manually create `.env` file in Vite projects if needed, or update `vite.config.ts` to specify env prefix
   - **Note:** For Next.js projects, `.env.local` and `.env.example` are properly generated

#### 3. **Setup Takes 3-5 Minutes**
   - **Issue:** Project scaffolding appears slow
   - **Why:** This includes framework CLI execution (create-next-app/create-vite) + npm package installation (~30+ dependencies)
   - **Status:** This is normal and expected behavior
   - **Tip:** First run caches npm, subsequent runs will be slightly faster

#### 4. **Framework Version Mismatch**
   - **Issue:** Generated project shows different version than README (e.g., Next.js 14.3.0 instead of 14.2.3)
   - **Root Cause:** Client-Generator uses `create-next-app@latest` and `create-vite@latest` which install the **latest** available version at generation time
   - **Example:** README says "Next.js 14.2.3", but your project gets "Next.js 14.3.0" (or even higher) because that's what's current
   - **What to do:** Check your generated project's `package.json` - those are your actual versions
   - **Is this a problem?** No! This is intentional. We use `@latest` to ensure:
     - ✅ Security patches are always included
     - ✅ Latest bug fixes are available
     - ✅ Your project starts on current, stable versions
   - **How to lock versions:** Modify `scripts/create-project.ts` to specify exact versions in the `create-next-app` and `create-vite` calls
   - **Recommendation:** Use whatever versions your project installs - they're fully compatible and tested

### Reporting Issues

If you encounter issues not listed above:
1. Check your Node version: `node --version` (need >=18.17.0)
2. Check your pnpm version: `pnpm --version` (need >=9.0.0)
3. Try clearing node_modules: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
4. Verify the generator itself: `client-generator --version` (should output 1.1.0)

## Support

- 📖 [Next.js Docs](https://nextjs.org)
- 📖 [Vite Docs](https://vitejs.dev)
- 📖 [Zustand Docs](https://zustand-react.vercel.app)
- 📖 [Storybook Docs](https://storybook.js.org)
- 📖 [react-hook-form Docs](https://react-hook-form.com)

## License

MIT

## Author

Your Organization
