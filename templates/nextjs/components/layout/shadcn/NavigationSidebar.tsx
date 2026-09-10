'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {  Settings } from 'lucide-react';
import {
  ChevronDown,
  LayoutDashboard,
  FileText,
  Briefcase,
  TrendingUp,
  Home,
  Users,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { featureGate } from '@/utils/feature-gate';
import type { FeatureModuleKey } from '@/utils/features.config';

interface SubmenuItem {
  label: string;
  href: string;
  badge?: string;
  featureGate?: FeatureModuleKey;
  badgeVariant?: 'default' | 'pro' | 'beta' | 'beta-s1' | 'beta-s2' | 'beta-s3' | 'beta-s4' | 'beta-s5';
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  badge?: string;
  featureGate?: FeatureModuleKey;
  badgeVariant?: 'default' | 'pro' | 'beta' | 'beta-s1' | 'beta-s2' | 'beta-s3' | 'beta-s4' | 'beta-s5';
  submenu?: SubmenuItem[];
}

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
    icon: <Users className="w-5 h-5" />,
    label: 'Clients',
    featureGate: 'clients.management',
    badgeVariant: 'default',
    submenu: [
      {
        label: 'Client Directory',
        href: '/clients/directory',
        featureGate: 'clients.management',
        badgeVariant: 'default',
      },
      {
        label: 'Client Profiles',
        href: '/clients/profiles',
        featureGate: 'clients.management',
        badgeVariant: 'default',
      },
      {
        label: 'Add New Client',
        href: '/clients/add',
        featureGate: 'clients.management',
        badgeVariant: 'default',
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
    badgeVariant: 'beta-s1',

  }
];

/**
 * Badge variant color mapping
 */
const BADGE_VARIANT_MAP: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  default: 'default',
  pro: 'default',
  beta: 'secondary',
  'beta-s1': 'secondary',
  'beta-s2': 'secondary',
  'beta-s3': 'secondary',
  'beta-s4': 'secondary',
  'beta-s5': 'secondary',
};

/**
 * NavigationSidebar component using native shadcn Sidebar
 * Displays collapsible menu items with feature gating support
 */
export function NavigationSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Auto-expand menu items based on current pathname
  const autoExpandedItems = useMemo(() => {
    const expanded = new Set<string>();
    
    NAV_ITEMS.forEach((item) => {
      if (!item.submenu) return;
      
      // Check if any submenu item matches the current pathname
      const hasMatchingSubitem = item.submenu.some((subitem) => {
        const pathWithoutQuery = pathname.split('?')[0];
        const subitemPathWithoutQuery = subitem.href.split('?')[0];
        return pathWithoutQuery === subitemPathWithoutQuery;
      });
      
      if (hasMatchingSubitem) {
        expanded.add(item.label);
      }
    });
    
    return expanded;
  }, [pathname]);

  // Merge auto-expanded items with user-toggled expanded items
  const allExpandedItems = useMemo(() => {
    const merged = new Set(autoExpandedItems);
    expandedItems.forEach(item => merged.add(item));
    return merged;
  }, [autoExpandedItems, expandedItems]);

  // Filter visible nav items based on feature gates
  const visibleItems = useMemo(() => {
    return NAV_ITEMS.filter((item) => {
      // Home is always visible
      if (item.href === '/') return true;
      // Check if feature gate is enabled
      return !item.featureGate || featureGate.isEnabled(item.featureGate);
    });
  }, []);

  const toggleExpanded = (label: string) => {
    const newSet = new Set(expandedItems);
    if (newSet.has(label)) {
      newSet.delete(label);
    } else {
      newSet.add(label);
    }
    setExpandedItems(newSet);
  };

  const isItemActive = (href?: string) => {
    if (!href) return false;
    
    // For items with query parameters, compare the full path including query string
    if (href.includes('?')) {
      return pathname === href;
    }
    
    // For items without query params, compare base paths without query string
    const pathWithoutQuery = pathname.split('?')[0];
    const hrefWithoutQuery = href.split('?')[0];
    return pathWithoutQuery === hrefWithoutQuery;
  };

  return (
    <Sidebar >
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            K2
          </div>
          <span className="font-semibold text-sm">K2 Summit</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {visibleItems.map((item, idx) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isExpanded = allExpandedItems.has(item.label);

              if (!hasSubmenu) {
                return (
                  <SidebarMenuItem key={idx}>
                    <Link href={item.href || '/'}>
                      <SidebarMenuButton
                        isActive={isItemActive(item.href)}
                        className="relative w-full justify-start"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant={BADGE_VARIANT_MAP[item.badgeVariant || 'default']}
                            className="ml-auto text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              }

              // Filter submenu items based on feature gates
              const visibleSubmenu = (item.submenu || []).filter(
                (subitem) => !subitem.featureGate || featureGate.isEnabled(subitem.featureGate)
              );

              if (visibleSubmenu.length === 0) return null;

              return (
                <SidebarMenuItem key={idx}>
                  <div
                    onClick={() => toggleExpanded(item.label)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <Badge
                          variant={BADGE_VARIANT_MAP[item.badgeVariant || 'default']}
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <SidebarMenuSub>
                      {visibleSubmenu.map((subitem, subIdx) => (
                        <SidebarMenuSubItem key={subIdx}>
                          <SidebarMenuSubButton
                            href={subitem.href}
                            isActive={isItemActive(subitem.href)}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{subitem.label}</span>
                              {subitem.badge && (
                                <Badge
                                  variant={
                                    BADGE_VARIANT_MAP[subitem.badgeVariant || 'default']
                                  }
                                  className="text-xs"
                                >
                                  {subitem.badge}
                                </Badge>
                              )}
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        
      </SidebarContent>
      <SidebarFooter>
            <Button>Logout</Button>
        </SidebarFooter>
    </Sidebar>
  );
}
