import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { PerformanceCard } from "@/components/dashboard/performance-card";
import { CourseActivity } from "@/components/dashboard/course-activity";
import { AIRecommendationCard } from "@/components/recommendation/ai-recommendation-card";
import { XPProgress } from "@/components/leaderboard/xp-progress";
import { UpcomingEvents } from "@/components/dashboard/upcoming-events";
import { BackendStatus } from "@/components/shared/backend-status";
import { getStudentDashboard, getStoredAuth } from "@/lib/api";
export default function StudentDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");
    const currentUser = getStoredAuth()?.user;
    useEffect(() => {
        let active = true;
        getStudentDashboard()
            .then((data) => {
            if (active) {
                setDashboard(data);
            }
        })
            .catch((apiError) => {
            if (active) {
                setError(apiError.message || "Unable to load dashboard");
            }
        });
        return () => {
            active = false;
        };
    }, []);
    return (<DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {currentUser?.name?.split(" ")[0] || dashboard?.welcomeName || "Student"}!
          </h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your learning journey.</p>
        </div>

        <BackendStatus />
        {error && <p className="text-sm text-destructive">{error}</p>}

        <DashboardStats stats={dashboard?.stats}/>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <AttendanceChart data={dashboard?.attendance} title="Attendance Trend" dataKey="value" xAxisKey="month"/>
            <AIRecommendationCard recommendations={dashboard?.recommendations}/>
          </div>

          <div className="space-y-6">
            <XPProgress currentXP={currentUser?.xp} nextLevelXP={(currentUser?.level || 12) * 500} level={currentUser?.level}/>
            <UpcomingEvents events={dashboard?.upcomingEvents}/>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PerformanceCard courses={dashboard?.performance} title="Performance Overview"/>
          <CourseActivity />
        </div>
      </div>
    </DashboardLayout>);
}
