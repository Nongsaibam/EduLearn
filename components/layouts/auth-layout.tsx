"use client"

import { GraduationCap } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="dark min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-sidebar p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-sidebar-foreground">EduLearn</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-sidebar-foreground">
              Unlock your potential with AI-powered learning
            </h1>
            <p className="text-lg text-sidebar-foreground/70">
              Join thousands of students achieving their goals with personalized courses, real-time feedback, and gamified learning experiences.
            </p>
            <div className="flex items-center gap-8">
              <div>
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="text-sm text-sidebar-foreground/60">Active Students</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">1000+</p>
                <p className="text-sm text-sidebar-foreground/60">Courses</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-chart-3">98%</p>
                <p className="text-sm text-sidebar-foreground/60">Success Rate</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-sidebar-foreground/50">
            &copy; 2026 EduLearn. All rights reserved.
          </p>
        </div>

        {/* Right side - Form */}
        <div className="flex w-full items-center justify-center px-4 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile logo */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">EduLearn</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
