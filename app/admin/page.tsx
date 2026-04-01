"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  UserPlus,
  FileText,
  AlertTriangle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const stats = [
  {
    title: "Total Students",
    value: "12,456",
    change: "+12%",
    changeType: "positive",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Active Courses",
    value: "156",
    change: "+8%",
    changeType: "positive",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Certificates Issued",
    value: "3,892",
    change: "+24%",
    changeType: "positive",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "Completion Rate",
    value: "78%",
    change: "-2%",
    changeType: "negative",
    icon: <TrendingUp className="h-5 w-5" />,
  },
]

const enrollmentData = [
  { month: "Jan", students: 4000, courses: 24 },
  { month: "Feb", students: 4500, courses: 28 },
  { month: "Mar", students: 5200, courses: 32 },
  { month: "Apr", students: 5800, courses: 35 },
  { month: "May", students: 6500, courses: 40 },
  { month: "Jun", students: 7200, courses: 45 },
]

const courseDistribution = [
  { name: "Computer Science", value: 35, color: "oklch(0.65 0.22 260)" },
  { name: "Mathematics", value: 25, color: "oklch(0.65 0.18 150)" },
  { name: "Physics", value: 20, color: "oklch(0.75 0.15 85)" },
  { name: "Literature", value: 12, color: "oklch(0.65 0.2 310)" },
  { name: "Other", value: 8, color: "oklch(0.6 0.18 200)" },
]

const recentUsers = [
  { name: "Emma Wilson", email: "emma@example.com", role: "Student", status: "Active", joined: "Today" },
  { name: "James Chen", email: "james@example.com", role: "Teacher", status: "Active", joined: "Yesterday" },
  { name: "Sarah Miller", email: "sarah@example.com", role: "Student", status: "Pending", joined: "2 days ago" },
  { name: "Michael Brown", email: "michael@example.com", role: "Student", status: "Active", joined: "3 days ago" },
]

const alerts = [
  { type: "warning", message: "5 assignments pending review", time: "2 hours ago" },
  { type: "info", message: "New course 'AI Fundamentals' published", time: "4 hours ago" },
  { type: "warning", message: "Server maintenance scheduled", time: "1 day ago" },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of platform performance and management
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                  <Badge
                    className={
                      stat.changeType === "positive"
                        ? "bg-accent/20 text-accent"
                        : "bg-destructive/20 text-destructive"
                    }
                  >
                    {stat.changeType === "positive" ? (
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Enrollment Trends */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Enrollment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentData}>
                    <defs>
                      <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.65 0.22 260)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.65 0.22 260)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
                    <XAxis
                      dataKey="month"
                      stroke="oklch(0.65 0 0)"
                      tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
                    />
                    <YAxis
                      stroke="oklch(0.65 0 0)"
                      tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
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
                      dataKey="students"
                      stroke="oklch(0.65 0.22 260)"
                      strokeWidth={2}
                      fill="url(#colorStudents)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Course Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Course Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courseDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {courseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.14 0.015 260)",
                        border: "1px solid oklch(0.25 0.02 260)",
                        borderRadius: "8px",
                        color: "oklch(0.95 0 0)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {courseDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Users */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Recent Users</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {user.role}
                      </Badge>
                      <Badge
                        className={
                          user.status === "Active"
                            ? "bg-accent/20 text-accent"
                            : "bg-chart-3/20 text-chart-3"
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">System Alerts</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3"
                  >
                    <AlertTriangle
                      className={`h-5 w-5 shrink-0 ${
                        alert.type === "warning" ? "text-chart-3" : "text-primary"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
