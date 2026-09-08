/**
 * Side Navigation Component (shadcn/ui variant)
 * Collapsible sidebar navigation using shadcn/ui components
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
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: string
  submenu?: NavItem[]
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
    badge: 'Pro',
    submenu: [
      {
        href: '/team/members',
        label: 'Members',
        icon: <Users className="h-4 w-4" />,
      },
      {
        href: '/team/roles',
        label: 'Roles & Permissions',
        icon: <Users className="h-4 w-4" />,
      },
    ],
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
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    )
  }

  const isActive = (href: string) => pathname === href

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isExpanded = expandedItems.includes(item.href)

    if (hasSubmenu) {
      return (
        <Collapsible
          key={item.href}
          open={isExpanded}
          onOpenChange={() => toggleExpand(item.href)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant={isActive(item.href) ? 'secondary' : 'ghost'}
              className="w-full justify-between"
            >
              <span className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
                {item.badge && <Badge variant="outline">{item.badge}</Badge>}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isExpanded && 'rotate-180'
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pl-4 mt-2">
            {item.submenu.map((subitem) =>
              renderNavItem(subitem, depth + 1)
            )}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
          isActive(item.href)
            ? 'bg-secondary text-secondary-foreground'
            : 'text-muted-foreground hover:bg-accent'
        )}
      >
        {item.icon}
        <span>{item.label}</span>
        {item.badge && <Badge variant="outline">{item.badge}</Badge>}
      </Link>
    )
  }

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
          <h2 className="font-bold text-lg">Navigation</h2>
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
          {navItems.map((item) => renderNavItem(item))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-2">
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
