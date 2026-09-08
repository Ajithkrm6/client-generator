/**
 * Top Navigation Component
 * Main navigation bar displayed at the top of the application
 * Shows user info, theme toggle, and navigation links
 * Built with Tailwind CSS (no shadcn/ui dependencies)
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TopNavProps {
  onMenuClick?: () => void
  userName?: string
  className?: string
}

export const TopNav: React.FC<TopNavProps> = ({
  onMenuClick,
  userName = 'User',
  className = '',
}) => {
  return (
    <header
      className={`
        sticky 
        top-0 
        z-40 
        border-b 
        border-border 
        bg-background/95 
        backdrop-blur 
        supports-[backdrop-filter]:bg-background/60
        ${className}
      `}
    >
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-lg">Logo</span>
          </Link>
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground md:mr-4">
            Welcome, {userName}
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default TopNav
