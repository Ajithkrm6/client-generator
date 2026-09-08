# Component & Module Reference Guide

Welcome to your Client-Generator project! This guide explains the reference implementations and how to use them as templates for your own features.

## 📁 Project Structure Overview

```
src/
├── components/
│   ├── layout/              # Layout components (TopNav, SideNav, LayoutPrimaryChild)
│   ├── shared/              # Custom reusable components
│   └── ui/                  # shadcn/ui components (auto-generated)
├── modules/
│   ├── auth/               # Authentication module (EXAMPLE)
│   │   ├── components/     # Auth-specific components (LoginForm, etc.)
│   │   ├── store/          # Zustand stores for auth state
│   │   ├── hooks/          # Custom hooks (useAuth, etc.)
│   │   └── types/          # TypeScript interfaces
│   ├── dashboard/          # Dashboard module (EXAMPLE)
│   │   ├── components/     # Dashboard components
│   │   └── store/          # Dashboard store
│   └── shared/             # Shared resources across modules
│       ├── components/     # Shared components
│       ├── hooks/          # Shared hooks
│       └── store/          # Shared state
├── lib/
│   ├── feature-gate.tsx    # Feature flag implementation
│   └── utils.ts            # Utility functions
├── store/                   # Global app stores
├── types/                   # Shared TypeScript types
└── hooks/                   # Custom hooks

app/
├── page.tsx                # Welcome dashboard (replace with your home page)
├── auth/                   # Auth routes
├── dashboard/              # Dashboard routes
└── layout.tsx              # Root layout
```

## 🎯 Key Components Reference

### Layout Components (`src/components/layout/`)

#### TopNav
- Sticky navigation bar at top
- Shows user info and actions
- Mobile responsive

**Usage:**
```tsx
import { TopNav } from '@/components/layout/TopNav'

<TopNav 
  onMenuClick={() => setSideNavOpen(!sideNavOpen)}
  userName="John Doe"
/>
```

#### SideNav
- Collapsible sidebar navigation
- Responsive (hidden on mobile, always visible on desktop)
- Customizable nav items

**Usage:**
```tsx
import { SideNav } from '@/components/layout/SideNav'

<SideNav 
  isOpen={sideNavOpen}
  onClose={() => setSideNavOpen(false)}
  navItems={customNavItems}
/>
```

#### LayoutPrimaryChild
- Main content wrapper
- Consistent padding and max-width
- Scroll container

**Usage:**
```tsx
import { LayoutPrimaryChild } from '@/components/layout/LayoutPrimaryChild'

<LayoutPrimaryChild>
  <YourContent />
</LayoutPrimaryChild>
```

## 🔐 Auth Module Pattern

The `src/modules/auth/` folder shows how to implement an authentication module:

### Store Pattern (Zustand + Immer)

```tsx
import { useAuthStore } from '@/modules/auth/store/auth.store'

// In your component
const { user, isLoading, login, logout } = useAuthStore()

// Usage
await login(email, password)
logout()
```

**Key Features:**
- Immer middleware for immutable updates
- Promise-based async actions
- Error handling
- Type-safe with TypeScript

### Form Pattern (react-hook-form + Zod)

See `src/modules/auth/components/LoginForm.tsx` for complete example:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

// In component
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

**Benefits:**
- Type-safe form validation
- Auto-generated form types
- Built-in error messages
- Zero-config integration

## 🎚️ Feature Gates Implementation

Feature gates allow you to control which features are visible to which users:

### Component Usage

```tsx
import { FeatureGate } from '@/lib/feature-gate'

// Single feature
<FeatureGate feature="auth.two-factor">
  <TwoFactorSettings />
</FeatureGate>

// Multiple features (OR logic - any matches)
<FeatureGate feature={["auth.two-factor", "auth.social-login"]}>
  <AdvancedAuthSettings />
</FeatureGate>

// Multiple features (AND logic - all must match)
<FeatureGate 
  feature={["auth.two-factor", "auth.social-login"]} 
  requireAll
>
  <FullAuthSettings />
</FeatureGate>

// With fallback
<FeatureGate feature="premium.analytics" fallback={<BasicAnalytics />}>
  <PremiumAnalytics />
</FeatureGate>
```

