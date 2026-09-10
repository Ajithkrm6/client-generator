'use client';

import { useMemo, useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronRight,
  ChevronDown,
  X,
  LayoutDashboard,
  Gavel,
  FileText,
  Settings,
  LogOut,
  Briefcase,
  TrendingUp,
  Home,
} from 'lucide-react';
import { Button } from '@/modules/shared/components/ui/button';
import { Badge } from '@/modules/shared/components/ui/badge';

/**
 * Submenu Item Interface
 * @interface SubmenuItem
 */
interface SubmenuItem {
  /** Display label for the submenu item */
  label: string;
  /** URL path for navigation */
  href: string;
  /** Optional badge text */
  badge?: string;
  /** Optional feature flag key */
  featureGate?: string;
  /** Optional badge color variant */
  badgeVariant?: 'default' | 'pro' | 'beta' | 'beta-s1' | 'beta-s2' | 'beta-s3' | 'beta-s4' | 'beta-s5';
}

/**
 * Navigation Item Interface
 * @interface NavItem
 */
interface NavItem {
  /** Icon component to display */
  icon: React.ReactNode;
  /** Display label for the navigation item */
  label: string;
  /** URL path for navigation (optional if has submenu) */
  href?: string;
  /** Optional badge text (e.g., "Pro", "Beta") */
  badge?: string;
  /** Optional feature flag key for conditional visibility */
  featureGate?: string;
  /** Optional badge color variant */
  badgeVariant?: 'default' | 'pro' | 'beta' | 'beta-s1' | 'beta-s2' | 'beta-s3' | 'beta-s4' | 'beta-s5';
  /** Optional submenu items for collapsible sections */
  submenu?: SubmenuItem[];
}

/**
 * Sidebar Props Interface
 * @interface SidebarProps
 */
interface SidebarProps {
  /** Whether sidebar is expanded or collapsed */
  isOpen?: boolean;
  /** Callback when toggle button is clicked */
  onToggle?: () => void;
  /** Whether to show toggle button (desktop) */
  showToggleButton?: boolean;
  /** Whether in mobile mode */
  isMobile?: boolean;
  /** Page title for accessibility */
  pageTitle?: string;
}

/**
 * Navigation items configuration
 * Aligned with K2 MVP Specification S0-S5 delivery stages
 * Features marked with stage badges indicate availability per delivery stage
 */
const NAV_ITEMS: NavItem[] = [
  {
    icon: <Home className="w-5 h-5" />,
    label: 'Home',
    href: '/',
  },
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: 'Operations',
    featureGate: 'ops.dashboard',
    badgeVariant: 'default',
    submenu: [
      {
        label: 'Team Dashboard',
        href: '/dashboard',
        featureGate: 'ops.dashboard',
        badgeVariant: 'default',
      },
      {
        label: 'KPI Metrics',
        href: '/ops',
        featureGate: 'ops.dashboard',
        badgeVariant: 'default',
      },
    ],
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    label: 'Workpool',
    featureGate: 'workpool.intake',
    badgeVariant: 'beta-s1',
    submenu: [
      {
        label: 'Client Intake',
        href: '/workpool/intake',
        featureGate: 'workpool.intake',
        badgeVariant: 'beta-s1',
      },
      {
        label: 'Returns Queue',
        href: '/workpool/labor-prep',
        featureGate: 'workpool.labor-prep',
        badgeVariant: 'beta-s1',
      },
      {
        label: 'QC Review',
        href: '/workpool/qc',
        featureGate: 'workpool.qc-review',
        badgeVariant: 'beta-s2',
        badge: 'S2',
      },
    ],
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    label: 'Tax Strategy',
    badge: 'Pro',
    featureGate: 'strategy.report-generator',
    badgeVariant: 'pro',
    submenu: [
      {
        label: 'Report Generator',
        href: '/strategy?tab=report',
        featureGate: 'strategy.report-generator',
        badgeVariant: 'pro',
      },
      {
        label: 'Tax Planning',
        href: '/strategy?tab=planning',
        featureGate: 'strategy.report-generator',
        badgeVariant: 'pro',
      },
      {
        label: 'Client Analysis',
        href: '/strategy?tab=analysis',
        featureGate: 'strategy.report-generator',
        badgeVariant: 'pro',
      },
    ],
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: 'Documents',
    featureGate: 'documents.reference',
    submenu: [
      {
        label: 'Reference Library',
        href: '/documents?tab=library',
        featureGate: 'documents.reference',
      },
      {
        label: 'Document Repository',
        href: '/documents?tab=repository',
        featureGate: 'documents.reference',
      },
      {
        label: 'Upload & Manage',
        href: '/documents?tab=upload',
        featureGate: 'documents.reference',
      },
    ],
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: 'Settings',
    href: '/settings',
  },
];

