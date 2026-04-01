"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 5 },
  { day: "Thu", hours: 8 },
  { day: "Fri", hours: 7 },
  { day: "Sat", hours: 3 },
  { day: "Sun", hours: 2 },
]

export function AttendanceChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Weekly Study Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.22 260)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.22 260)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
              <XAxis
                dataKey="day"
                stroke="oklch(0.65 0 0)"
                tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.25 0.02 260)" }}
              />
              <YAxis
                stroke="oklch(0.65 0 0)"
                tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.25 0.02 260)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.14 0.015 260)",
                  border: "1px solid oklch(0.25 0.02 260)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="oklch(0.65 0.22 260)"
                strokeWidth={2}
                fill="url(#colorHours)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