### Hook Usage

```tsx
import { useFeatureGate } from '@/lib/feature-gate'

const MyComponent = () => {
  const isFeatureEnabled = useFeatureGate('auth.two-factor')
  
  if (isFeatureEnabled) {
    return <TwoFactorUI />
  }
  
  return <BasicUI />
}
```

### Define Features

Edit `src/lib/feature-gate.tsx` to add your features:

```tsx
const FEATURE_FLAGS: Record<string, boolean> = {
  'auth.two-factor': true,           // Enabled
  'auth.social-login': false,        // Disabled
  'dashboard.advanced-analytics': true,
  // Add your features here
}
```

## 📦 Store Pattern (Zustand + Immer)

Every module should have its own store. See examples:
- `src/modules/auth/store/auth.store.ts`
- `src/modules/dashboard/store/dashboard.store.ts`

### Creating a New Store

```tsx
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface MyModuleState {
  data: any[]
  isLoading: boolean
  error: string | null
  
  fetchData: () => Promise<void>
  updateData: (newData: any) => void
}

export const useMyModuleStore = create<MyModuleState>()(
  immer((set) => ({
    data: [],
    isLoading: false,
    error: null,
    
    fetchData: async () => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })
      
      try {
        // Your API call here
        set((state) => {
          state.data = result
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.error = error.message
          state.isLoading = false
        })
      }
    },
    
    updateData: (newData) => {
      set((state) => {
        state.data = newData
      })
    },
  }))
)
```

**Key Benefits:**
- Immer automatically handles immutable updates
- No need for spread operators
- Type-safe actions
- Async-friendly
- Minimal boilerplate

## 🏗️ Module Structure

When creating a new module, follow this pattern:

```
src/modules/my-module/
├── components/
│   ├── MyComponent.tsx
│   └── index.ts
├── store/
│   ├── my-module.store.ts
│   └── index.ts
├── hooks/
│   ├── useMyHook.ts
│   └── index.ts
├── types/
│   ├── index.ts
│   └── my-module.types.ts
├── utils/
│   ├── helpers.ts
│   └── index.ts
└── index.ts (barrel export)
```

## 🎨 UI Components

All shadcn/ui components are available through `@/components/ui/`:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
```

## 🚀 Getting Started Checklist

- [ ] Explore the layout components (TopNav, SideNav, LayoutPrimaryChild)
- [ ] Review the auth module for patterns
- [ ] Check the feature gate implementation
- [ ] Study the Zustand store examples
- [ ] Look at the form pattern in LoginForm
- [ ] Replace `app/page.tsx` with your own dashboard
- [ ] Create your first module using the auth module as template
- [ ] Set up your own stores following the pattern
- [ ] Define your feature flags
- [ ] Start building!

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Documentation:** https://react.dev
- **Zustand GitHub:** https://github.com/pmndrs/zustand
- **react-hook-form:** https://react-hook-form.com
- **Zod:** https://zod.dev
- **shadcn/ui:** https://ui.shadcn.com

## 💡 Best Practices

1. **Always use TypeScript** - Define types for your props, state, and API responses
2. **Keep stores focused** - One store per feature/module
3. **Use feature gates** - Control feature visibility easily
4. **Component composition** - Build small, reusable components
5. **Error handling** - Always catch and display errors to users
6. **Loading states** - Show loading states in stores and UI
7. **Validation** - Use Zod for all form and API validation
8. **Documentation** - Add JSDoc comments to your functions and components

## 🤝 Questions?

Check the code comments - they explain the patterns and how to use them!
