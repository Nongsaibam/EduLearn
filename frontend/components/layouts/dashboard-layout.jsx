"use client";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { clearAuthSession, getStoredAuth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { LayoutDashboard, BookOpen, FileText, MessageSquare, Trophy, Award, Bell, Settings, LogOut, Menu, X, Users, BarChart3, Bot, GraduationCap, ChevronDown, Sun, Moon, } from "lucide-react";
const studentNavItems = [
    { title: "Dashboard", href: "/student", icon: <LayoutDashboard className="h-5 w-5"/> },
    { title: "Courses", href: "/student/courses", icon: <BookOpen className="h-5 w-5"/> },
    { title: "Assignments", href: "/student/assignments", icon: <FileText className="h-5 w-5"/>, badge: 3 },
    { title: "Forum", href: "/student/forum", icon: <MessageSquare className="h-5 w-5"/> },
    { title: "Leaderboard", href: "/student/leaderboard", icon: <Trophy className="h-5 w-5"/> },
    { title: "Certificates", href: "/student/certificates", icon: <Award className="h-5 w-5"/> },
];
const adminNavItems = [
    { title: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5"/> },
    { title: "Users", href: "/admin/users", icon: <Users className="h-5 w-5"/> },
    { title: "Courses", href: "/admin/courses", icon: <BookOpen className="h-5 w-5"/> },
    { title: "Assignments", href: "/admin/assignments", icon: <FileText className="h-5 w-5"/> },
    { title: "Certificates", href: "/admin/certificates", icon: <Award className="h-5 w-5"/> },
    { title: "Reports", href: "/admin/reports", icon: <BarChart3 className="h-5 w-5"/> },
];
const teacherNavItems = [
    { title: "Dashboard", href: "/teacher", icon: <LayoutDashboard className="h-5 w-5"/> },
    { title: "Classes", href: "/teacher/classes", icon: <Users className="h-5 w-5"/> },
    { title: "Grading", href: "/teacher/grading", icon: <FileText className="h-5 w-5"/>, badge: 12 },
    { title: "Quizzes", href: "/teacher/quizzes", icon: <GraduationCap className="h-5 w-5"/> },
];
export function DashboardLayout({ children, role = "student" }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [currentUser, setCurrentUser] = useState(() => getStoredAuth()?.user || null);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const navItems = role === "admin" ? adminNavItems : role === "teacher" ? teacherNavItems : studentNavItems;
    useEffect(() => {
        document.documentElement.classList.add("dark");
        const storedSession = getStoredAuth();
        if (storedSession?.user) {
            setCurrentUser(storedSession.user);
        }
    }, []);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };
    const handleLogout = () => {
        clearAuthSession();
        setCurrentUser(null);
        navigate("/auth/login");
    };
    return (<div className={cn("min-h-screen bg-background", darkMode && "dark")}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (<div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)}/>)}

      {/* Sidebar */}
      <aside className={cn("fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-sidebar transition-transform duration-300 lg:translate-x-0", sidebarOpen ? "translate-x-0" : "-translate-x-full")}>
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground"/>
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">EduLearn</span>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden text-sidebar-foreground hover:bg-sidebar-accent" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5"/>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (<Link key={item.href} to={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground")}>
                {item.icon}
                <span>{item.title}</span>
                {item.badge && (<span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                    {item.badge}
                  </span>)}
              </Link>);
        })}
        </nav>

        {/* AI Assistant */}
        <div className="border-t border-sidebar-border p-4">
          <Link to="/chatbot" className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent/80">
            <Bot className="h-5 w-5 text-accent"/>
            <span>AI Assistant</span>
            <span className="ml-auto h-2 w-2 rounded-full bg-accent animate-pulse"/>
          </Link>
        </div>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg"/>
              <AvatarFallback className="bg-primary/20 text-primary">{(currentUser?.name || "John Doe")
                .split(" ")
                .map((name) => name[0])
                .join("")}</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-sidebar-foreground">{currentUser?.name || "John Doe"}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{currentUser?.role || role}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
                  <ChevronDown className="h-4 w-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4"/>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="mr-2 h-4 w-4"/> : <Moon className="mr-2 h-4 w-4"/>}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4"/>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5"/>
          </Button>

          <div className="flex-1"/>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5"/>
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <span className="text-xs font-normal text-muted-foreground">3 new</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <p className="text-sm font-medium">New assignment posted</p>
                  <p className="text-xs text-muted-foreground">Mathematics - Due in 3 days</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <p className="text-sm font-medium">Quiz results available</p>
                  <p className="text-xs text-muted-foreground">Physics - Score: 85%</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <p className="text-sm font-medium">New badge earned!</p>
                  <p className="text-xs text-muted-foreground">You earned the &quot;Quick Learner&quot; badge</p>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme toggle (desktop) */}
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hidden lg:flex">
            {darkMode ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
          </Button>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)] p-4 lg:p-6">{children}</main>
      </div>
    </div>);
}
