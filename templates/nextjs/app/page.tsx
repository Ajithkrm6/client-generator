/**
 * Welcome Page
 * Clean, professional landing page with proper gradient and spacing
 * Version is dynamically loaded from package.json
 */

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Zap, ChevronDown } from 'lucide-react'
import { getVersion, getPackageInfo } from '@/lib/version'

export default function WelcomePage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const version = getVersion()
  const packageInfo = getPackageInfo()
  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Main Hero Section - Centered */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px'
      }}>
        <div style={{
          maxWidth: '800px',
          textAlign: 'center'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '9999px',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            marginBottom: '40px',
            fontSize: '14px',
            color: '#cbd5e1'
          }}>
            <Zap size={16} color="#fbbf24" style={{ flexShrink: 0 }} />
            Built with Next.js 16 + shadcn/ui
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '24px',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            color: 'white'
          }}>
            This Project is Generated using
            <br />
            <span style={{
              background: 'linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              Client Generator v{version}
            </span>
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            A professional, production-ready starter template with modern stack and beautiful UI components.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 32px',
                borderRadius: '8px',
                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                color: 'white',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Explore Dashboard
              <ArrowRight size={20} style={{ flexShrink: 0 }} />
            </Link>

            <a
              href="#features"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 32px',
                borderRadius: '8px',
                border: '1px solid rgba(148, 163, 184, 0.5)',
                color: '#cbd5e1',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.2s',
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.8)'
                e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.5)'
                e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)'
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          padding: '80px 20px',
          background: 'rgba(15, 23, 42, 0.5)'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: 'white'
            }}>
              What's Included
            </h2>
            <p style={{
              color: '#a1a5b0',
              fontSize: '1.05rem'
            }}>
              Everything you need to build production-ready applications
            </p>
          </div>

          {/* Feature Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              { title: 'Modern Stack', desc: 'Next.js 16, React 19, TypeScript strict', icon: '⚡' },
              { title: 'Beautiful Components', desc: 'Professional shadcn/ui ready to use', icon: '🎨' },
              { title: 'Type Safe', desc: 'Full TypeScript with zero any types', icon: '🔒' },
              { title: 'Fast Performance', desc: 'Turbopack & Server Components', icon: '⚙️' },
              { title: 'State Management', desc: 'Zustand + Immer for predictable state', icon: '📦' },
              { title: 'Production Ready', desc: 'Deploy anywhere - Vercel, AWS, Docker', icon: '🚀' },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  borderRadius: '8px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.4)'
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)'
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'white'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div
        style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          padding: '60px 20px'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2
            style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '48px',
              color: 'white'
            }}
          >
            Tech Stack
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px'
            }}
          >
            {[
              { name: 'Next.js', version: '16.3.4' },
              { name: 'React', version: '19.2.8' },
              { name: 'TypeScript', version: '7.0.2' },
              { name: 'Tailwind CSS', version: '4.3.3' },
              { name: 'shadcn/ui', version: '10.6.0' },
              { name: 'Zustand', version: '5.0.15' },
              { name: 'React Query', version: '5.102.8' },
              { name: 'Immer', version: '11.1.18' },
              { name: 'Storybook', version: '8.5.0' },
            ].map((pkg, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  borderRadius: '6px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.4)'
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.7)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)'
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)'
                }}
              >
                <div
                  style={{
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    marginBottom: '4px',
                    color: 'white'
                  }}
                >
                  {pkg.name}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: '#64748b'
                  }}
                >
                  {pkg.version}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div
        style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          padding: '60px 20px',
          background: 'rgba(15, 23, 42, 0.5)'
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          <h2
            style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '48px',
              color: 'white'
            }}
          >
            Quick Start
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {[
              {
                step: '1',
                title: 'Component Locations & Types',
                desc: 'Understand where components live and their purposes',
                details: (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                    <p style={{ color: '#cbd5e1', marginBottom: '14px', fontWeight: '600', fontSize: '0.95rem' }}>📁 Project Structure:</p>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#cbd5e1',
                      fontFamily: 'monospace',
                      overflowX: 'auto',
                      marginBottom: '14px',
                      lineHeight: '1.5'
                    }}>
                      {`src/
├── components/
│   ├── ui/           # Base UI components
│   ├── shared/       # Shared business components
│   └── layout/       # Layout components
├── modules/          # Feature modules (use feature gates)
├── utils/            # Helpers & utilities
└── hooks/            # Custom React hooks
app/
├── layout.tsx        # Root layout
├── page.tsx          # Home page
└── [routes]/         # Dynamic routes`}
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <strong style={{ color: '#cbd5e1' }}>Key Point:</strong> Each folder has a specific purpose. UI components are atomic (Button, Input), Shared are composed (LoginForm), Layout provides structure (TopNav, SideNav), and Modules are feature bundles.
                    </p>
                  </div>
                )
              },
              {
                step: '2',
                title: 'UI vs Shared vs Layout Components',
                desc: 'Learn the difference and when to use each',
                details: (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ color: '#60a5fa', fontWeight: '600', marginBottom: '6px' }}>🎨 UI Components (src/components/ui/)</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginLeft: '16px' }}>
                        Atomic, reusable building blocks. Examples: Button, Input, Card, Badge, DropdownMenu
                      </p>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ color: '#a78bfa', fontWeight: '600', marginBottom: '6px' }}>🔗 Shared Components (src/components/shared/)</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginLeft: '16px' }}>
                        Composed from UI components. Examples: LoginForm, SignupForm, ProductCard
                      </p>
                    </div>
                    <div>
                      <p style={{ color: '#f472b6', fontWeight: '600', marginBottom: '6px' }}>📐 Layout Components (src/components/layout/)</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginLeft: '16px' }}>
                        Structure pages. Shipped out-of-box. Examples: TopNav, SideNav, LayoutPrimaryChild
                      </p>
                    </div>
                  </div>
                )
              },
              {
                step: '3',
                title: 'Layout Components Explained',
                desc: 'Why layout components are pre-built and how to use them',
                details: (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                    <p style={{ color: '#cbd5e1', marginBottom: '12px', lineHeight: '1.6' }}>
                      <strong>Why Shipped Out-of-Box?</strong> Layout components are pre-built because:
                    </p>
                    <ul style={{ color: '#94a3b8', marginLeft: '20px', lineHeight: '1.8', marginBottom: '14px' }}>
                      <li>✓ Standard across all pages (TopNav, SideNav)</li>
                      <li>✓ Consistent user experience</li>
                      <li>✓ Faster feature development</li>
                      <li>✓ Single source of truth for layout</li>
                    </ul>
                    <p style={{ color: '#cbd5e1', marginBottom: '10px', fontWeight: '600', fontSize: '0.95rem' }}>Key Layout Components:</p>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: '#cbd5e1',
                      lineHeight: '1.6'
                    }}>
                      <strong>TopNav:</strong> Header with logo, menus, user profile<br/>
                      <strong>SideNav:</strong> Collapsible sidebar with navigation items<br/>
                      <strong>LayoutPrimaryChild:</strong> Main content wrapper container
                    </div>
                  </div>
                )
              },
              {
                step: '4',
                title: 'Modules & Feature Gates',
                desc: 'Enable/disable features dynamically without redeployment',
                details: (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                    <p style={{ color: '#cbd5e1', marginBottom: '12px', lineHeight: '1.6' }}>
                      <strong>What are Modules?</strong> Feature bundles organized in src/modules/ with their own routes, components, and logic.
                    </p>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: '#cbd5e1',
                      fontFamily: 'monospace',
                      marginBottom: '12px',
                      lineHeight: '1.6'
                    }}>
                      {`// config/features.ts - Enable/Disable Modules
export const features = {
  authModule: true,       // Auth features enabled
  dashboardModule: false, // Disabled
  analyticsModule: true,  // Analytics enabled
}`}
                    </div>
                    <p style={{ color: '#cbd5e1', marginBottom: '10px', fontWeight: '600', fontSize: '0.95rem' }}>Feature Gate Usage:</p>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: '#cbd5e1',
                      fontFamily: 'monospace',
                      lineHeight: '1.6'
                    }}>
                      {`import { features } from '@/config/features'

if (features.analyticsModule) {
  // Analytics code runs only if enabled
}`}
                    </div>
                  </div>
                )
              },
              {
                step: '5',
                title: 'Storybook Component Development',
                desc: 'Build and document components in isolation',
                details: (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                    <p style={{ color: '#cbd5e1', marginBottom: '12px', lineHeight: '1.6' }}>
                      <strong>📖 What is Storybook?</strong> Isolated environment for building, testing, and documenting UI components.
                    </p>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: '#cbd5e1',
                      fontFamily: 'monospace',
                      marginBottom: '12px',
                      lineHeight: '1.6'
                    }}>
                      {`// Start Storybook
npm run storybook

// Build static Storybook
npm run build-storybook

// Access at http://localhost:6006`}
                    </div>
                    <p style={{ color: '#cbd5e1', marginBottom: '10px', fontWeight: '600', fontSize: '0.95rem' }}>Create Component Stories:</p>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#cbd5e1',
                      fontFamily: 'monospace',
                      lineHeight: '1.6'
                    }}>
                      {`// src/components/ui/Button.stories.ts
import Button from './Button'

export default {
  title: 'UI/Button',
  component: Button,
}

export const Primary = {
  args: { variant: 'default' },
}

export const Secondary = {
  args: { variant: 'secondary' },
}`}
                    </div>
                  </div>
                )
              },
              {
                step: '6',
                title: 'Development Setup & Best Practices',
                desc: 'Essential dev practices and workspace setup',
                details: (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                    <p style={{ color: '#cbd5e1', marginBottom: '12px', fontWeight: '600', fontSize: '0.95rem' }}>📦 Essential Commands:</p>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#cbd5e1',
                      fontFamily: 'monospace',
                      marginBottom: '12px',
                      lineHeight: '1.6'
                    }}>
                      {`npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # Code quality check
npm run type-check # TypeScript validation`}
                    </div>
                    <p style={{ color: '#cbd5e1', marginBottom: '10px', fontWeight: '600', fontSize: '0.95rem' }}>✅ Best Practices:</p>
                    <ul style={{ color: '#94a3b8', marginLeft: '20px', lineHeight: '1.8' }}>
                      <li>Always use TypeScript interfaces for props</li>
                      <li>Keep components in proper folders (ui/, shared/, layout/)</li>
                      <li>Use feature gates for module toggling</li>
                      <li>Follow existing component patterns</li>
                      <li>Export from barrel files (index.ts)</li>
                      <li>Use server components by default (&quot;use client&quot; sparingly)</li>
                    </ul>
                  </div>
                )
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: '8px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  backgroundColor: expandedStep === idx ? 'rgba(30, 41, 59, 0.8)' : 'rgba(30, 41, 59, 0.5)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                <div
                  onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '20px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'linear-gradient(to right, #2563eb, #9333ea)',
                      color: 'white',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      fontSize: '1.1rem'
                    }}
                  >
                    {item.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontWeight: '600',
                        marginBottom: '4px',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        color: '#94a3b8',
                        fontSize: '0.9rem'
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      flexShrink: 0,
                      transition: 'transform 0.3s',
                      transform: expandedStep === idx ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <ChevronDown size={20} color="#64748b" />
                  </div>
                </div>

                {/* Expandable Details */}
                {expandedStep === idx && (
                  <div
                    style={{
                      padding: '0 20px 20px 20px',
                      borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                      animation: 'fadeIn 0.3s ease-in'
                    }}
                  >
                    {item.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documentation Links */}
      <div
        style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          padding: '60px 20px',
          background: 'rgba(15, 23, 42, 0.5)'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <h2
            style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '48px',
              color: 'white'
            }}
          >
            Quick Reference
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}
          >
            {[
              {
                name: 'Next.js',
                desc: 'React Framework',
                url: 'https://nextjs.org/docs',
                icon: '▲'
              },
              {
                name: 'React',
                desc: 'JavaScript Library',
                url: 'https://react.dev',
                icon: '⚛️'
              },
              {
                name: 'Storybook',
                desc: 'UI Component Development',
                url: 'https://storybook.js.org/docs',
                icon: '📖'
              },
              {
                name: 'Vite',
                desc: 'Build Tool & Dev Server',
                url: 'https://vitejs.dev',
                icon: '⚡'
              },
            ].map((doc, idx) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '24px',
                  borderRadius: '8px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.4)'
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)'
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    lineHeight: '1'
                  }}
                >
                  {doc.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: 'white',
                      marginBottom: '4px'
                    }}
                  >
                    {doc.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: '#94a3b8'
                    }}
                  >
                    {doc.desc}
                  </p>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    color: '#60a5fa',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  Read Docs
                  <ExternalLink size={16} style={{ flexShrink: 0 }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          padding: '32px 20px',
          backgroundColor: 'rgba(15, 23, 42, 0.8)'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <p
            style={{
              color: '#94a3b8',
              fontSize: '0.9rem'
            }}
          >
            Built with Client-Generator • Production Ready
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px'
            }}
          >
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex' }}>
              <Github size={20} />
            </a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex' }}>
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
