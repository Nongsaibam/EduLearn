"use client";
import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCourses } from "@/lib/api";
import { Search, Filter, Clock, Users, Star, Play, BookOpen, CheckCircle, } from "lucide-react";
const defaultCourses = [
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
];
function CourseCard({ course }) {
    return (<Card className="overflow-hidden bg-card border-border transition-all hover:border-primary/50 hover:shadow-lg">
      <div className="relative aspect-video bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
          <BookOpen className="h-12 w-12 text-primary/40"/>
        </div>
        {course.status === "completed" && (<div className="absolute right-2 top-2">
            <Badge className="bg-accent text-accent-foreground">
              <CheckCircle className="mr-1 h-3 w-3"/>
              Completed
            </Badge>
          </div>)}
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">
              {course.category}
            </Badge>
            <h3 className="font-semibold text-foreground line-clamp-1">{course.title}</h3>
            <p className="text-sm text-muted-foreground">{course.instructor}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3"/>
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3"/>
              {course.students.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-chart-3 text-chart-3"/>
              {course.rating}
            </span>
          </div>

          {course.status !== "available" && (<div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {course.completedLessons}/{course.lessons} lessons
                </span>
              </div>
              <Progress value={course.progress} className="h-2"/>
            </div>)}

          <Button className="w-full" variant={course.status === "available" ? "default" : "secondary"}>
            {course.status === "available" ? (<>
                <BookOpen className="mr-2 h-4 w-4"/>
                Enroll Now
              </>) : course.status === "completed" ? (<>
                <Play className="mr-2 h-4 w-4"/>
                Review Course
              </>) : (<>
                <Play className="mr-2 h-4 w-4"/>
                Continue Learning
              </>)}
          </Button>
        </div>
      </CardContent>
    </Card>);
}
export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState(defaultCourses);
    const [error, setError] = useState("");
    useEffect(() => {
        let active = true;
        getCourses({ q: searchQuery })
            .then((data) => {
            if (active) {
                setCourses(data.courses);
            }
        })
            .catch((apiError) => {
            if (active) {
                setError(apiError.message || "Unable to load courses");
            }
        });
        return () => {
            active = false;
        };
    }, [searchQuery]);
    const enrolledCourses = useMemo(() => courses.filter((c) => c.status === "enrolled"), [courses]);
    const completedCourses = useMemo(() => courses.filter((c) => c.status === "completed"), [courses]);
    const availableCourses = useMemo(() => courses.filter((c) => c.status === "available"), [courses]);
    return (<DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
            <p className="text-muted-foreground">
              Manage and explore your learning journey
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
              <Input placeholder="Search courses..." className="w-full pl-9 sm:w-64 bg-secondary border-border" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <Button variant="outline" size="icon" className="border-border">
              <Filter className="h-4 w-4"/>
            </Button>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="enrolled">
              Enrolled ({enrolledCourses.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="explore">
              Explore ({availableCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (<CourseCard key={course.id} course={course}/>))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map((course) => (<CourseCard key={course.id} course={course}/>))}
            </div>
          </TabsContent>

          <TabsContent value="explore" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableCourses.map((course) => (<CourseCard key={course.id} course={course}/>))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>);
}
