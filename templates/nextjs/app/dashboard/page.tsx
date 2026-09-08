/**
 * Dashboard Page Example
 * Shows how to use layout components, UI components, and stores together
 * This is a reference implementation - modify to fit your needs
 */

'use client'

import React, { useState } from 'react'
import { BarChart3, Users, FileText, TrendingUp } from 'lucide-react'
import { TopNav } from '@/components/layout/TopNav'
import { SideNav } from '@/components/layout/SideNav'
import { LayoutPrimaryChild } from '@/components/layout/LayoutPrimaryChild'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  trend: 'up' | 'down'
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <TrendingUp className={`h-3 w-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
        <span>{change}</span>
      </div>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const [sideNavOpen, setSideNavOpen] = useState(false)

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+2.5% from last month',
      icon: <BarChart3 className="h-4 w-4" />,
      trend: 'up' as const,
    },
    {
      title: 'Active Users',
      value: '2,345',
      change: '+12 this week',
      icon: <Users className="h-4 w-4" />,
      trend: 'up' as const,
    },
    {
      title: 'Transactions',
      value: '1,234',
      change: '-3% from last month',
      icon: <FileText className="h-4 w-4" />,
      trend: 'down' as const,
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '+4.3% this quarter',
      icon: <TrendingUp className="h-4 w-4" />,
      trend: 'up' as const,
    },
  ]

  const recentActivities = [
    { id: 1, title: 'New user registered', time: '2 minutes ago', type: 'user' },
    { id: 2, title: 'Payment processed', time: '15 minutes ago', type: 'payment' },
    { id: 3, title: 'New feature deployed', time: '1 hour ago', type: 'system' },
    { id: 4, title: 'User feedback received', time: '2 hours ago', type: 'feedback' },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <SideNav isOpen={sideNavOpen} onClose={() => setSideNavOpen(false)} />

      <div className="flex flex-1 flex-col">
        <TopNav onMenuClick={() => setSideNavOpen(!sideNavOpen)} userName="John Doe" />

        <LayoutPrimaryChild>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your application.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Chart Section */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Chart</CardTitle>
                <CardDescription>
                  Your revenue data for the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="mx-auto mb-2 h-8 w-8 opacity-50" />
                  <p>Chart component would render here</p>
                </div>
              </CardContent>
            </Card>

            {/* Activity Section */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Last 4 activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div className="flex-1 text-sm">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks you can perform
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button>View Reports</Button>
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Settings</Button>
                <Button variant="outline">Help & Support</Button>
              </CardContent>
            </Card>
          </div>

          {/* Reference Note */}
          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
            <h3 className="font-semibold">📝 Note for Development</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This is a reference dashboard page showing how to use the layout components
              (TopNav, SideNav, LayoutPrimaryChild) together with UI components. Use this
              as a template for your own dashboard pages.
            </p>
          </div>
        </LayoutPrimaryChild>
      </div>
    </div>
  )
}
