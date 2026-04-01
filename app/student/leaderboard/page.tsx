"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { BadgeCard, allBadges } from "@/components/leaderboard/badge-card"
import { XPProgress } from "@/components/leaderboard/xp-progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Flame, Target } from "lucide-react"

const leaderboardEntries = [
  {
    rank: 1,
    user: { name: "Emma Wilson", avatar: "/placeholder.svg", level: 24 },
    xp: 12450,
    badges: 18,
    coursesCompleted: 15,
    streak: 45,
    trend: "same" as const,
  },
  {
    rank: 2,
    user: { name: "James Chen", avatar: "/placeholder.svg", level: 22 },
    xp: 11200,
    badges: 16,
    coursesCompleted: 14,
    streak: 32,
    trend: "up" as const,
    trendValue: 2,
  },
  {
    rank: 3,
    user: { name: "Sarah Miller", avatar: "/placeholder.svg", level: 21 },
    xp: 10850,
    badges: 15,
    coursesCompleted: 13,
    streak: 28,
    trend: "down" as const,
    trendValue: 1,
  },
  {
    rank: 4,
    user: { name: "John Doe", avatar: "/placeholder.svg", level: 12 },
    xp: 4850,
    badges: 6,
    coursesCompleted: 5,
    streak: 14,
    trend: "up" as const,
    trendValue: 3,
  },
  {
    rank: 5,
    user: { name: "Lisa Wang", avatar: "/placeholder.svg", level: 18 },
    xp: 8900,
    badges: 12,
    coursesCompleted: 10,
    streak: 21,
    trend: "same" as const,
  },
  {
    rank: 6,
    user: { name: "Michael Brown", avatar: "/placeholder.svg", level: 17 },
    xp: 8200,
    badges: 11,
    coursesCompleted: 9,
    streak: 18,
    trend: "up" as const,
    trendValue: 1,
  },
  {
    rank: 7,
    user: { name: "Emily Davis", avatar: "/placeholder.svg", level: 16 },
    xp: 7500,
    badges: 10,
    coursesCompleted: 8,
    streak: 15,
    trend: "down" as const,
    trendValue: 2,
  },
  {
    rank: 8,
    user: { name: "David Kim", avatar: "/placeholder.svg", level: 15 },
    xp: 6800,
    badges: 9,
    coursesCompleted: 7,
    streak: 12,
    trend: "same" as const,
  },
  {
    rank: 9,
    user: { name: "Jessica Lee", avatar: "/placeholder.svg", level: 14 },
    xp: 6200,
    badges: 8,
    coursesCompleted: 6,
    streak: 10,
    trend: "up" as const,
    trendValue: 4,
  },
  {
    rank: 10,
    user: { name: "Ryan Taylor", avatar: "/placeholder.svg", level: 13 },
    xp: 5500,
    badges: 7,
    coursesCompleted: 5,
    streak: 8,
    trend: "down" as const,
    trendValue: 1,
  },
]

const stats = [
  {
    label: "Your Rank",
    value: "#4",
    subtext: "Top 10%",
    icon: <Trophy className="h-5 w-5" />,
    color: "text-chart-3",
  },
  {
    label: "Total XP",
    value: "4,850",
    subtext: "+350 today",
    icon: <Target className="h-5 w-5" />,
    color: "text-primary",
  },
  {
    label: "Badges",
    value: "6",
    subtext: "2 new this week",
    icon: <Medal className="h-5 w-5" />,
    color: "text-chart-4",
  },
  {
    label: "Streak",
    value: "14 days",
    subtext: "Personal best!",
    icon: <Flame className="h-5 w-5" />,
    color: "text-destructive",
  },
]

export default function LeaderboardPage() {
  const earnedBadges = allBadges.filter((b) => b.earned)
  const unearnedBadges = allBadges.filter((b) => !b.earned)

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">
            Compete with peers and earn badges for your achievements
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="flex items-center gap-4 p-4">
                <div className={stat.color}>{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {stat.subtext}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Leaderboard Table */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="weekly" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Rankings</h2>
                <TabsList className="bg-secondary">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="alltime">All Time</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="daily">
                <LeaderboardTable entries={leaderboardEntries} />
              </TabsContent>
              <TabsContent value="weekly">
                <LeaderboardTable entries={leaderboardEntries} />
              </TabsContent>
              <TabsContent value="monthly">
                <LeaderboardTable entries={leaderboardEntries} />
              </TabsContent>
              <TabsContent value="alltime">
                <LeaderboardTable entries={leaderboardEntries} />
              </TabsContent>
            </Tabs>
          </div>

          {/* XP Progress */}
          <div>
            <XPProgress />
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Achievements & Badges</h2>
          <Tabs defaultValue="earned" className="space-y-4">
            <TabsList className="bg-secondary">
              <TabsTrigger value="earned">
                Earned ({earnedBadges.length})
              </TabsTrigger>
              <TabsTrigger value="available">
                Available ({unearnedBadges.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="earned">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {earnedBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="available">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {unearnedBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