/**
 * Badge style classes for custom variants
 */
const BADGE_CLASSES = {
  default: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  pro: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
  beta: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
  'beta-s1': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  'beta-s2': 'bg-cyan-100 text-cyan-700 hover:bg-cyan-100',
  'beta-s3': 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100',
  'beta-s4': 'bg-rose-100 text-rose-700 hover:bg-rose-100',
  'beta-s5': 'bg-orange-100 text-orange-700 hover:bg-orange-100',
} as const;

/**
 * Sidebar Component
 * 
 * Responsive navigation sidebar with:
 * - Desktop collapse/expand toggle using shadcn Button
 * - Mobile overlay with close button using shadcn Button
 * - Feature flag integration (ready)
 * - Active route highlighting
 * - Badge support using shadcn Badge (Pro, Beta, Stage indicators)
 * - Navigation links as shadcn Button components
 * 
 * @component
 * @param {SidebarProps} props - Component props
 * @returns {React.ReactElement}
 * 
 * @example
 * ```tsx
 * <Sidebar 
 *   isOpen={true}
 *   onToggle={() => setOpen(!open)}
 *   showToggleButton
 * />
 * ```
 */
export function Sidebar({
  isOpen = true,
  onToggle,
  showToggleButton = true,
  isMobile = false,
  pageTitle,
}: SidebarProps) {
  // Current pathname for active link detection
  const pathname = usePathname();
  
  // State for expanded submenus
  const [expandedSubmenus, setExpandedSubmenus] = useState<Record<string, boolean>>({
    'Workpool': true, // Workpool expanded by default
    'Operations': false,
    'Tax Strategy': false,
    'Documents': false,
  });
  
  // Calculate sidebar width based on open state
  const sidebarWidth = isOpen ? 'w-64' : 'w-20';
  const baseClasses = isMobile ? 'w-64' : sidebarWidth;

  /**
   * Toggle submenu expanded state
   */
  const toggleSubmenu = useCallback((label: string) => {
    setExpandedSubmenus(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  }, []);

  /**
   * Determine if a navigation item is currently active
   * Supports partial path matching (e.g., /dashboard/* matches /dashboard)
   */
  const isActive = useCallback((href?: string) => {
    if (!href || !pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) || false;
  }, [pathname]);

  /**
   * Check if submenu item or any parent is active
   */
  const isSubmenuActive = useCallback((submenu?: SubmenuItem[]) => {
    if (!submenu) return false;
    return submenu.some(item => isActive(item.href));
  }, [isActive]);

  /**
   * Memoized navigation items
   * Ready for future feature gate filtering
   */
  const filteredNavItems = useMemo(() => {
    return NAV_ITEMS;
    // TODO: Filter based on useFeature() when integrated
    // return NAV_ITEMS.filter(item => {
    //   if (!item.featureGate) return true;
    //   return useFeature(item.featureGate);
    // });
  }, []);

  /**
   * Get badge variant class
   */
  const getBadgeClass = useCallback((variant?: NavItem['badgeVariant']) => {
    return BADGE_CLASSES[variant || 'default'];
  }, []);

  return (
    <aside
      className={`${baseClasses} h-screen overflow-x-hidden overflow-y-auto scrollbar-hide bg-card border-r border-border-gray-50 transition-all duration-300 ease-in-out flex flex-col`}
      role="navigation"
      aria-label={pageTitle ? `${pageTitle} navigation` : 'Main navigation'}
      aria-expanded={isOpen}
    >
      {/* Header Section - Logo & Toggle */}
      <div className="flex items-center justify-between gap-3 p-4 border-b border-border flex-shrink-0">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 min-w-0">
          {/* Logo Badge */}
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white font-bold text-sm">K2</span>
          </div>

          {/* Brand Name - Hidden when collapsed */}
          {(isOpen || isMobile) && (
            <div>
              <h2 className="font-semibold text-sm truncate text-foreground">K2 Summit</h2>
              <p className="text-xs text-muted-foreground">Workpool Platform</p>
            </div>
          )}
        </div>

        {/* Toggle Button - Desktop Only (Using shadcn Button) */}
        {showToggleButton && !isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-pressed={isOpen}
            className="h-8 w-8 p-0 flex-shrink-0"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-300 ${
                !isOpen ? 'rotate-180' : ''
              }`}
            />
          </Button>
        )}

        {/* Close Button - Mobile Only (Using shadcn Button) */}
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            aria-label="Close navigation sidebar"
            className="h-8 w-8 p-0 flex-shrink-0 md:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4" role="navigation" aria-label="Site navigation">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isSubmenuExpanded = hasSubmenu && expandedSubmenus[item.label];
            const active = !hasSubmenu && isActive(item.href);
            const submenuActive = hasSubmenu && isSubmenuActive(item.submenu);
            
            return (
              <li key={item.label}>
                {hasSubmenu ? (
                  <>
                    {/* Submenu Parent Button */}
                    <Button
                      variant="ghost"
                      onClick={() => toggleSubmenu(item.label)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group ${
                        submenuActive
                          ? 'bg-primary/10 text-primary shadow-sm'
                          : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                      }`}
                      title={!isOpen && !isMobile ? item.label : undefined}
                    >
                      {/* Icon */}
                      <span className="flex-shrink-0">
                        {item.icon}
                      </span>

                      {/* Label & Badge - Show when open or on mobile */}
                      {(isOpen || isMobile) && (
                        <>
                          <span className="flex-1 text-sm font-medium truncate text-left">
                            {item.label}
                          </span>

                          {/* Badge using shadcn Badge component */}
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className={`flex-shrink-0 ${getBadgeClass(item.badgeVariant)}`}
                            >
                              {item.badge}
                            </Badge>
                          )}

                          {/* Chevron for submenu */}
                          <ChevronDown
                            className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                              isSubmenuExpanded ? '' : '-rotate-90'
                            }`}
                          />
                        </>
                      )}
                    </Button>

                    {/* Submenu Items */}
                    {isSubmenuExpanded && (isOpen || isMobile) && item.submenu && (
                      <ul className="mt-1 ml-3 space-y-1 border-l border-muted-foreground/20 pl-3">
                        {item.submenu.map((subitem, index) => {
                          const subitemActive = isActive(subitem.href);
                          return (
                            <li key={`${item.label}-${index}`}>
                              <Link
                                href={subitem.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group text-sm ${
                                  subitemActive
                                    ? 'bg-primary/10 text-primary shadow-sm'
                                    : 'text-foreground/60 hover:bg-muted hover:text-foreground'
                                }`}
                                aria-current={subitemActive ? 'page' : undefined}
                              >
                                <span className="flex-1 truncate">
                                  {subitem.label}
                                </span>
                                {subitem.badge && (
                                  <Badge
                                    variant="secondary"
                                    className={`flex-shrink-0 text-xs ${getBadgeClass(subitem.badgeVariant)}`}
                                  >
                                    {subitem.badge}
                                  </Badge>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  /* Regular Navigation Item */
                  <Link
                    href={item.href!}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group ${
                      active
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                    }`}
                    title={!isOpen && !isMobile ? item.label : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    {/* Icon */}
                    <span className="flex-shrink-0">
                      {item.icon}
                    </span>

                    {/* Label & Badge - Show when open or on mobile */}
                    {(isOpen || isMobile) && (
                      <>
                        <span className="flex-1 text-sm font-medium truncate">
                          {item.label}
                        </span>

                        {/* Badge using shadcn Badge component */}
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className={`flex-shrink-0 ${getBadgeClass(item.badgeVariant)}`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Section - Logout (Using shadcn Button) */}
      <div className="border-t border-border p-4 flex-shrink-0">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-auto py-2 px-3 text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Logout from application"
          title="Logout"
        >
          <span className="flex-shrink-0">
            <LogOut className="w-5 h-5" />
          </span>
          {(isOpen || isMobile) && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </Button>
      </div>
    </aside>
  );
}
