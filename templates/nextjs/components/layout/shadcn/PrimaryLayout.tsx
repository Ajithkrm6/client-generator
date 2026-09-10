'use client';

import { ReactNode, useMemo, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { NavigationSidebar } from './NavigationSidebar';
import { TopNav } from './TopNav';

/**
 * Layout Props Interface
 * @interface LayoutProps
 * @property {ReactNode} children - Page content to render
 * @property {string} [title] - Page title for breadcrumb/header
 * @property {string} [description] - Page description for SEO
 */
interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

/**
 * Route Configuration for determining layout visibility
 * Centralized route management following industry best practices
 */
const ROUTE_CONFIG = {
  auth: ['/auth/login', '/auth/signup', '/auth/forgot-password', '/auth/verify', '/contact'],
  public: ['/'],
  docs: ['/docs', '/api'],
} as const;

/**
 * PrimaryLayout Component
 * 
 * Enterprise-grade layout wrapper that manages:
 * - Responsive sidebar (desktop collapsible, mobile overlay)
 * - Authentication-aware rendering
 * - Session state management
 * - Route-based layout visibility
 * 
 * @component
 * @example
 * ```tsx
 * <PrimaryLayout title="Dashboard" description="User dashboard">
 *   <Dashboard />
 * </PrimaryLayout>
 * ```
 * 
 * @param {LayoutProps} props - Component props
 * @returns {React.ReactElement}
 */
export function PrimaryLayout({ children, title, description }: LayoutProps) {
  // Authentication state
  const { data: session, status } = useSession();
  
  // Navigation state
  const pathname = usePathname();

  /**
   * Memoized route detection
   * Determines if current page should render the layout
   */
  const routeStatus = useMemo(() => {
    const isAuthPage = ROUTE_CONFIG.auth.some(route => pathname?.startsWith(route));
    const isPublicPage = pathname === '/';
    const isDocPage = ROUTE_CONFIG.docs.some(route => pathname?.startsWith(route));
    
    return {
      isAuthPage,
      isPublicPage,
      isDocPage,
      isProtectedPage: !isAuthPage && !isPublicPage && !isDocPage,
    };
  }, [pathname]);

  /**
   * Determine if layout should be displayed
   * Always show layout for protected pages - let individual pages handle auth redirects
   * Hide only for public/auth/doc pages
   */
  const showLayout = useMemo(
    () => routeStatus.isProtectedPage,
    [routeStatus.isProtectedPage]
  );

  // Render children without layout for non-protected pages
  if (!showLayout) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div 
        className="flex h-screen w-full bg-background"
        role="application"
        aria-label="Application layout"
      >
        {/* Navigation Sidebar - Responsive (desktop/mobile handled by native component) */}
        <NavigationSidebar />

        {/* Main Content Area with TopNav */}
        <SidebarInset className="flex flex-col overflow-hidden">
          {/* Top Navigation - Sticky Header */}
          <TopNav
            title={title}
            description={description}
          />

          {/* Main Content - Scrollable */}
          <main 
            className="flex-1 overflow-auto scroll-smooth"
            role="main"
            aria-label="Page content"
          >
            {/* Content Wrapper with Consistent Padding */}
            <div className="p-4 space-y-3 bg-gradient-to-br from-blue-50">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
