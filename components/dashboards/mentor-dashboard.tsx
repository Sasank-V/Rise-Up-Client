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
  Calendar,
  MessageSquare,
  Users,
  Award,
  Clock,
  CheckCircle,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/motion-div";

// Mock data
const mentorCourses = [
  {
    id: "1",
    title: "Advanced JavaScript Concepts",
    students: 24,
    nextSession: "Tomorrow, 3:00 PM",
    rating: 4.8,
    image: "https://picsum.photos/150/250",
  },
  {
    id: "2",
    title: "React Hooks Masterclass",
    students: 18,
    nextSession: "Friday, 2:00 PM",
    rating: 4.9,
    image: "https://picsum.photos/150/250",
  },
];

const mentorshipRequests = [
  {
    id: "1",
    name: "Alex Johnson",
    topic: "Career Guidance in Web Development",
    date: "Requested for Nov 15, 2:00 PM",
    image: "https://picsum.photos/40",
    status: "pending",
  },
  {
    id: "2",
    name: "Jamie Smith",
    topic: "React Performance Optimization",
    date: "Requested for Nov 16, 4:00 PM",
    image: "https://picsum.photos/40",
    status: "pending",
  },
  {
    id: "3",
    name: "Taylor Brown",
    topic: "JavaScript Interview Preparation",
    date: "Requested for Nov 18, 1:00 PM",
    image: "https://picsum.photos/40",
    status: "pending",
  },
];

const testSubmissions = [
  {
    id: "1",
    name: "Morgan Lee",
    test: "JavaScript Fundamentals",
    score: 85,
    submitted: "2023-11-10",
    reviewed: false,
  },
  {
    id: "2",
    name: "Casey Wilson",
    test: "React Framework",
    score: 92,
    submitted: "2023-11-09",
    reviewed: false,
  },
  {
    id: "3",
    name: "Jordan Taylor",
    test: "HTML & CSS Basics",
    score: 78,
    submitted: "2023-11-08",
    reviewed: true,
  },
];

export function MentorDashboard() {
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
                Active Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">42 total students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mentorship Requests
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Pending approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Test Submissions
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mentor Rating
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.9/5</div>
              <p className="text-xs text-muted-foreground">
                Based on 56 reviews
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
          <TabsTrigger value="requests">Mentorship Requests</TabsTrigger>
          <TabsTrigger value="tests">Test Submissions</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mentorCourses.map((course, index) => (
              <MotionDiv
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-t-lg"
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
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Next: {course.nextSession}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-1">
                            {course.rating}
                          </span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild size="sm">
                          <Link href={`/mentor/courses/${course.id}`}>
                            Manage Course
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Link href={`/mentor/courses/${course.id}/sessions`}>
                            View Sessions
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
              <Link href="/mentor/courses/create">Create New Course</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <div className="rounded-md border">
            {mentorshipRequests.map((request, index) => (
              <MotionDiv
                key={request.id}
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
                    <Avatar>
                      <AvatarImage src={request.image} alt={request.name} />
                      <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{request.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.topic}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {request.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="sr-only">Accept</span>
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <XIcon className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Decline</span>
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/mentor/requests">View All Requests</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
              <div className="col-span-2">Student</div>
              <div>Test</div>
              <div>Score</div>
              <div>Submitted</div>
              <div>Actions</div>
            </div>
            {testSubmissions.map((submission, index) => (
              <MotionDiv
                key={submission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-6 gap-4 p-4 items-center border-b last:border-0">
                  <div className="col-span-2 font-medium">
                    {submission.name}
                  </div>
                  <div>{submission.test}</div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        submission.score >= 90
                          ? "bg-green-100 text-green-800"
                          : submission.score >= 70
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {submission.score}%
                    </span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {new Date(submission.submitted).toLocaleDateString()}
                  </div>
                  <div>
                    {submission.reviewed ? (
                      <Badge variant="outline">Reviewed</Badge>
                    ) : (
                      <Button size="sm">Review</Button>
                    )}
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/mentor/tests">View All Submissions</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Your scheduled mentoring sessions for the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 font-medium">Today</div>
                  <div className="p-4 flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Advanced JavaScript Concepts
                      </p>
                      <p className="text-sm text-muted-foreground">
                        3:00 PM - 4:30 PM
                      </p>
                    </div>
                    <Button size="sm">Join Session</Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 font-medium">Tomorrow</div>
                  <div className="p-4 flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        1:1 Mentorship with Alex Johnson
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2:00 PM - 3:00 PM
                      </p>
                    </div>
                    <Button size="sm">Join Session</Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 font-medium">
                    Friday, Nov 17
                  </div>
                  <div className="p-4 flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">React Hooks Masterclass</p>
                      <p className="text-sm text-muted-foreground">
                        2:00 PM - 3:30 PM
                      </p>
                    </div>
                    <Button size="sm">Join Session</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/mentor/schedule">View Full Schedule</Link>
            </Button>
            <Button asChild>
              <Link href="/mentor/schedule/create">Create Session</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/32" alt="Student" />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Morgan Lee</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  85% complete
                </span>
              </div>
              <Progress value={85} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/32" alt="Student" />
                    <AvatarFallback>CW</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Casey Wilson</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  72% complete
                </span>
              </div>
              <Progress value={72} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/32" alt="Student" />
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Jordan Taylor</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  45% complete
                </span>
              </div>
              <Progress value={45} className="h-2" />

              <div className="pt-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/mentor/students">View All Students</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Average Attendance Rate</p>
                  <p className="text-xs text-muted-foreground">
                    Across all courses
                  </p>
                </div>
                <div className="text-lg font-bold">92%</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Student Engagement</p>
                  <p className="text-xs text-muted-foreground">
                    Questions per session
                  </p>
                </div>
                <div className="text-lg font-bold">8.5</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Assignment Completion</p>
                  <p className="text-xs text-muted-foreground">Average rate</p>
                </div>
                <div className="text-lg font-bold">78%</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Course Materials</p>
                  <p className="text-xs text-muted-foreground">Download rate</p>
                </div>
                <div className="text-lg font-bold">85%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
