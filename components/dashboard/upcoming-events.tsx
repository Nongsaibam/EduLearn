"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, FileText, Users } from "lucide-react"

interface Event {
  id: string
  title: string
  type: "live-class" | "deadline" | "quiz" | "meeting"
  date: string
  time: string
  course?: string
}

const events: Event[] = [
  {
    id: "1",
    title: "Live: Quantum Mechanics",
    type: "live-class",
    date: "Today",
    time: "3:00 PM",
    course: "Physics",
  },
  {
    id: "2",
    title: "Assignment Due",
    type: "deadline",
    date: "Tomorrow",
    time: "11:59 PM",
    course: "Mathematics",
  },
  {
    id: "3",
    title: "Quiz: Data Structures",
    type: "quiz",
    date: "Apr 3",
    time: "10:00 AM",
    course: "Computer Science",
  },
  {
    id: "4",
    title: "Study Group Meeting",
    type: "meeting",
    date: "Apr 4",
    time: "2:00 PM",
  },
]

const typeIcons = {
  "live-class": <Video className="h-4 w-4" />,
  deadline: <FileText className="h-4 w-4" />,
  quiz: <Calendar className="h-4 w-4" />,
  meeting: <Users className="h-4 w-4" />,
}

const typeColors = {
  "live-class": "bg-destructive/20 text-destructive",
  deadline: "bg-chart-3/20 text-chart-3",
  quiz: "bg-primary/20 text-primary",
  meeting: "bg-accent/20 text-accent",
}

export function UpcomingEvents() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary/50"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  typeColors[event.type]
                }`}
              >
                {typeIcons[event.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </span>
                </div>
              </div>
              {event.course && (
                <Badge variant="secondary" className="shrink-0 text-xs">
                  {event.course}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
