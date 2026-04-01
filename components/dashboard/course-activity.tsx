"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Play, FileText, MessageSquare } from "lucide-react"

interface Activity {
  id: string
  type: "video" | "assignment" | "discussion"
  title: string
  course: string
  time: string
  instructor: {
    name: string
    avatar: string
  }
}

const activities: Activity[] = [
  {
    id: "1",
    type: "video",
    title: "Introduction to Calculus",
    course: "Mathematics",
    time: "2 hours ago",
    instructor: { name: "Dr. Smith", avatar: "/placeholder.svg" },
  },
  {
    id: "2",
    type: "assignment",
    title: "Problem Set 5 - Due Soon",
    course: "Physics",
    time: "5 hours ago",
    instructor: { name: "Prof. Johnson", avatar: "/placeholder.svg" },
  },
  {
    id: "3",
    type: "discussion",
    title: "Q&A: Data Structures",
    course: "Computer Science",
    time: "1 day ago",
    instructor: { name: "Dr. Chen", avatar: "/placeholder.svg" },
  },
  {
    id: "4",
    type: "video",
    title: "Shakespeare Analysis",
    course: "English Literature",
    time: "2 days ago",
    instructor: { name: "Prof. Williams", avatar: "/placeholder.svg" },
  },
]

const typeIcons = {
  video: <Play className="h-4 w-4" />,
  assignment: <FileText className="h-4 w-4" />,
  discussion: <MessageSquare className="h-4 w-4" />,
}

const typeColors = {
  video: "bg-chart-1/20 text-chart-1",
  assignment: "bg-chart-3/20 text-chart-3",
  discussion: "bg-chart-2/20 text-chart-2",
}

export function CourseActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-secondary/50"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  typeColors[activity.type]
                }`}
              >
                {typeIcons[activity.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {activity.course}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={activity.instructor.avatar} />
                <AvatarFallback className="text-xs bg-primary/20 text-primary">
                  {activity.instructor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
