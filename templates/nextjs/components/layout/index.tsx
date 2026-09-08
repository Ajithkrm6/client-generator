/**
 * Side Navigation Component
 * Collapsible sidebar navigation for main app sections
 * Shows different menu items based on modules/routes
 */

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronLeft,
  Home,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

interface SideNavProps {
  isOpen?: boolean
  onClose?: () => void
  navItems?: NavItem[]
  className?: string
}

const defaultNavItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    href: '/team',
    label: 'Team',
    icon: <Users className="h-5 w-5" />,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
  },
]

export const SideNav: React.FC<SideNavProps> = ({
  isOpen = true,
  onClose,
  navItems = defaultNavItems,
  className = '',
}) => {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex flex-col border-r border-border bg-background transition-transform duration-200 md:static md:translate-x-0',
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-bold text-lg">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                pathname === item.href
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent/50'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  )
}

export default SideNav
