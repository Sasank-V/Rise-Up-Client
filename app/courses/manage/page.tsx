"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Users,
  BookOpen,
} from "lucide-react";
import { MotionDiv } from "@/components/motion-div";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

// Mock data for courses
const courses = [
  {
    id: "1",
    title: "Digital Skills for Youth",
    description:
      "A comprehensive course covering essential digital skills for today's job market.",
    students: 45,
    completionRate: 68,
    status: "Active",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    image: "/placeholder.svg?height=150&width=250",
    instructor: "Sarah Johnson",
    category: "Digital Skills",
  },
  {
    id: "2",
    title: "Career Readiness Workshop",
    description:
      "Prepare for the job market with resume building, interview skills, and career planning.",
    students: 32,
    completionRate: 75,
    status: "Active",
    startDate: "2023-10-15",
    endDate: "2023-11-30",
    image: "/placeholder.svg?height=150&width=250",
    instructor: "Michael Chen",
    category: "Career Development",
  },
  {
    id: "3",
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of HTML, CSS, and JavaScript to build your first website.",
    students: 28,
    completionRate: 45,
    status: "Active",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    image: "/placeholder.svg?height=150&width=250",
    instructor: "Alex Johnson",
    category: "Programming",
  },
  {
    id: "4",
    title: "Financial Literacy for Young Adults",
    description:
      "Essential financial knowledge for budgeting, saving, and planning for the future.",
    students: 38,
    completionRate: 82,
    status: "Completed",
    startDate: "2023-07-15",
    endDate: "2023-09-30",
    image: "/placeholder.svg?height=150&width=250",
    instructor: "Jamie Smith",
    category: "Finance",
  },
  {
    id: "5",
    title: "Leadership and Communication",
    description:
      "Develop essential leadership and communication skills for professional growth.",
    students: 0,
    completionRate: 0,
    status: "Draft",
    startDate: "",
    endDate: "",
    image: "/placeholder.svg?height=150&width=250",
    instructor: "Priya Patel",
    category: "Professional Skills",
  },
];

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter courses based on active tab
  const filteredCourses = courses.filter((course) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return course.status === "Active";
    if (activeTab === "completed") return course.status === "Completed";
    if (activeTab === "draft") return course.status === "Draft";
    return true;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground mt-1">
            Manage your organization&apos;s courses and track student progress
          </p>
        </div>
        <Button asChild>
          <Link href="/organization/courses/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses by title, category, or instructor..."
            className="w-full pl-8"
          />
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="students">Most Students</SelectItem>
            <SelectItem value="completion">Highest Completion</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
        >
          <Filter className="h-4 w-4" />
          <span className="sr-only">Toggle View</span>
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course, index) => (
                <MotionDiv
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="aspect-video relative">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-t-lg"
                        height={100}
                        width={100}
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant={
                            course.status === "Active"
                              ? "default"
                              : course.status === "Completed"
                              ? "secondary"
                              : "outline"
                          }
                          className="bg-background/80 backdrop-blur-sm"
                        >
                          {course.status}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">
                            <Link
                              href={`/organization/courses/${course.id}`}
                              className="hover:underline"
                            >
                              {course.title}
                            </Link>
                          </h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/organization/courses/${course.id}`}
                                >
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/organization/courses/${course.id}/edit`}
                                >
                                  Edit Course
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/organization/courses/${course.id}/analytics`}
                                >
                                  View Analytics
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>{course.category}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{course.students} Students</span>
                        </div>
                      </div>

                      {course.status !== "Draft" && (
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completion Rate</span>
                            <span>{course.completionRate}%</span>
                          </div>
                          <Progress
                            value={course.completionRate}
                            className="h-2"
                          />
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <Button asChild size="sm" className="flex-1">
                          <Link href={`/organization/courses/${course.id}`}>
                            Manage
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Link
                            href={`/organization/courses/${course.id}/analytics`}
                          >
                            Analytics
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Course</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Students</th>
                      <th className="text-left p-4">Completion</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="border-b last:border-0">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-16 rounded overflow-hidden">
                              <Image
                                src={course.image || "/placeholder.svg"}
                                alt={course.title}
                                className="h-full w-full object-cover"
                                height={100}
                                width={100}
                              />
                            </div>
                            <div>
                              <Link
                                href={`/organization/courses/${course.id}`}
                                className="font-medium hover:underline"
                              >
                                {course.title}
                              </Link>
                              <p className="text-xs text-muted-foreground">
                                {course.instructor}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{course.category}</td>
                        <td className="p-4">{course.students}</td>
                        <td className="p-4">
                          {course.status !== "Draft" ? (
                            <div className="flex items-center gap-2">
                              <Progress
                                value={course.completionRate}
                                className="h-2 w-24"
                              />
                              <span className="text-sm">
                                {course.completionRate}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              -
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={
                              course.status === "Active"
                                ? "default"
                                : course.status === "Completed"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {course.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/organization/courses/${course.id}`}
                                >
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/organization/courses/${course.id}/edit`}
                                >
                                  Edit Course
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/organization/courses/${course.id}/analytics`}
                                >
                                  View Analytics
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {filteredCourses.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  No courses found matching your criteria.
                </p>
                <Button variant="outline">Clear Filters</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
