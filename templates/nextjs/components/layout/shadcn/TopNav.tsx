/**
 * Top Navigation Component (shadcn/ui variant)
 * Main navigation bar using shadcn/ui components
 * Shows user info, theme toggle, and navigation links
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, LogOut, Settings, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TopNavProps {
  onMenuClick?: () => void
  userName?: string
  userEmail?: string
  className?: string
}

export const TopNav: React.FC<TopNavProps> = ({
  onMenuClick,
  userName = 'User',
  userEmail = 'user@example.com',
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              C
            </div>
            <span className="font-bold text-lg hidden sm:inline">Generator</span>
          </Link>
        </div>

        {/* Right Section - Actions & User Menu */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-2 rounded-full w-10 h-10 p-0"
              >
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary/60 rounded-full text-primary-foreground font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-semibold">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default TopNav
