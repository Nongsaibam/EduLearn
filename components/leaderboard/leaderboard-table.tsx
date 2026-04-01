"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  user: {
    name: string
    avatar: string
    level: number
  }
  xp: number
  badges: number
  coursesCompleted: number
  streak: number
  trend: "up" | "down" | "same"
  trendValue?: number
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
}

const rankIcons: Record<number, React.ReactNode> = {
  1: <Trophy className="h-5 w-5 text-chart-3" />,
  2: <Medal className="h-5 w-5 text-muted-foreground" />,
  3: <Award className="h-5 w-5 text-chart-5" />,
}

const trendIcons = {
  up: <TrendingUp className="h-4 w-4 text-accent" />,
  down: <TrendingDown className="h-4 w-4 text-destructive" />,
  same: <Minus className="h-4 w-4 text-muted-foreground" />,
}

export function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-16 text-muted-foreground">Rank</TableHead>
            <TableHead className="text-muted-foreground">Student</TableHead>
            <TableHead className="text-right text-muted-foreground">XP</TableHead>
            <TableHead className="text-center text-muted-foreground hidden sm:table-cell">
              Badges
            </TableHead>
            <TableHead className="text-center text-muted-foreground hidden md:table-cell">
              Courses
            </TableHead>
            <TableHead className="text-center text-muted-foreground hidden lg:table-cell">
              Streak
            </TableHead>
            <TableHead className="w-20 text-right text-muted-foreground">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow
              key={entry.rank}
              className={`border-border ${
                entry.rank <= 3 ? "bg-primary/5" : ""
              } hover:bg-secondary/50`}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {rankIcons[entry.rank] || (
                    <span className="text-muted-foreground w-5 text-center">
                      {entry.rank}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={entry.user.avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {entry.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{entry.user.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      Level {entry.user.level}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold text-foreground">
                {entry.xp.toLocaleString()}
              </TableCell>
              <TableCell className="text-center hidden sm:table-cell">
                <Badge className="bg-chart-3/20 text-chart-3">{entry.badges}</Badge>
              </TableCell>
              <TableCell className="text-center text-foreground hidden md:table-cell">
                {entry.coursesCompleted}
              </TableCell>
              <TableCell className="text-center hidden lg:table-cell">
                <Badge variant="secondary">{entry.streak} days</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {trendIcons[entry.trend]}
                  {entry.trendValue && (
                    <span
                      className={`text-xs ${
                        entry.trend === "up"
                          ? "text-accent"
                          : entry.trend === "down"
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {entry.trend === "up" ? "+" : ""}
                      {entry.trendValue}
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
