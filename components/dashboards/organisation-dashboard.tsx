"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Briefcase,
  Calendar,
  Users,
  BarChart,
  PieChart,
  TrendingUp,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/motion-div";
import Image from "next/image";

// Mock data
const postedJobs = [
  {
    id: "1",
    title: "Youth Program Coordinator",
    applications: 12,
    status: "Active",
    posted: "1 week ago",
  },
  {
    id: "2",
    title: "Digital Marketing Intern",
    applications: 8,
    status: "Active",
    posted: "3 days ago",
  },
  {
    id: "3",
    title: "Community Outreach Specialist",
    applications: 5,
    status: "Draft",
    posted: "Not published",
  },
];

const organizationCourses = [
  {
    id: "1",
    title: "Digital Skills for Youth",
    students: 45,
    completionRate: 68,
    image: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "2",
    title: "Career Readiness Workshop",
    students: 32,
    completionRate: 75,
    image: "/placeholder.svg?height=150&width=250",
  },
];

const topCandidates = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "Youth Program Coordinator",
    status: "Interview",
    match: 95,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jamie Smith",
    position: "Digital Marketing Intern",
    status: "Application Review",
    match: 88,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Taylor Brown",
    position: "Youth Program Coordinator",
    status: "Application Review",
    match: 82,
    image: "/placeholder.svg?height=40&width=40",
  },
];

export function OrganisationDashboard() {
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div className="space-y-8">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Job Posts
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">1 draft pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">
                +8 since last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">77 total students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Platform Reach
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">
                Profile views this month
              </p>
            </CardContent>
          </Card>
        </div>
      </MotionDiv>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="candidates">Top Candidates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
              <div>Job Title</div>
              <div>Applications</div>
              <div>Status</div>
              <div>Posted</div>
            </div>
            {postedJobs.map((job, index) => (
              <MotionDiv
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-4 gap-4 p-4 items-center border-b last:border-0">
                  <div className="font-medium">{job.title}</div>
                  <div>{job.applications}</div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="text-muted-foreground">{job.posted}</div>
                </div>
              </MotionDiv>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/jobs/create">Post New Job</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/jobs/manage">Manage All Jobs</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {organizationCourses.map((course, index) => (
              <MotionDiv
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video relative">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-t-lg"
                        height={500}
                        width={500}
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 backdrop-blur-sm"
                        >
                          {course.students} Students
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Completion Rate</span>
                          <span>{course.completionRate}%</span>
                        </div>
                        <Progress
                          value={course.completionRate}
                          className="h-2"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button asChild size="sm">
                          <Link href={`/courses/${course.id}/manage`}>
                            Manage Course
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Link href={`/courses/${course.id}/analytics`}>
                            View Analytics
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/courses/create">Create New Course</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/courses/manage">Manage All Courses</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
              <div className="col-span-2">Candidate</div>
              <div>Position</div>
              <div>Status</div>
              <div>Match</div>
            </div>
            {topCandidates.map((candidate, index) => (
              <MotionDiv
                key={candidate.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-5 gap-4 p-4 items-center border-b last:border-0">
                  <div className="col-span-2 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={candidate.image} alt={candidate.name} />
                      <AvatarFallback>
                        {candidate.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{candidate.name}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {candidate.position}
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
                      {candidate.status}
                    </span>
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      {candidate.match}% Match
                    </span>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/organisation/candidates">View All Candidates</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Job Posting Performance</CardTitle>
                <CardDescription>Applications over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Job application analytics visualization would appear here
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Engagement</CardTitle>
                <CardDescription>Student participation metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Course engagement analytics visualization would appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <h4 className="font-medium">Profile Views</h4>
                  </div>
                  <p className="text-2xl font-bold">1,245</p>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <h4 className="font-medium">Applicant Quality</h4>
                  </div>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-muted-foreground">
                    +5% from last month
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <h4 className="font-medium">Time to Hire</h4>
                  </div>
                  <p className="text-2xl font-bold">18 days</p>
                  <p className="text-xs text-muted-foreground">
                    -3 days from last month
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-orange-500" />
                    <h4 className="font-medium">Course Completion</h4>
                  </div>
                  <p className="text-2xl font-bold">72%</p>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/organisation/analytics">
                View Detailed Analytics
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    New application received
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Youth Program Coordinator
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">2h ago</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Course milestone reached
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Digital Skills for Youth: 50% completion
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Interview scheduled</p>
                  <p className="text-xs text-muted-foreground">
                    Alex Johnson for Youth Program Coordinator
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">2 days ago</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New job posted</p>
                  <p className="text-xs text-muted-foreground">
                    Digital Marketing Intern
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">3 days ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Interview Day</p>
                  <p className="text-xs text-muted-foreground">
                    Tomorrow, 10:00 AM - 4:00 PM
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Course Launch: Leadership Skills
                  </p>
                  <p className="text-xs text-muted-foreground">Nov 20, 2023</p>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Youth Career Fair</p>
                  <p className="text-xs text-muted-foreground">Dec 5, 2023</p>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
              <div className="pt-2">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/organisation/events">View All Events</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
