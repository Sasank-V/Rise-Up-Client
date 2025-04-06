"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Briefcase,
  Calendar,
  MessageSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { JobCard } from "@/components/job-card";
import { MotionDiv } from "@/components/motion-div";
import LoadingScreen from "@/components/loading";

// Mock data
const courses = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript basics",
    progress: 65,
    image: "/placeholder.svg?height=150&width=250",
    duration: "8 weeks",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Digital Marketing Essentials",
    description: "Master social media, SEO, and content marketing",
    progress: 30,
    image: "/placeholder.svg?height=150&width=250",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: "3",
    title: "Data Analysis with Python",
    description: "Learn to analyze and visualize data using Python",
    progress: 10,
    image: "/placeholder.svg?height=150&width=250",
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
    logo: "/placeholder.svg?height=50&width=50",
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
    logo: "/placeholder.svg?height=50&width=50",
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
    logo: "/placeholder.svg?height=50&width=50",
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

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    redirect("/signin");
  }

  // Assuming role is stored in session
  const userRole = session?.user?.role || "learner";

  return (
    <div className="p-5 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {userRole === "learner" ? <LearnerDashboard /> : <NGODashboard />}
    </div>
  );
}

function LearnerDashboard() {
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
                Community Activity
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                New responses to your posts
              </p>
            </CardContent>
          </Card>
        </div>
      </MotionDiv>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="jobs">Recommended Jobs</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
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
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/learning">View All Courses</Link>
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
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/jobs">View All Jobs</Link>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NGODashboard() {
  // Mock data for NGO dashboard
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

  const candidates = [
    {
      id: "1",
      name: "Alex Johnson",
      position: "Youth Program Coordinator",
      status: "Interview",
      match: 95,
    },
    {
      id: "2",
      name: "Jamie Smith",
      position: "Digital Marketing Intern",
      status: "Application Review",
      match: 88,
    },
    {
      id: "3",
      name: "Taylor Brown",
      position: "Youth Program Coordinator",
      status: "Application Review",
      match: 82,
    },
  ];

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
                Interviews Scheduled
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">For this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Candidate Messages
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">3 unread messages</p>
            </CardContent>
          </Card>
        </div>
      </MotionDiv>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
          <TabsTrigger value="candidates">Top Candidates</TabsTrigger>
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
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/post-job">Post New Job</Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="candidates" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
              <div>Name</div>
              <div>Position</div>
              <div>Status</div>
              <div>Match</div>
            </div>
            {candidates.map((candidate, index) => (
              <MotionDiv
                key={candidate.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-4 gap-4 p-4 items-center border-b last:border-0">
                  <div className="font-medium">{candidate.name}</div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
