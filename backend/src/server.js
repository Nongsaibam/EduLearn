import cors from "cors"
import dotenv from "dotenv"
import express from "express"

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 5000)

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || true,
  }),
)
app.use(express.json())

const users = [
  {
    id: "1",
    name: "Emma Wilson",
    email: "emma@example.com",
    password: "Password123",
    role: "student",
    status: "active",
    courses: 5,
    joinedAt: "2026-01-15T08:30:00.000Z",
    lastActive: "2026-04-05T06:15:00.000Z",
    level: 24,
    xp: 12450,
    streak: 45,
    badges: 18,
    coursesCompleted: 15,
  },
  {
    id: "2",
    name: "James Chen",
    email: "james@example.com",
    password: "Password123",
    role: "teacher",
    status: "active",
    courses: 8,
    joinedAt: "2025-12-01T10:00:00.000Z",
    lastActive: "2026-04-05T07:00:00.000Z",
    level: 22,
    xp: 11200,
    streak: 32,
    badges: 16,
    coursesCompleted: 14,
  },
  {
    id: "3",
    name: "Sarah Miller",
    email: "sarah@example.com",
    password: "Password123",
    role: "student",
    status: "pending",
    courses: 2,
    joinedAt: "2026-03-28T12:00:00.000Z",
    lastActive: "2026-04-05T08:00:00.000Z",
    level: 21,
    xp: 10850,
    streak: 28,
    badges: 15,
    coursesCompleted: 13,
  },
  {
    id: "4",
    name: "John Doe",
    email: "john@example.com",
    password: "Password123",
    role: "student",
    status: "active",
    courses: 3,
    joinedAt: "2025-11-10T09:45:00.000Z",
    lastActive: "2026-04-05T08:20:00.000Z",
    level: 12,
    xp: 4850,
    streak: 14,
    badges: 6,
    coursesCompleted: 5,
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa@example.com",
    password: "Password123",
    role: "student",
    status: "inactive",
    courses: 3,
    joinedAt: "2026-02-20T14:20:00.000Z",
    lastActive: "2026-03-29T08:00:00.000Z",
    level: 18,
    xp: 8900,
    streak: 21,
    badges: 12,
    coursesCompleted: 10,
  },
  {
    id: "6",
    name: "David Kim",
    email: "david@example.com",
    password: "Password123",
    role: "teacher",
    status: "active",
    courses: 12,
    joinedAt: "2025-10-05T11:30:00.000Z",
    lastActive: "2026-04-05T05:00:00.000Z",
    level: 15,
    xp: 6800,
    streak: 12,
    badges: 9,
    coursesCompleted: 7,
  },
  {
    id: "7",
    name: "Michael Brown",
    email: "michael@example.com",
    password: "Password123",
    role: "admin",
    status: "active",
    courses: 0,
    joinedAt: "2025-11-10T09:00:00.000Z",
    lastActive: "2026-04-05T08:10:00.000Z",
    level: 17,
    xp: 8200,
    streak: 18,
    badges: 11,
    coursesCompleted: 9,
  },
]

const courses = [
  {
    id: "1",
    title: "Advanced Mathematics",
    instructor: "Dr. Sarah Smith",
    image: "/placeholder.svg",
    progress: 75,
    duration: "12 weeks",
    students: 1234,
    rating: 4.8,
    category: "Mathematics",
    status: "enrolled",
    lessons: 48,
    completedLessons: 36,
  },
  {
    id: "2",
    title: "Introduction to Physics",
    instructor: "Prof. John Wilson",
    image: "/placeholder.svg",
    progress: 45,
    duration: "10 weeks",
    students: 987,
    rating: 4.6,
    category: "Physics",
    status: "enrolled",
    lessons: 40,
    completedLessons: 18,
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Emily Chen",
    image: "/placeholder.svg",
    progress: 100,
    duration: "8 weeks",
    students: 2345,
    rating: 4.9,
    category: "Computer Science",
    status: "completed",
    lessons: 32,
    completedLessons: 32,
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    instructor: "Prof. Michael Brown",
    image: "/placeholder.svg",
    progress: 0,
    duration: "14 weeks",
    students: 3456,
    rating: 4.7,
    category: "Computer Science",
    status: "available",
    lessons: 56,
    completedLessons: 0,
  },
  {
    id: "5",
    title: "English Literature",
    instructor: "Dr. Jane Williams",
    image: "/placeholder.svg",
    progress: 60,
    duration: "8 weeks",
    students: 876,
    rating: 4.5,
    category: "Literature",
    status: "enrolled",
    lessons: 24,
    completedLessons: 14,
  },
  {
    id: "6",
    title: "Organic Chemistry",
    instructor: "Prof. Robert Davis",
    image: "/placeholder.svg",
    progress: 0,
    duration: "12 weeks",
    students: 654,
    rating: 4.4,
    category: "Chemistry",
    status: "available",
    lessons: 36,
    completedLessons: 0,
  },
]

