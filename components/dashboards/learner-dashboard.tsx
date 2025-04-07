"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Briefcase,
  Calendar,
  Users,
  Award,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { JobCard } from "@/components/job-card";
import { MotionDiv } from "@/components/motion-div";

// Mock data
const courses = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript basics",
    progress: 65,
    image: "https://picsum.photos/150/250",
    duration: "8 weeks",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Digital Marketing Essentials",
    description: "Master social media, SEO, and content marketing",
    progress: 30,
    image: "https://picsum.photos/150/250",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: "3",
    title: "Data Analysis with Python",
    description: "Learn to analyze and visualize data using Python",
    progress: 10,
    image: "https://picsum.photos/150/250",
    duration: "10 weeks",
    level: "Advanced",
  },
];

const jobs = [
  {
    id: "1",
    title: "Junior Web Developer",
    company: "TechStart Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "$40,000 - $55,000",
    posted: "2 days ago",
    logo: "https://picsum.photos/50",
    match: 92,
  },
  {
    id: "2",
    title: "Marketing Assistant",
    company: "Global Reach NGO",
    location: "New York, NY",
    type: "Part-time",
    salary: "$25 - $30/hour",
    posted: "1 week ago",
    logo: "https://picsum.photos/50",
    match: 85,
  },
  {
    id: "3",
    title: "Data Entry Specialist",
    company: "Youth Forward Initiative",
    location: "Chicago, IL",
    type: "Contract",
    salary: "$20 - $25/hour",
    posted: "3 days ago",
    logo: "https://picsum.photos/50",
    match: 78,
  },
];

const upcomingEvents = [
  {
    id: "1",
    title: "Mock Interview Session",
    date: "Tomorrow, 2:00 PM",
    type: "Interview Prep",
  },
  {
    id: "2",
    title: "Web Development Workshop",
    date: "Friday, 10:00 AM",
    type: "Learning",
  },
  {
    id: "3",
    title: "Career Mentorship Call",
    date: "Next Monday, 3:30 PM",
    type: "Mentorship",
  },
];

const skillTests = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    score: 85,
    totalQuestions: 20,
    completedDate: "2023-10-15",
    badge: "Advanced",
  },
  {
    id: "2",
    title: "HTML & CSS Basics",
    score: 92,
    totalQuestions: 15,
    completedDate: "2023-09-28",
    badge: "Expert",
  },
  {
    id: "3",
    title: "React Framework",
    score: 78,
    totalQuestions: 25,
    completedDate: "2023-11-05",
    badge: "Intermediate",
  },
];

export function LearnerDashboard() {
  const [activeTab, setActiveTab] = useState("courses");

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
                Course Progress
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/12</div>
              <p className="text-xs text-muted-foreground">
                Courses in progress
              </p>
              <Progress value={25} className="mt-3 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Job Applications
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                2 under review, 3 pending
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mentorship Sessions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Upcoming this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Skill Tests Completed
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Average score: 85%
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
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="jobs">Recommended Jobs</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="tests">Skill Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <MotionDiv
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CourseCard course={course} />
              </MotionDiv>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/coursesing">View All Courses</Link>
            </Button>
            <Button asChild>
              <Link href="/coursesing">Find New Courses</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job, index) => (
              <MotionDiv
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <JobCard job={job} />
              </MotionDiv>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/jobs">View All Jobs</Link>
            </Button>
            <Button asChild>
              <Link href="/jobs">My Applications</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="rounded-md border">
            {upcomingEvents.map((event, index) => (
              <MotionDiv
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className={`flex items-center p-4 ${
                    index !== 0 ? "border-t" : ""
                  }`}
                >
                  <div className="mr-4">
                    <Calendar className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {event.type}
                    </span>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/mentorship">Schedule New Session</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
              <div className="col-span-2">Test Name</div>
              <div>Score</div>
              <div>Completed</div>
              <div>Badge</div>
            </div>
            {skillTests.map((test, index) => (
              <MotionDiv
                key={test.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-5 gap-4 p-4 items-center border-b last:border-0">
                  <div className="col-span-2 font-medium">{test.title}</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-semibold">
                      {test.score}%
                    </span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {new Date(test.completedDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-xs font-semibold">
                      {test.badge}
                    </span>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/interview-prep">View All Tests</Link>
            </Button>
            <Button asChild>
              <Link href="/interview-prep">Take New Test</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Learning Path Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Web Development</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>UI/UX Design</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Data Analysis</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div className="pt-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/coursesing">View Learning Paths</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Completed lesson: CSS Flexbox
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Web Development Fundamentals
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">2h ago</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Earned badge: JavaScript Basics
                  </p>
                  <p className="text-xs text-muted-foreground">Skill Test</p>
                </div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Applied for: Junior Web Developer
                  </p>
                  <p className="text-xs text-muted-foreground">
                    TechStart Solutions
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">2 days ago</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Scheduled: Mock Interview
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Front-end Development
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">3 days ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
