"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { AssignmentCard } from "@/components/assignments/assignment-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Upload,
  FileText,
  X,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  status: "pending" | "submitted" | "graded" | "overdue"
  grade?: number
  maxGrade?: number
  description: string
  attachments?: number
}

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Calculus Problem Set 5",
    course: "Advanced Mathematics",
    dueDate: "Apr 3, 2026",
    status: "pending",
    description:
      "Complete problems 1-20 from Chapter 5. Show all work and explain your reasoning.",
    attachments: 2,
  },
  {
    id: "2",
    title: "Physics Lab Report",
    course: "Introduction to Physics",
    dueDate: "Apr 5, 2026",
    status: "pending",
    description:
      "Write a detailed lab report on the projectile motion experiment conducted in class.",
    attachments: 1,
  },
  {
    id: "3",
    title: "Essay: Shakespeare Analysis",
    course: "English Literature",
    dueDate: "Apr 1, 2026",
    status: "overdue",
    description:
      "Analyze the themes of power and ambition in Macbeth. Minimum 2000 words.",
  },
  {
    id: "4",
    title: "Algorithm Implementation",
    course: "Data Structures",
    dueDate: "Mar 28, 2026",
    status: "graded",
    grade: 95,
    maxGrade: 100,
    description: "Implement a balanced binary search tree with insert, delete, and search operations.",
  },
  {
    id: "5",
    title: "Linear Algebra Homework",
    course: "Advanced Mathematics",
    dueDate: "Mar 25, 2026",
    status: "graded",
    grade: 88,
    maxGrade: 100,
    description: "Matrix operations and eigenvalue problems from Chapter 4.",
  },
  {
    id: "6",
    title: "Research Paper Draft",
    course: "Computer Science",
    dueDate: "Mar 30, 2026",
    status: "submitted",
    description: "First draft of your research paper on machine learning applications.",
    attachments: 3,
  },
]

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const pendingAssignments = assignments.filter(
    (a) => a.status === "pending" || a.status === "overdue"
  )
  const submittedAssignments = assignments.filter((a) => a.status === "submitted")
  const gradedAssignments = assignments.filter((a) => a.status === "graded")

  const handleSubmit = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setUploadDialogOpen(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const stats = [
    {
      label: "Pending",
      value: pendingAssignments.length,
      icon: <Clock className="h-5 w-5" />,
      color: "text-chart-3",
    },
    {
      label: "Submitted",
      value: submittedAssignments.length,
      icon: <Upload className="h-5 w-5" />,
      color: "text-primary",
    },
    {
      label: "Graded",
      value: gradedAssignments.length,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-accent",
    },
    {
      label: "Overdue",
      value: assignments.filter((a) => a.status === "overdue").length,
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-destructive",
    },
  ]

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
            <p className="text-muted-foreground">
              Track and submit your course assignments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                className="w-full pl-9 sm:w-64 bg-secondary border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="border-border">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="pending">
              Pending ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="submitted">
              Submitted ({submittedAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="graded">
              Graded ({gradedAssignments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onSubmit={() => handleSubmit(assignment)}
              />
            ))}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4">
            {submittedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </TabsContent>

          <TabsContent value="graded" className="space-y-4">
            {gradedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.title} - {selectedAssignment?.course}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
              <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop files here, or click to browse
              </p>
              <input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileUpload}
              />
              <Button variant="outline" className="mt-4" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose Files
                </label>
              </Button>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-secondary p-3"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button disabled={uploadedFiles.length === 0}>
              <Upload className="mr-2 h-4 w-4" />
              Submit Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
