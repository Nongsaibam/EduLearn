"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, FileText, Upload, CheckCircle, AlertTriangle, Calendar, } from "lucide-react";
const statusConfig = {
    pending: {
        label: "Pending",
        icon: <Clock className="h-3 w-3"/>,
        className: "bg-chart-3/20 text-chart-3",
    },
    submitted: {
        label: "Submitted",
        icon: <CheckCircle className="h-3 w-3"/>,
        className: "bg-primary/20 text-primary",
    },
    graded: {
        label: "Graded",
        icon: <CheckCircle className="h-3 w-3"/>,
        className: "bg-accent/20 text-accent",
    },
    overdue: {
        label: "Overdue",
        icon: <AlertTriangle className="h-3 w-3"/>,
        className: "bg-destructive/20 text-destructive",
    },
};
export function AssignmentCard({ assignment, onSubmit, onView }) {
    const status = statusConfig[assignment.status];
    return (<Card className="bg-card border-border transition-colors hover:border-primary/50">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-6 w-6"/>
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                <Badge className={status.className}>
                  {status.icon}
                  <span className="ml-1">{status.label}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {assignment.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3"/>
                  Due: {assignment.dueDate}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {assignment.course}
                </Badge>
                {assignment.attachments && (<span className="flex items-center gap-1">
                    <FileText className="h-3 w-3"/>
                    {assignment.attachments} attachments
                  </span>)}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {assignment.status === "graded" && assignment.grade !== undefined && (<div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  {assignment.grade}/{assignment.maxGrade}
                </p>
                <Progress value={(assignment.grade / (assignment.maxGrade || 100)) * 100} className="mt-1 h-2 w-24"/>
              </div>)}
            <div className="flex gap-2">
              {assignment.status === "pending" && (<Button size="sm" onClick={onSubmit}>
                  <Upload className="mr-2 h-4 w-4"/>
                  Submit
                </Button>)}
              <Button size="sm" variant="outline" onClick={onView}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>);
}
