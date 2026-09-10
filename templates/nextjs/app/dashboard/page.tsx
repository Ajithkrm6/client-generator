/**
 * Dashboard Page
 * Main user dashboard showing overview and quick actions
 * Uses modules: dashboard.store
 * All components use shadcn/ui for consistency
 */

'use client'

import { useSession } from 'next-auth/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useDashboardStore } from '@/modules/dashboard/store/dashboard.store'

export default function DashboardPage() {
  const { data: session } = useSession()
  const { stats, recentCases, quickActions, teamMembers, upcomingDeadlines, getStatusVariant, getStageVariant } =
    useDashboardStore()

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 border-0 text-white">
        <CardHeader>
          <CardTitle className="text-3xl text-white">
            Welcome back, {session?.user?.name || 'User'}
          </CardTitle>
          <CardDescription className="text-blue-100 text-base">
            Here&apos;s what&apos;s happening with your practice today
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                    {stat.trend}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{stat.title}</CardDescription>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={index} href={action.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <Icon className={`${action.color} mb-2`} size={28} />
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-blue-600 group-hover:translate-x-1 transition">
                      <span className="text-sm font-medium">Get Started</span>
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Cases */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Recent Cases</h2>
          <Link href="/workpool" className="text-blue-600 hover:text-blue-800 font-medium">
            View All →
          </Link>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-foreground">{caseItem.client}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {caseItem.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStageVariant(caseItem.stage)}>{caseItem.stage}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(caseItem.status)}>
                        {caseItem.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        View →
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Team Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members Online</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{deadline.task}</p>
                  <p className="text-sm text-muted-foreground">{deadline.date}</p>
                </div>
                <Badge
                  variant={deadline.daysLeft <= 5 ? 'destructive' : 'secondary'}
                  className="flex-shrink-0"
                >
                  {deadline.daysLeft}d
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