const assignments = [
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
    description:
      "Implement a balanced binary search tree with insert, delete, and search operations.",
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

const forumPosts = [
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
]

const certificates = [
  {
    id: "1",
    courseName: "Data Structures & Algorithms",
    instructor: "Dr. Emily Chen",
    issueDate: "Mar 15, 2026",
    credentialId: "CERT-2026-DS-001",
    isNFT: true,
    nftAddress: "0x1234...5678",
    grade: "A+",
    skills: ["Algorithms", "Data Structures", "Problem Solving", "Python"],
  },
  {
    id: "2",
    courseName: "Introduction to Machine Learning",
    instructor: "Prof. Michael Brown",
    issueDate: "Feb 28, 2026",
    credentialId: "CERT-2026-ML-042",
    isNFT: true,
    nftAddress: "0xabcd...ef01",
    grade: "A",
    skills: ["Machine Learning", "Python", "TensorFlow", "Data Analysis"],
  },
  {
    id: "3",
    courseName: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    issueDate: "Jan 10, 2026",
    credentialId: "CERT-2026-WD-128",
    isNFT: false,
    grade: "A-",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: "4",
    courseName: "Advanced Mathematics",
    instructor: "Dr. Sarah Smith",
    issueDate: "Dec 20, 2025",
    credentialId: "CERT-2025-AM-256",
    isNFT: false,
    grade: "B+",
    skills: ["Calculus", "Linear Algebra", "Statistics"],
  },
]

const badges = [
  { id: "1", name: "Fast Learner", earned: true, xp: 250 },
  { id: "2", name: "7 Day Streak", earned: true, xp: 150 },
  { id: "3", name: "Top 10", earned: false, xp: 500 },
  { id: "4", name: "Quiz Master", earned: true, xp: 300 },
]

const leaderboardEntries = [
  { rank: 1, userId: "1", trend: "same", trendValue: 0 },
  { rank: 2, userId: "2", trend: "up", trendValue: 2 },
  { rank: 3, userId: "3", trend: "down", trendValue: 1 },
  { rank: 4, userId: "4", trend: "up", trendValue: 3 },
  { rank: 5, userId: "5", trend: "same", trendValue: 0 },
  { rank: 6, userId: "7", trend: "up", trendValue: 1 },
  { rank: 7, userId: "6", trend: "same", trendValue: 0 },
]

const studentDashboard = {
  welcomeName: "John",
  stats: [
    { title: "Courses Enrolled", value: "5", change: "+1 this month" },
    { title: "Assignments Due", value: "3", change: "2 due this week" },
    { title: "Attendance", value: "92%", change: "+4% from last month" },
    { title: "Current GPA", value: "3.8", change: "Top 12% of class" },
  ],
  attendance: [
    { month: "Jan", value: 88 },
    { month: "Feb", value: 91 },
    { month: "Mar", value: 93 },
    { month: "Apr", value: 92 },
  ],
  performance: [
    { subject: "Math", score: 94 },
    { subject: "Physics", score: 87 },
    { subject: "CS", score: 96 },
    { subject: "English", score: 89 },
  ],
  recommendations: [
    {
      id: "r1",
      title: "Focus on Physics problem solving",
      description: "Your quiz accuracy is strongest in theory and slightly lower in numerical questions.",
    },
    {
      id: "r2",
      title: "Keep your calculus streak going",
      description: "You completed 4 lessons this week. One more earns a bonus badge.",
    },
  ],
  upcomingEvents: [
    { id: "e1", title: "Physics Lab", date: "Apr 7, 2026", time: "10:00 AM" },
    { id: "e2", title: "Math Quiz", date: "Apr 8, 2026", time: "02:00 PM" },
  ],
}

const adminDashboard = {
  stats: [
    { title: "Total Students", value: "12,456", change: "+12%", changeType: "positive" },
    { title: "Active Courses", value: "156", change: "+8%", changeType: "positive" },
    { title: "Certificates Issued", value: "3,892", change: "+24%", changeType: "positive" },
    { title: "Completion Rate", value: "78%", change: "-2%", changeType: "negative" },
  ],
  enrollmentData: [
    { month: "Jan", students: 4000, courses: 24 },
    { month: "Feb", students: 4500, courses: 28 },
    { month: "Mar", students: 5200, courses: 32 },
    { month: "Apr", students: 5800, courses: 35 },
    { month: "May", students: 6500, courses: 40 },
    { month: "Jun", students: 7200, courses: 45 },
  ],
  courseDistribution: [
    { name: "Computer Science", value: 35, color: "oklch(0.65 0.22 260)" },
    { name: "Mathematics", value: 25, color: "oklch(0.65 0.18 150)" },
    { name: "Physics", value: 20, color: "oklch(0.75 0.15 85)" },
    { name: "Literature", value: 12, color: "oklch(0.65 0.2 310)" },
    { name: "Other", value: 8, color: "oklch(0.6 0.18 200)" },
  ],
  alerts: [
    { type: "warning", message: "5 assignments pending review", time: "2 hours ago" },
    { type: "info", message: "New course 'AI Fundamentals' published", time: "4 hours ago" },
    { type: "warning", message: "Server maintenance scheduled", time: "1 day ago" },
  ],
}

const chatConversations = [
  {
    id: "1",
    title: "Calculus Help",
    lastMessage: "The derivative of x squared is 2x.",
    timestamp: "Today",
  },
  {
    id: "2",
    title: "Physics Problem",
    lastMessage: "For projectile motion, split velocity into x and y components.",
    timestamp: "Yesterday",
  },
]

function publicUser(user) {
  const { password, ...safeUser } = user
  return safeUser
}

function sendOk(res, data, status = 200) {
  return res.status(status).json({ ok: true, data })
}

function sendError(res, status, message) {
  return res.status(status).json({ ok: false, message })
}

function requireFields(body, fields) {
  const missingFields = fields.filter((field) => {
    const value = body[field]
    return value === undefined || value === null || String(value).trim() === ""
  })

  return missingFields
}

function buildLeaderboard() {
  return leaderboardEntries
    .map((entry) => {
      const user = users.find((item) => item.id === entry.userId)
      if (!user) return null

      return {
        rank: entry.rank,
        user: {
          name: user.name,
          avatar: "/placeholder.svg",
          level: user.level,
        },
        xp: user.xp,
        badges: user.badges,
        coursesCompleted: user.coursesCompleted,
        streak: user.streak,
        trend: entry.trend,
        trendValue: entry.trendValue,
      }
    })
    .filter(Boolean)
}

function buildChatReply(input) {
  const normalizedInput = input.toLowerCase()

  if (normalizedInput.includes("quiz") || normalizedInput.includes("test")) {
    return "Great! Quick quiz: what is the derivative of x^2? Reply with your answer and I will explain it."
  }

  if (normalizedInput.includes("calculus") || normalizedInput.includes("derivative")) {
    return "For calculus, start with the power rule: d/dx(x^n) = n*x^(n-1). For x^2, the derivative is 2x."
  }

  if (normalizedInput.includes("physics")) {
    return "For physics problem solving, list known values first, draw the situation, and then choose the formula that connects the unknown you need."
  }

  if (normalizedInput.includes("study") || normalizedInput.includes("exam")) {
    return "Use active recall, spaced repetition, and timed practice. If you want, I can turn a topic into a mini study plan."
  }

  return "I can help explain concepts, make a quiz, summarize a topic, or suggest study strategies. Tell me the subject you want to work on."
}

app.get("/api/health", (_req, res) => {
  sendOk(res, {
    service: "student-portal-backend",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    routes: {
      auth: ["/api/auth/login", "/api/auth/register", "/api/auth/forgot-password"],
      student: [
        "/api/dashboard/student",
        "/api/courses",
        "/api/assignments",
        "/api/forum/posts",
        "/api/leaderboard",
        "/api/certificates",
      ],
      admin: ["/api/dashboard/admin", "/api/users"],
      chat: ["/api/chat/conversations", "/api/chat/message"],
    },
  })
})

app.post("/api/auth/login", (req, res) => {
  const missingFields = requireFields(req.body, ["email", "password"])
  if (missingFields.length > 0) {
    return sendError(res, 400, `Missing required fields: ${missingFields.join(", ")}`)
  }

  const user = users.find((item) => item.email.toLowerCase() === req.body.email.toLowerCase())
  if (!user || user.password !== req.body.password) {
    return sendError(res, 401, "Invalid email or password")
  }

  return sendOk(res, {
    token: `demo-token-${user.id}`,
    user: publicUser(user),
    redirectTo:
      user.role === "admin" ? "/admin" : user.role === "teacher" ? "/teacher" : "/student",
  })
})

app.post("/api/auth/register", (req, res) => {
  const missingFields = requireFields(req.body, ["name", "email", "password", "role"])
  if (missingFields.length > 0) {
    return sendError(res, 400, `Missing required fields: ${missingFields.join(", ")}`)
  }

  if (users.some((item) => item.email.toLowerCase() === req.body.email.toLowerCase())) {
    return sendError(res, 409, "An account with this email already exists")
  }

  const nextUser = {
    id: String(users.length + 1),
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    password: req.body.password,
    role: req.body.role,
    status: "active",
    courses: 0,
    joinedAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    level: 1,
    xp: 0,
    streak: 0,
    badges: 0,
    coursesCompleted: 0,
  }

  users.push(nextUser)

  return sendOk(
    res,
    {
      token: `demo-token-${nextUser.id}`,
      user: publicUser(nextUser),
      redirectTo:
        nextUser.role === "admin"
          ? "/admin"
          : nextUser.role === "teacher"
            ? "/teacher"
            : "/student",
    },
    201,
  )
})

app.post("/api/auth/forgot-password", (req, res) => {
  const missingFields = requireFields(req.body, ["email"])
  if (missingFields.length > 0) {
    return sendError(res, 400, "Email is required")
  }

  return sendOk(res, {
    email: req.body.email.trim(),
    message: "If the account exists, a password reset link has been sent.",
  })
})

app.get("/api/dashboard/student", (_req, res) => {
  sendOk(res, studentDashboard)
})

app.get("/api/dashboard/admin", (_req, res) => {
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
    .slice(0, 4)
    .map((user) => ({
      name: user.name,
      email: user.email,
      role: user.role[0].toUpperCase() + user.role.slice(1),
      status: user.status[0].toUpperCase() + user.status.slice(1),
      joined: new Date(user.joinedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }))

  sendOk(res, {
    ...adminDashboard,
    recentUsers,
  })
})

app.get("/api/users", (req, res) => {
  const { role, status, q } = req.query

  const filteredUsers = users.filter((user) => {
    const matchesRole = role ? user.role === role : true
    const matchesStatus = status ? user.status === status : true
    const query = q ? String(q).toLowerCase() : ""
    const matchesSearch = query
      ? user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
      : true

    return matchesRole && matchesStatus && matchesSearch
  })

  const stats = {
    total: users.length,
    students: users.filter((user) => user.role === "student").length,
    teachers: users.filter((user) => user.role === "teacher").length,
    admins: users.filter((user) => user.role === "admin").length,
  }

  sendOk(res, {
    stats,
    users: filteredUsers.map(publicUser),
  })
})

app.post("/api/users", (req, res) => {
  const missingFields = requireFields(req.body, ["name", "email", "role"])
  if (missingFields.length > 0) {
    return sendError(res, 400, `Missing required fields: ${missingFields.join(", ")}`)
  }

  if (users.some((user) => user.email.toLowerCase() === req.body.email.toLowerCase())) {
    return sendError(res, 409, "User email already exists")
  }

  const newUser = {
    id: String(users.length + 1),
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    password: req.body.password || "Password123",
    role: req.body.role,
    status: req.body.status || "active",
    courses: Number(req.body.courses || 0),
    joinedAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    level: 1,
    xp: 0,
    streak: 0,
    badges: 0,
    coursesCompleted: 0,
  }

  users.push(newUser)
  sendOk(res, publicUser(newUser), 201)
})

app.get("/api/courses", (req, res) => {
  const { status, category, q } = req.query
  const query = q ? String(q).toLowerCase() : ""

  const filteredCourses = courses.filter((course) => {
    const matchesStatus = status ? course.status === status : true
    const matchesCategory = category ? course.category === category : true
    const matchesSearch = query
      ? course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
      : true

    return matchesStatus && matchesCategory && matchesSearch
  })

  sendOk(res, {
    categories: [...new Set(courses.map((course) => course.category))],
    courses: filteredCourses,
  })
})

app.get("/api/assignments", (req, res) => {
  const { status, q } = req.query
  const query = q ? String(q).toLowerCase() : ""

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesStatus = status ? assignment.status === status : true
    const matchesSearch = query
      ? assignment.title.toLowerCase().includes(query) ||
        assignment.course.toLowerCase().includes(query)
      : true

    return matchesStatus && matchesSearch
  })

  const stats = {
    pending: assignments.filter((item) => item.status === "pending").length,
    submitted: assignments.filter((item) => item.status === "submitted").length,
    graded: assignments.filter((item) => item.status === "graded").length,
    overdue: assignments.filter((item) => item.status === "overdue").length,
  }

  sendOk(res, {
    stats,
    assignments: filteredAssignments,
  })
})

