"use client";
import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { BadgeCard } from "@/components/leaderboard/badge-card";
import { XPProgress } from "@/components/leaderboard/xp-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getLeaderboard, getStoredAuth } from "@/lib/api";
import { Trophy, Medal, Flame, Target } from "lucide-react";
export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState({ stats: {}, entries: [], badges: [] });
    const [error, setError] = useState("");
    const currentUser = getStoredAuth()?.user;
    useEffect(() => {
        getLeaderboard()
            .then(setLeaderboard)
            .catch((apiError) => setError(apiError.message || "Unable to load leaderboard"));
    }, []);
    const summaryStats = useMemo(() => [
        {
            label: "Your Rank",
            value: leaderboard.stats.rank || "#-",
            subtext: "Live ranking",
            icon: <Trophy className="h-5 w-5"/>,
            color: "text-chart-3",
        },
        {
            label: "Total XP",
            value: `${leaderboard.stats.totalXp || 0}`,
            subtext: `+${leaderboard.stats.todayXp || 0} today`,
            icon: <Target className="h-5 w-5"/>,
            color: "text-primary",
        },
        {
            label: "Badges",
            value: `${leaderboard.stats.badges || 0}`,
            subtext: `${leaderboard.stats.newBadgesThisWeek || 0} new this week`,
            icon: <Medal className="h-5 w-5"/>,
            color: "text-chart-4",
        },
        {
            label: "Streak",
            value: leaderboard.stats.streak || "0 days",
            subtext: "Keep it going",
            icon: <Flame className="h-5 w-5"/>,
            color: "text-destructive",
        },
    ], [leaderboard]);
    const earnedBadges = leaderboard.badges.filter((badge) => badge.earned).map((badge) => ({
        ...badge,
        description: `${badge.xp} XP reward`,
        rarity: badge.earned ? "rare" : "common",
        color: "bg-primary",
        icon: <Medal className="h-8 w-8 text-primary-foreground"/>,
        earnedDate: "Unlocked",
    }));
    const unearnedBadges = leaderboard.badges.filter((badge) => !badge.earned).map((badge) => ({
        ...badge,
        description: `${badge.xp} XP reward`,
        rarity: "epic",
        color: "bg-muted",
        icon: <Trophy className="h-8 w-8 text-primary-foreground"/>,
    }));
    return (<DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">
            Compete with peers and earn badges for your achievements
          </p>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat, index) => (<Card key={index} className="bg-card border-border">
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
            </Card>))}
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
                <LeaderboardTable entries={leaderboard.entries} currentUserId={currentUser?.id}/>
              </TabsContent>
              <TabsContent value="weekly">
                <LeaderboardTable entries={leaderboard.entries} currentUserId={currentUser?.id}/>
              </TabsContent>
              <TabsContent value="monthly">
                <LeaderboardTable entries={leaderboard.entries} currentUserId={currentUser?.id}/>
              </TabsContent>
              <TabsContent value="alltime">
                <LeaderboardTable entries={leaderboard.entries} currentUserId={currentUser?.id}/>
              </TabsContent>
            </Tabs>
          </div>

          {/* XP Progress */}
          <div>
            <XPProgress currentXP={currentUser?.xp} nextLevelXP={(currentUser?.level || 12) * 500} level={currentUser?.level}/>
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
                {earnedBadges.map((badge) => (<BadgeCard key={badge.id} badge={badge}/>))}
              </div>
            </TabsContent>
            <TabsContent value="available">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {unearnedBadges.map((badge) => (<BadgeCard key={badge.id} badge={badge}/>))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>);
}
