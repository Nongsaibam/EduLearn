"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, BookOpen, Clock, Star } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  type: "course" | "topic" | "practice"
  reason: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  rating: number
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "Advanced Linear Algebra",
    type: "course",
    reason: "Based on your strong calculus performance",
    duration: "8 weeks",
    difficulty: "Advanced",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Quantum Computing Basics",
    type: "topic",
    reason: "Popular among similar learners",
    duration: "4 weeks",
    difficulty: "Intermediate",
    rating: 4.9,
  },
  {
    id: "3",
    title: "Algorithm Practice Set",
    type: "practice",
    reason: "Strengthen your problem-solving skills",
    duration: "2 hours",
    difficulty: "Intermediate",
    rating: 4.7,
  },
]

const difficultyColors = {
  Beginner: "bg-accent/20 text-accent",
  Intermediate: "bg-chart-3/20 text-chart-3",
  Advanced: "bg-chart-1/20 text-chart-1",
}

export function AIRecommendationCard() {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-foreground">AI Recommendations</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">Personalized suggestions based on your learning patterns</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col gap-3 p-4 transition-colors hover:bg-secondary/30 sm:flex-row sm:items-center"
            >
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-medium text-foreground">{rec.title}</h4>
                  <Badge className={difficultyColors[rec.difficulty]}>{rec.difficulty}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.reason}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {rec.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-chart-3 text-chart-3" />
                    {rec.rating}
                  </span>
                </div>
              </div>
              <Button size="sm" className="shrink-0">
                <BookOpen className="mr-2 h-4 w-4" />
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
