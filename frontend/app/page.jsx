import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Trophy, Bot, Award, Users, ArrowRight, Play, Star, CheckCircle, } from "lucide-react";
const features = [
    {
        icon: <BookOpen className="h-6 w-6"/>,
        title: "Interactive Courses",
        description: "Engage with rich multimedia content, quizzes, and hands-on exercises.",
    },
    {
        icon: <Bot className="h-6 w-6"/>,
        title: "AI-Powered Learning",
        description: "Get personalized recommendations and instant help from our AI assistant.",
    },
    {
        icon: <Trophy className="h-6 w-6"/>,
        title: "Gamified Experience",
        description: "Earn XP, badges, and climb the leaderboard as you learn.",
    },
    {
        icon: <Award className="h-6 w-6"/>,
        title: "NFT Certificates",
        description: "Receive verifiable blockchain-based certificates for completed courses.",
    },
    {
        icon: <Users className="h-6 w-6"/>,
        title: "Community Forums",
        description: "Connect with peers, share knowledge, and get help from the community.",
    },
    {
        icon: <Play className="h-6 w-6"/>,
        title: "Live Sessions",
        description: "Join real-time classes, quizzes, and interactive Q&A sessions.",
    },
];
const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "1,000+", label: "Courses" },
    { value: "500+", label: "Expert Instructors" },
    { value: "98%", label: "Success Rate" },
];
const featuredCourses = [
    {
        title: "Data Structures & Algorithms",
        description: "Master the fundamentals of efficient coding, problem solving, and algorithm design.",
        duration: "12 weeks",
        students: "18.5k",
    },
    {
        title: "AI-Powered Learning",
        description: "Learn how to build intelligent systems using real-world examples and interactive labs.",
        duration: "10 weeks",
        students: "14.2k",
    },
    {
        title: "Web Development Essentials",
        description: "Build modern front-end and back-end applications with the latest tools and frameworks.",
        duration: "8 weeks",
        students: "22.1k",
    },
];
const pricingPlans = [
    {
        name: "Starter",
        price: "$0",
        description: "Great for learners getting started with basic courses.",
        features: ["Access to free courses", "Community support", "Progress tracking"],
        button: "Start Free",
    },
    {
        name: "Pro",
        price: "$24/mo",
        description: "For ambitious students who want the full learning experience.",
        features: ["Full course library", "AI assistant", "Certifications"],
        button: "Get Pro",
        featured: true,
    },
    {
        name: "Enterprise",
        price: "$99/mo",
        description: "Best for teams and institutions with premium learning needs.",
        features: ["Team dashboards", "Custom onboarding", "Dedicated support"],
        button: "Contact Sales",
    },
];
export default function Home() {
    return (<div className="dark min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground"/>
            </div>
            <span className="text-lg font-semibold text-foreground">EduLearn</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#courses" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Courses
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"/>
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
              <Link to="/student">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
              </Link>
              <Link to="/admin">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Play className="mr-2 h-4 w-4"/>
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
            {stats.map((stat, index) => (<div key={index} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Explore our top courses
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn from expertly designed classes built for students at every level.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {featuredCourses.map((course) => (<Card key={course.title} className="bg-card border-border transition-colors hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.duration}</span>
                    <span>{course.students} students</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{course.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{course.description}</p>
                  <div className="mt-6">
                    <Button size="sm" className="w-full">
                      View Course
                    </Button>
                  </div>
                </CardContent>
              </Card>))}
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
            {features.map((feature, index) => (<Card key={index} className="bg-card border-border transition-colors hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-card/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple pricing for every learner
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that fits your goals and start learning without limits.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (<Card key={plan.name} className={`border ${plan.featured ? "border-primary bg-primary/5" : "border-border"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{plan.name}</p>
                      <p className="mt-4 text-4xl font-semibold text-foreground">{plan.price}</p>
                    </div>
                    {plan.featured && (<span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Popular
                      </span>)}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">{plan.description}</p>
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (<li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary"/>
                          {feature}
                        </li>))}
                  </ul>
                  <Button className="mt-8 w-full" variant={plan.featured ? "default" : "outline"}>
                    {plan.button}
                  </Button>
                </CardContent>
              </Card>))}
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
              <Link to="/auth/register">
                <Button size="lg">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
              </Link>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-accent"/>
                  No credit card required
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-chart-3"/>
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
                <GraduationCap className="h-4 w-4 text-primary-foreground"/>
              </div>
              <span className="text-sm font-semibold text-foreground">EduLearn</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 EduLearn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>);
}
