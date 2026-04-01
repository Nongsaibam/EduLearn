"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CourseProgress {
  name: string
  progress: number
  color: string
}

const courses: CourseProgress[] = [
  { name: "Mathematics", progress: 85, color: "bg-chart-1" },
  { name: "Physics", progress: 72, color: "bg-chart-2" },
  { name: "Computer Science", progress: 90, color: "bg-chart-3" },
  { name: "English Literature", progress: 65, color: "bg-chart-4" },
]

export function PerformanceCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Course Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {courses.map((course, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{course.name}</span>
              <span className="text-sm text-muted-foreground">{course.progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full ${course.color} transition-all duration-500`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
