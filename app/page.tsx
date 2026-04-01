import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Bot,
  Award,
  Users,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
} from "lucide-react"

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Interactive Courses",
    description: "Engage with rich multimedia content, quizzes, and hands-on exercises.",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "AI-Powered Learning",
    description: "Get personalized recommendations and instant help from our AI assistant.",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Gamified Experience",
    description: "Earn XP, badges, and climb the leaderboard as you learn.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "NFT Certificates",
    description: "Receive verifiable blockchain-based certificates for completed courses.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Forums",
    description: "Connect with peers, share knowledge, and get help from the community.",
  },
  {
    icon: <Play className="h-6 w-6" />,
    title: "Live Sessions",
    description: "Join real-time classes, quizzes, and interactive Q&A sessions.",
  },
]

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "1,000+", label: "Courses" },
  { value: "500+", label: "Expert Instructors" },
  { value: "98%", label: "Success Rate" },
]

export default function Home() {
  return (
    <div className="dark min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">EduLearn</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#courses" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Courses
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
              Learn smarter with AI-powered education
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              Join thousands of students achieving their goals with personalized courses, real-time feedback, and gamified learning experiences that make education engaging and effective.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/student">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Play className="mr-2 h-4 w-4" />
                  View Admin Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our platform combines cutting-edge technology with proven learning methods to deliver an unparalleled educational experience.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border transition-colors hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to transform your learning?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join over 50,000 students already learning on EduLearn. Start your journey today.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Link href="/auth/register">
                <Button size="lg">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-chart-3" />
                  4.9/5 rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">EduLearn</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 EduLearn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
