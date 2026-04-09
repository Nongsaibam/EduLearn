import { useEffect, useState } from "react"
import { LoaderCircle, Server, ShieldAlert } from "lucide-react"

import { getBackendHealth } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BackendStatus() {
  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: "",
  })

  useEffect(() => {
    let isActive = true

    async function loadHealth() {
      try {
        const data = await getBackendHealth()

        if (isActive) {
          setState({
            status: "success",
            data,
            error: "",
          })
        }
      } catch (error) {
        if (isActive) {
          setState({
            status: "error",
            data: null,
            error: error.message || "Unable to reach backend",
          })
        }
      }
    }

    loadHealth()

    return () => {
      isActive = false
    }
  }, [])

  const isLoading = state.status === "loading"
  const isHealthy = state.status === "success" && Boolean(state.data?.service)

  return (
    <Card className="border-border bg-card/80">
      <CardHeader className="gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {isLoading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Server className="h-5 w-5" />}
          </div>
          <div>
            <CardTitle>Backend Connection</CardTitle>
            <CardDescription>
              {isLoading && "Checking API availability..."}
              {isHealthy && "Frontend is connected to the backend API."}
              {state.status === "error" && "The frontend could not reach the backend."}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">
            {isHealthy ? state.data.service : "Connection failed"}
          </p>
          <p className="text-sm text-muted-foreground">
            {isHealthy ? "GET /api/health responded successfully." : state.error}
          </p>
        </div>
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
            isHealthy
              ? "bg-emerald-500/10 text-emerald-400"
              : state.status === "error"
                ? "bg-destructive/10 text-destructive"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {state.status === "error" && <ShieldAlert className="h-3.5 w-3.5" />}
          {isLoading ? "Loading" : isHealthy ? "Online" : "Offline"}
        </div>
      </CardContent>
    </Card>
  )
}