app.post("/api/assignments/:id/submit", (req, res) => {
  const assignment = assignments.find((item) => item.id === req.params.id)
  if (!assignment) {
    return sendError(res, 404, "Assignment not found")
  }

  assignment.status = "submitted"
  assignment.submittedAt = new Date().toISOString()
  assignment.attachments = Array.isArray(req.body.files) ? req.body.files.length : assignment.attachments || 0

  return sendOk(res, assignment)
})

app.get("/api/forum/posts", (req, res) => {
  const { category, q } = req.query
  const query = q ? String(q).toLowerCase() : ""

  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory =
      category && category !== "All Categories" ? post.category === category : true
    const matchesSearch = query
      ? post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
      : true

    return matchesCategory && matchesSearch
  })

  const stats = {
    totalPosts: forumPosts.length,
    activeUsers: 856,
    questions: 1200,
    trending: 48,
  }

  sendOk(res, {
    categories: [
      "All Categories",
      ...new Set(forumPosts.map((post) => post.category)),
      "Chemistry",
      "Literature",
      "General",
    ],
    stats,
    posts: filteredPosts,
  })
})

app.post("/api/forum/posts", (req, res) => {
  const missingFields = requireFields(req.body, ["title", "category", "content"])
  if (missingFields.length > 0) {
    return sendError(res, 400, `Missing required fields: ${missingFields.join(", ")}`)
  }

  const newPost = {
    id: String(forumPosts.length + 1),
    title: req.body.title.trim(),
    content: req.body.content.trim(),
    author: req.body.author || { name: "John Doe", avatar: "/placeholder.svg", role: "student" },
    category: req.body.category.trim(),
    tags: Array.isArray(req.body.tags)
      ? req.body.tags
      : String(req.body.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
    replies: 0,
    likes: 0,
    views: 0,
    createdAt: "Just now",
  }

  forumPosts.unshift(newPost)
  sendOk(res, newPost, 201)
})

app.get("/api/leaderboard", (_req, res) => {
  sendOk(res, {
    stats: {
      rank: "#4",
      totalXp: 4850,
      todayXp: 350,
      badges: 6,
      newBadgesThisWeek: 2,
      streak: "14 days",
    },
    entries: buildLeaderboard(),
    badges,
  })
})

app.get("/api/certificates", (req, res) => {
  const { type, q } = req.query
  const query = q ? String(q).toLowerCase() : ""

  const filteredCertificates = certificates.filter((certificate) => {
    const matchesType =
      type === "nft"
        ? certificate.isNFT
        : type === "regular"
          ? !certificate.isNFT
          : true
    const matchesSearch = query
      ? certificate.courseName.toLowerCase().includes(query) ||
        certificate.instructor.toLowerCase().includes(query) ||
        certificate.credentialId.toLowerCase().includes(query)
      : true

    return matchesType && matchesSearch
  })

  sendOk(res, {
    stats: {
      total: certificates.length,
      nft: certificates.filter((certificate) => certificate.isNFT).length,
      verified: certificates.length,
    },
    certificates: filteredCertificates,
  })
})

app.get("/api/chat/conversations", (_req, res) => {
  sendOk(res, {
    conversations: chatConversations,
  })
})

app.post("/api/chat/message", (req, res) => {
  const missingFields = requireFields(req.body, ["message"])
  if (missingFields.length > 0) {
    return sendError(res, 400, "Message is required")
  }

  const reply = {
    id: String(Date.now()),
    role: "assistant",
    content: buildChatReply(req.body.message),
    timestamp: new Date().toISOString(),
  }

  sendOk(res, reply)
})

app.use((req, res) => {
  sendError(res, 404, `Route not found: ${req.method} ${req.originalUrl}`)
})

app.use((error, _req, res, _next) => {
  console.error(error)
  sendError(res, 500, "Internal server error")
})

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
