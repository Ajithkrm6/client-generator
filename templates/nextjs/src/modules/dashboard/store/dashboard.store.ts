/**
 * Dashboard Store
 * Centralized state management for dashboard data using Zustand
 * Contains stats, cases, quick actions, team members, and deadlines
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  BarChart3,
  Users,
  FileText,
  Zap,
} from 'lucide-react'

export interface Stat {
  title: string
  value: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
  trend: string
}

export interface CaseItem {
  id: number
  client: string
  type: string
  status: 'Completed' | 'In Progress' | 'Draft'
  stage: string
}

export interface QuickAction {
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  href: string
  color: string
}

export interface TeamMember {
  name: string
  role: string
  status: 'online' | 'away' | 'offline'
}

export interface Deadline {
  task: string
  date: string
  daysLeft: number
}

interface DashboardState {
  stats: Stat[]
  recentCases: CaseItem[]
  quickActions: QuickAction[]
  teamMembers: TeamMember[]
  upcomingDeadlines: Deadline[]

  // Helper methods
  getStatusVariant: (status: string) => 'default' | 'secondary' | 'destructive' | 'outline'
  getStageVariant: (stage: string) => 'default' | 'secondary' | 'destructive' | 'outline'
  updateStats: (stats: Stat[]) => void
  updateRecentCases: (cases: CaseItem[]) => void
  updateTeamMembers: (members: TeamMember[]) => void
  updateDeadlines: (deadlines: Deadline[]) => void
}

export const useDashboardStore = create<DashboardState>()(
  immer((set) => ({
    stats: [
      {
        title: 'Active Cases',
        value: '24',
        icon: FileText,
        color: 'bg-blue-500',
        trend: '+2 this week',
      },
      {
        title: 'Clients',
        value: '156',
        icon: Users,
        color: 'bg-green-500',
        trend: '+8 new',
      },
      {
        title: 'Revenue',
        value: '$48.5K',
        icon: BarChart3,
        color: 'bg-purple-500',
        trend: '+12% vs last month',
      },
      {
        title: 'Team Members',
        value: '8',
        icon: Users,
        color: 'bg-orange-500',
        trend: 'All active',
      },
    ],

    recentCases: [
      {
        id: 1,
        client: 'Acme Corp',
        type: 'Individual Tax Return',
        status: 'In Progress',
        stage: 'QC Review',
      },
      {
        id: 2,
        client: 'Tech Startup Inc',
        type: 'Business Tax Return',
        status: 'Completed',
        stage: 'Ready for Filing',
      },
      {
        id: 3,
        client: 'Jane Smith',
        type: 'Individual Tax Return',
        status: 'In Progress',
        stage: 'Labor Prep',
      },
      {
        id: 4,
        client: 'Enterprise LLC',
        type: 'Entity Structure Planning',
        status: 'Draft',
        stage: 'Strategy',
      },
    ],

    quickActions: [
      {
        title: 'Create New Intake',
        description: 'Start a new client onboarding',
        icon: Zap,
        href: '/workpool/intake',
        color: 'text-blue-600',
      },
      {
        title: 'View Labor Queue',
        description: 'Check returns ready for preparation',
        icon: FileText,
        href: '/workpool/labor-prep',
        color: 'text-green-600',
      },
      {
        title: 'QC Reviews',
        description: 'Review returns awaiting approval',
        icon: Users,
        href: '/workpool/qc',
        color: 'text-purple-600',
      },
      {
        title: 'Strategy Reports',
        description: 'Generate tax planning reports',
        icon: BarChart3,
        href: '/strategy',
        color: 'text-orange-600',
      },
    ],

    teamMembers: [
      { name: 'Sarah Johnson', role: 'Senior CPA', status: 'online' },
      { name: 'Mike Chen', role: 'Tax Preparer', status: 'online' },
      { name: 'Lisa Davis', role: 'QC Reviewer', status: 'away' },
    ],

    upcomingDeadlines: [
      { task: 'John Smith - 1040 Filing', date: 'Apr 10, 2026', daysLeft: 3 },
      { task: 'Acme Corp - Tax Planning', date: 'Apr 15, 2026', daysLeft: 8 },
      { task: 'Quarterly Review Meeting', date: 'Apr 20, 2026', daysLeft: 13 },
    ],

    getStatusVariant: (status: string) => {
      switch (status) {
        case 'Completed':
          return 'default'
        case 'In Progress':
          return 'secondary'
        case 'Draft':
          return 'outline'
        default:
          return 'default'
      }
    },

    getStageVariant: (stage: string) => {
      switch (stage) {
        case 'QC Review':
          return 'secondary'
        case 'Labor Prep':
          return 'secondary'
        case 'Ready for Filing':
          return 'default'
        case 'Strategy':
          return 'secondary'
        default:
          return 'outline'
      }
    },

    updateStats: (stats: Stat[]) => {
      set((state) => {
        state.stats = stats
      })
    },

    updateRecentCases: (cases: CaseItem[]) => {
      set((state) => {
        state.recentCases = cases
      })
    },

    updateTeamMembers: (members: TeamMember[]) => {
      set((state) => {
        state.teamMembers = members
      })
    },

    updateDeadlines: (deadlines: Deadline[]) => {
      set((state) => {
        state.upcomingDeadlines = deadlines
      })
    },
  }))
)

export default useDashboardStore
