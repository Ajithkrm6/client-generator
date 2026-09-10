'use client';

import { useSession, signOut } from 'next-auth/react';
import { useCallback, useState, useMemo } from 'react';
import { Bell, LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FeatureToggleButton } from '@/components/shared/FeatureToggleButton';

/**
 * TopNav Props Interface
 * @interface TopNavProps
 */
interface TopNavProps {
  /** Page title for display in header */
  title?: string;
  /** Page description for accessibility */
  description?: string;
}

/**
 * TopNav Component
 * 
 * Sticky header navigation with:
 * - Mobile menu toggle using shadcn Button
 * - Page title/breadcrumb
 * - Notifications bell using shadcn Button
 * - User menu dropdown using shadcn DropdownMenu
 * - Session-aware rendering
 * - Avatar using shadcn Avatar
 * 
 * @component
 * @param {TopNavProps} props - Component props
 * @returns {React.ReactElement}
 */
export function TopNav({ 
  title, 
  description, 
}: TopNavProps) {
  // Authentication state
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // UI state
  const [notificationCount, setNotificationCount] = useState(3);

  /**
   * Handle user logout with proper cleanup
   * Follows async/await pattern for better error handling
   */
  const handleLogout = useCallback(async () => {
    try {
      await signOut({ redirect: false });
      // Small delay to allow signOut to complete
      setTimeout(() => {
        router.push('/auth/login');
      }, 500);
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/auth/login');
    }
  }, [router]);

  /**
   * Memoized user info to prevent unnecessary re-renders
   */
  const userInfo = useMemo(() => ({
    name: session?.user?.name || 'User',
    email: session?.user?.email || 'user@example.com',
    tenantId: session?.user?.id || 'N/A',
    initials: (session?.user?.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase(),
  }), [session?.user]);

  return (
    <header 
      className="bg-white border-b border-border sticky top-0 z-40 h-16 shadow-sm"
      role="banner"
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6 gap-4">
        {/* Left Section - Menu Toggle */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Mobile Menu Toggle - Using native shadcn SidebarTrigger */}
          <SidebarTrigger className="md:hidden" />
        </div>

        {/* Right Section - Notifications & User Menu */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {/* Notifications Button (Using shadcn Button) */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2"
            aria-label={`Notifications (${notificationCount} unread)`}
            title={`${notificationCount} new notifications`}
          >
            <Bell className="w-5 h-5 text-foreground/70" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </Button>

          {/* Feature Toggle Button */}
          <FeatureToggleButton />

          {/* User Menu Dropdown (Using shadcn DropdownMenu) */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer" aria-label="User menu">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userInfo.email}`} />
                <AvatarFallback className="text-xs">{userInfo.initials}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium truncate max-w-[120px]">
                  {userInfo.name}
                </span>
            </DropdownMenuTrigger>

            {/* Dropdown Menu Content */}
            <DropdownMenuContent align="end" className="w-56">
              {/* User Info Section */}
              <div className="flex flex-col gap-2 px-2 py-2 border-b">
                <p className="font-semibold text-sm text-foreground">
                  {userInfo.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userInfo.email}
                </p>
                <div className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded w-fit">
                  ID: {userInfo.tenantId.slice(0, 8)}...
                </div>
              </div>

              {/* Profile Settings */}
              <DropdownMenuItem>
                <Link
                  href="/settings/profile"
                  className="flex items-center gap-2 w-full"
                >
                  <Settings className="w-4 h-4" />
                  <span>Profile Settings</span>
                </Link>
              </DropdownMenuItem>

              {/* Preferences */}
              <DropdownMenuItem>
                <Link
                  href="/settings/preferences"
                  className="flex items-center gap-2 w-full"
                >
                  <Settings className="w-4 h-4" />
                  <span>Preferences</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
