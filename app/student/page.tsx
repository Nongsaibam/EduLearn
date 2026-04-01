import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"
import { PerformanceCard } from "@/components/dashboard/performance-card"
import { CourseActivity } from "@/components/dashboard/course-activity"
import { AIRecommendationCard } from "@/components/recommendation/ai-recommendation-card"
import { XPProgress } from "@/components/leaderboard/xp-progress"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your learning journey.</p>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="space-y-6 lg:col-span-2">
            <AttendanceChart />
            <AIRecommendationCard />
          </div>

          {/* Right Column - Sidebar content */}
          <div className="space-y-6">
            <XPProgress />
            <UpcomingEvents />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PerformanceCard />
          <CourseActivity />
        </div>
      </div>
    </DashboardLayout>
  )
}
