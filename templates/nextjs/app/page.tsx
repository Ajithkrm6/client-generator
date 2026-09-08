/**
 * Welcome Dashboard Page
 * Default landing page shown after project generation
 * Displays project info, quick start guide, and references
 */

'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Code2,
  FileText,
  Zap,
  Layout,
  Shield,
} from 'lucide-react'
import { TopNav } from '@/components/layout/TopNav'
import { LayoutPrimaryChild } from '@/components/layout/LayoutPrimaryChild'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function WelcomePage() {
  const quickSteps = [
    {
      number: 1,
      title: 'Explore the Structure',
      description: 'Check out src/components and src/modules to see examples',
      icon: <Layout className="h-6 w-6" />,
    },
    {
      number: 2,
      title: 'Review Components',
      description: 'Look at Layout, TopNav, and SideNav reference implementations',
      icon: <Code2 className="h-6 w-6" />,
    },
    {
      number: 3,
      title: 'Check Examples',
      description: 'Visit Dashboard and Auth modules for real-world patterns',
      icon: <Zap className="h-6 w-6" />,
    },
    {
      number: 4,
      title: 'Read Documentation',
      description: 'View README.md and code comments for detailed explanations',
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      number: 5,
      title: 'Start Building',
      description: 'Copy patterns to build your own features and modules',
      icon: <Shield className="h-6 w-6" />,
    },
  ]

  const techStack = [
    { name: 'React 19.2.8', description: 'Modern UI library' },
    { name: 'Next.js 16.3.4', description: 'Full-stack framework' },
    { name: 'TypeScript 7.0.2', description: 'Type safety' },
    { name: 'Tailwind CSS 4.3.3', description: 'Utility-first CSS' },
    { name: 'shadcn/ui 10.6.0', description: 'Component library' },
    { name: 'Zustand 5.0.15', description: 'State management' },
    { name: 'Zod 4.5.4', description: 'Schema validation' },
  ]

  const features = [
    {
      title: 'Pre-built Layouts',
      description: 'TopNav, SideNav, and responsive layout components ready to use',
      href: '/dashboard',
    },
    {
      title: 'Reference Modules',
      description: 'Auth and Dashboard modules showing real-world patterns',
      href: '/auth/login',
    },
    {
      title: 'UI Components',
      description: 'All shadcn/ui components pre-configured and ready',
      href: '#',
    },
    {
      title: 'Feature Gates',
      description: 'Example feature flag implementation for modular features',
      href: '#',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav userName="Developer" />

      <LayoutPrimaryChild>
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Welcome to Your Project
          </h1>
          <p className="text-xl text-muted-foreground">
            Built with Client-Generator - Professional Frontend Scaffolding
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            This is your default welcome page. Replace it with your own dashboard.
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Quick Start Guide</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {quickSteps.map((step) => (
              <Card key={step.number} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                      {step.number}
                    </div>
                    <div className="text-muted-foreground">{step.icon}</div>
                  </div>
                  <CardTitle className="mt-2 text-base">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {feature.title}
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={feature.href}>
                    <Button variant="outline" className="gap-2">
                      Explore <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Tech Stack</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech) => (
              <Card key={tech.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Project Structure */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Project Structure</h2>
          <Card>
            <CardHeader>
              <CardTitle>Folder Organization</CardTitle>
              <CardDescription>
                Understanding the recommended project structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                {`src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (TopNav, SideNav)
│   ├── shared/         # Custom shared components
│   └── ui/             # shadcn/ui components
├── modules/            # Feature modules (modular architecture)
│   ├── auth/           # Authentication module
│   ├── dashboard/      # Dashboard module
│   └── shared/         # Shared module resources
├── lib/                # Utility functions
├── types/              # TypeScript types
├── store/              # Zustand stores
└── hooks/              # Custom React hooks

app/
├── page.tsx            # This welcome page
├── dashboard/          # Dashboard route
├── auth/               # Authentication routes
└── layout.tsx          # Root layout`}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Zap className="h-5 w-5" />
            Next Steps
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              ✅ Review the layout components in{' '}
              <code className="rounded bg-background px-2 py-1">src/components/layout/</code>
            </li>
            <li>
              ✅ Check out the{' '}
              <Link href="/dashboard" className="font-semibold underline">
                Dashboard example
              </Link>{' '}
              to see components in action
            </li>
            <li>
              ✅ Explore{' '}
              <code className="rounded bg-background px-2 py-1">src/modules/</code> for
              feature examples
            </li>
            <li>
              ✅ Replace this page with your own{' '}
              <code className="rounded bg-background px-2 py-1">app/page.tsx</code>
            </li>
            <li>
              ✅ Start building your features using the patterns shown here
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            Built with{' '}
            <Link
              href="https://github.com/Ajithkrm6/client-generator"
              className="font-semibold underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Client-Generator
            </Link>
            {' - Professional Frontend Scaffolding Framework'}
          </p>
          <p className="mt-2">
            Questions? Check the{' '}
            <Link
              href="https://github.com/Ajithkrm6/client-generator#readme"
              className="font-semibold underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </Link>
          </p>
        </div>
      </LayoutPrimaryChild>
    </div>
  )
}
