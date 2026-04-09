"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Trophy, Target, Star, Flame, BookOpen, Award, Crown, } from "lucide-react";
const rarityColors = {
    common: "border-muted-foreground/30",
    rare: "border-primary",
    epic: "border-chart-4",
    legendary: "border-chart-3",
};
const rarityBadgeColors = {
    common: "bg-muted text-muted-foreground",
    rare: "bg-primary/20 text-primary",
    epic: "bg-chart-4/20 text-chart-4",
    legendary: "bg-chart-3/20 text-chart-3",
};
export function BadgeCard({ badge }) {
    return (<Card className={`bg-card border-2 transition-all ${badge.earned
            ? `${rarityColors[badge.rarity]} shadow-lg`
            : "border-border opacity-50 grayscale"}`}>
      <CardContent className="p-4 text-center">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${badge.color} ${badge.earned ? "" : "bg-muted"}`}>
          {badge.icon}
        </div>
        <h3 className="mt-3 font-semibold text-foreground">{badge.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
          {badge.description}
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Badge className={rarityBadgeColors[badge.rarity]}>{badge.rarity}</Badge>
          {badge.earned && badge.earnedDate && (<span className="text-xs text-muted-foreground">{badge.earnedDate}</span>)}
        </div>
      </CardContent>
    </Card>);
}
export const allBadges = [
    {
        id: "1",
        name: "Quick Learner",
        description: "Complete 5 lessons in a single day",
        icon: <Zap className="h-8 w-8 text-primary-foreground"/>,
        color: "bg-primary",
        earned: true,
        earnedDate: "Mar 15",
        rarity: "common",
    },
    {
        id: "2",
        name: "Top Performer",
        description: "Score 100% on any quiz",
        icon: <Trophy className="h-8 w-8 text-primary-foreground"/>,
        color: "bg-chart-3",
        earned: true,
        earnedDate: "Mar 20",
        rarity: "rare",
    },
    {
        id: "3",
        name: "Goal Setter",
        description: "Complete 10 courses",
        icon: <Target className="h-8 w-8 text-primary-foreground"/>,
        color: "bg-accent",
        earned: false,
        rarity: "epic",
    },
    {
        id: "4",
        name: "Star Student",
        description: "Maintain a 30-day learning streak",
        icon: <Star className="h-8 w-8 text-primary-foreground"/>,
        color: "bg-chart-4",
        earned: false,
        rarity: "legendary",
    },
    {
        id: "5",
        name: "On Fire",
        description: "7-day learning streak",
        icon: <Flame className="h-8 w-8 text-primary-foreground"/>,
        color: "bg-destructive",
        earned: true,
        earnedDate: "Mar 22",
        rarity: "common",
    },
    {
        id: "6",
        name: "Bookworm",
        description: "Complete 50 lessons",
        icon: <BookOpen className="h-8 w-8 text-primary-foreground"/>,
        color: "bg-chart-5",
        earned: true,
        earnedDate: "Mar 18",
        rarity: "rare",
    },
    {
        id: "7",
        name: "Overachiever",
        description: "Earn 10,000 XP",
        icon: <Award className="h-8 w-8 text-primary-foreground"/>,
        color: "bg-chart-2",
        earned: false,
        rarity: "epic",
    },
    {
        id: "8",
        name: "Champion",
        description: "Reach #1 on the leaderboard",
        icon: <Crown className="h-8 w-8 text-primary-foreground"/>,
        color: "bg-chart-3",
        earned: false,
        rarity: "legendary",
    },
];
