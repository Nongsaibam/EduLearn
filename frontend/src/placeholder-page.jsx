import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlaceholderPage({ role = "student", title = "Coming Soon" }) {
  return (
    <DashboardLayout role={role}>
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          This section has been scaffolded in the Vite migration and is ready for feature work.
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
