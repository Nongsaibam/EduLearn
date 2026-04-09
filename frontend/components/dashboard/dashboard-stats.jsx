"use client";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, Trophy, Target } from "lucide-react";
const defaultStats = [
    {
        title: "Enrolled Courses",
        value: "12",
        change: "+2 this month",
        changeType: "positive",
        icon: <BookOpen className="h-5 w-5"/>,
    },
    {
        title: "Hours Learned",
        value: "156",
        change: "+24 this week",
        changeType: "positive",
        icon: <Clock className="h-5 w-5"/>,
    },
    {
        title: "XP Points",
        value: "4,850",
        change: "+350 today",
        changeType: "positive",
        icon: <Trophy className="h-5 w-5"/>,
    },
    {
        title: "Avg. Score",
        value: "87%",
        change: "+5% vs last month",
        changeType: "positive",
        icon: <Target className="h-5 w-5"/>,
    },
];
const iconMap = [BookOpen, Clock, Trophy, Target];
export function DashboardStats({ stats = defaultStats }) {
    return (<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
            const Icon = iconMap[index] || BookOpen;
            return (<Card key={index} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {stat.icon || <Icon className="h-5 w-5"/>}
              </div>
              <span className={`text-xs font-medium ${stat.changeType === "positive"
                ? "text-accent"
                : stat.changeType === "negative"
                    ? "text-destructive"
                    : "text-muted-foreground"}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>);
        })}
    </div>);
}
