"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { ForumPostCard } from "@/components/forum/forum-post-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Plus,
  TrendingUp,
  MessageSquare,
  Users,
  HelpCircle,
} from "lucide-react"

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    role: "student" | "teacher" | "admin"
  }
  category: string
  tags: string[]
  replies: number
  likes: number
  views: number
  isPinned?: boolean
  isResolved?: boolean
  createdAt: string
}

const posts: ForumPost[] = [
  {
    id: "1",
    title: "How to approach differential equations in calculus?",
    content:
      "I'm struggling with solving differential equations in my calculus course. Can anyone share some tips or resources that helped them understand this topic better?",
    author: { name: "John Doe", avatar: "/placeholder.svg", role: "student" },
    category: "Mathematics",
    tags: ["calculus", "differential-equations", "help"],
    replies: 12,
    likes: 45,
    views: 230,
    isPinned: true,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Study Group for Physics Finals",
    content:
      "Looking to form a study group for the upcoming physics finals. We can meet online or in the library. Let me know if you're interested!",
    author: { name: "Sarah Smith", avatar: "/placeholder.svg", role: "student" },
    category: "Physics",
    tags: ["study-group", "finals", "physics"],
    replies: 8,
    likes: 23,
    views: 156,
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    title: "Tips for Algorithm Interview Preparation",
    content:
      "I've compiled a list of resources and tips that helped me prepare for technical interviews. This includes practice platforms, key concepts, and common patterns.",
    author: { name: "Dr. Emily Chen", avatar: "/placeholder.svg", role: "teacher" },
    category: "Computer Science",
    tags: ["interviews", "algorithms", "career"],
    replies: 34,
    likes: 128,
    views: 890,
    isResolved: true,
    createdAt: "1 day ago",
  },
  {
    id: "4",
    title: "Understanding Quantum Entanglement",
    content:
      "Can someone explain quantum entanglement in simpler terms? I've read the textbook chapter multiple times but still find it confusing.",
    author: { name: "Mike Johnson", avatar: "/placeholder.svg", role: "student" },
    category: "Physics",
    tags: ["quantum", "help", "concepts"],
    replies: 15,
    likes: 67,
    views: 445,
    createdAt: "2 days ago",
  },
  {
    id: "5",
    title: "Best resources for learning machine learning",
    content:
      "I want to start learning machine learning. What are the best free resources, courses, or books that you would recommend for beginners?",
    author: { name: "Lisa Wang", avatar: "/placeholder.svg", role: "student" },
    category: "Computer Science",
    tags: ["machine-learning", "resources", "beginners"],
    replies: 22,
    likes: 89,
    views: 567,
    createdAt: "3 days ago",
  },
]

const categories = [
  "All Categories",
  "Mathematics",
  "Physics",
  "Computer Science",
  "Chemistry",
  "Literature",
  "General",
]

const stats = [
  { label: "Total Posts", value: "2.4K", icon: <MessageSquare className="h-5 w-5" /> },
  { label: "Active Users", value: "856", icon: <Users className="h-5 w-5" /> },
  { label: "Questions", value: "1.2K", icon: <HelpCircle className="h-5 w-5" /> },
  { label: "Trending", value: "48", icon: <TrendingUp className="h-5 w-5" /> },
]

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Discussion Forum</h1>
            <p className="text-muted-foreground">
              Ask questions, share knowledge, and connect with peers
            </p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Share your question or start a discussion
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input
                    placeholder="What's your question or topic?"
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <Select>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Content</label>
                  <Textarea
                    placeholder="Describe your question or topic in detail..."
                    className="min-h-32 bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tags</label>
                  <Input
                    placeholder="Add tags separated by commas"
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button>Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="text-primary">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              className="pl-9 bg-secondary border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "secondary"}
                className={`cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary/80"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
