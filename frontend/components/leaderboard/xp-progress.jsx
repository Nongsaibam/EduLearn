"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Target, Star } from "lucide-react";
const defaultAchievements = [
    { id: "1", name: "Quick Learner", icon: <Zap className="h-4 w-4"/>, earned: true },
    { id: "2", name: "Top Performer", icon: <Trophy className="h-4 w-4"/>, earned: true },
    { id: "3", name: "Goal Setter", icon: <Target className="h-4 w-4"/>, earned: false, progress: 75 },
    { id: "4", name: "Star Student", icon: <Star className="h-4 w-4"/>, earned: false, progress: 45 },
];
export function XPProgress({ currentXP = 4850, nextLevelXP = 5000, level = 12, achievements = defaultAchievements }) {
    const progress = (currentXP / nextLevelXP) * 100;
    return (<Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {level}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Level {level}</p>
                <p className="text-xs text-muted-foreground">
                  {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {nextLevelXP - currentXP} XP to next level
            </Badge>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${progress}%` }}/>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Achievements</h4>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (<div key={achievement.id} className={`flex items-center gap-2 rounded-lg p-3 ${achievement.earned
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{achievement.name}</p>
                  {!achievement.earned && achievement.progress && (<div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-muted-foreground/50" style={{ width: `${achievement.progress}%` }}/>
                    </div>)}
                </div>
              </div>))}
          </div>
        </div>
      </CardContent>
    </Card>);
}
