"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Star, Search, Filter } from "lucide-react";
import { MotionDiv } from "@/components/motion-div";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const mentors = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    expertise: ["Web Development", "React", "UI/UX"],
    rating: 4.9,
    reviews: 24,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available this week",
    bio: "Frontend developer with 8+ years of experience specializing in React and modern JavaScript frameworks. Passionate about mentoring junior developers and helping them grow in their careers.",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Product Manager",
    company: "InnovateCo",
    expertise: ["Product Strategy", "UX Research", "Agile"],
    rating: 4.7,
    reviews: 18,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Limited availability",
    bio: "Product manager with experience in both startups and enterprise companies. I help mentees understand product development cycles and how to build user-centric products.",
  },
  {
    id: "3",
    name: "Priya Patel",
    title: "Data Scientist",
    company: "DataInsights",
    expertise: ["Machine Learning", "Python", "Data Analysis"],
    rating: 5.0,
    reviews: 31,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available this week",
    bio: "Data scientist with a PhD in Computer Science and 5+ years of industry experience. I enjoy helping others learn about data science, machine learning, and AI concepts.",
  },
  {
    id: "4",
    name: "James Wilson",
    title: "UX Designer",
    company: "DesignHub",
    expertise: ["UI Design", "User Research", "Figma"],
    rating: 4.8,
    reviews: 15,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available next week",
    bio: "UX designer focused on creating intuitive and accessible digital experiences. I've worked with startups and Fortune 500 companies to design products used by millions.",
  },
];

const myMentors = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    nextSession: "Tomorrow, 3:00 PM",
    image: "/placeholder.svg?height=100&width=100",
  },
];

const mySessions = [
  {
    id: "1",
    mentor: "Sarah Johnson",
    title: "Career Path Discussion",
    date: "Tomorrow, 3:00 PM",
    duration: "45 min",
    status: "Upcoming",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    mentor: "Sarah Johnson",
    title: "React Project Review",
    date: "Last Week",
    duration: "60 min",
    status: "Completed",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function MentorshipPage() {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  //   const { toast } = useToast();

  const handleRequestSession = () => {
    // toast({
    //   title: "Session Requested",
    //   description: "Your mentorship session request has been sent.",
    // });
  };

  return (
    <div className="p-5 py-8">
      <h1 className="text-3xl font-bold mb-6">Mentorship</h1>

      <Tabs defaultValue="find-mentors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find-mentors">Find Mentors</TabsTrigger>
          <TabsTrigger value="my-mentors">My Mentors</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentors" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search mentors by name, expertise, or company..."
                className="w-full pl-8"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Web Development</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
                <SelectItem value="design">UX/UI Design</SelectItem>
                <SelectItem value="product">Product Management</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {mentors.map((mentor, index) => (
              <MotionDiv
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={mentor.image} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="flex items-center justify-between">
                          <span>{mentor.name}</span>
                          <div className="flex items-center text-sm">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span>{mentor.rating}</span>
                            <span className="text-muted-foreground ml-1">
                              ({mentor.reviews})
                            </span>
                          </div>
                        </CardTitle>
                        <CardDescription className="text-base font-medium mt-1">
                          {mentor.title} at {mentor.company}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {mentor.expertise.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {mentor.bio}
                    </p>
                    <div className="mt-4 flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {mentor.availability}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full"
                          onClick={() => setSelectedMentor(mentor.id)}
                        >
                          Request Session
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Request Mentorship Session</DialogTitle>
                          <DialogDescription>
                            Schedule a session with{" "}
                            {mentors.find((m) => m.id === selectedMentor)?.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <label
                              htmlFor="session-topic"
                              className="text-sm font-medium"
                            >
                              Session Topic
                            </label>
                            <Input
                              id="session-topic"
                              placeholder="e.g. Career advice, Code review, etc."
                            />
                          </div>
                          <div className="grid gap-2">
                            <label
                              htmlFor="session-date"
                              className="text-sm font-medium"
                            >
                              Preferred Date
                            </label>
                            <Input id="session-date" type="date" />
                          </div>
                          <div className="grid gap-2">
                            <label
                              htmlFor="session-time"
                              className="text-sm font-medium"
                            >
                              Preferred Time
                            </label>
                            <Input id="session-time" type="time" />
                          </div>
                          <div className="grid gap-2">
                            <label
                              htmlFor="session-duration"
                              className="text-sm font-medium"
                            >
                              Duration
                            </label>
                            <Select defaultValue="30">
                              <SelectTrigger id="session-duration">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <label
                              htmlFor="session-notes"
                              className="text-sm font-medium"
                            >
                              Additional Notes
                            </label>
                            <Textarea
                              id="session-notes"
                              placeholder="Share what you'd like to discuss or any questions you have"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedMentor(null)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleRequestSession}>
                            Send Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-mentors" className="space-y-6">
          {myMentors.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {myMentors.map((mentor, index) => (
                <MotionDiv
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={mentor.image} alt={mentor.name} />
                          <AvatarFallback>
                            {mentor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{mentor.name}</CardTitle>
                          <CardDescription className="text-base font-medium mt-1">
                            {mentor.title} at {mentor.company}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center text-sm font-medium text-primary">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Next Session: {mentor.nextSession}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-3">
                      <Button className="flex-1">Schedule Session</Button>
                      <Button variant="outline" className="flex-1">
                        Message
                      </Button>
                    </CardFooter>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  You don&apos;t have any mentors yet. Find a mentor to get
                  started!
                </p>
                <Button asChild>
                  <a href="#find-mentors">Find Mentors</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          {mySessions.length > 0 ? (
            <div className="space-y-4">
              {mySessions.map((session, index) => (
                <MotionDiv
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={session.image}
                            alt={session.mentor}
                          />
                          <AvatarFallback>
                            {session.mentor.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-bold">{session.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            with {session.mentor}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              session.status === "Upcoming"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {session.status}
                          </Badge>
                          <div className="flex items-center justify-end mt-2 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{session.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span
                          className={
                            session.status === "Upcoming"
                              ? "font-medium text-primary"
                              : "text-muted-foreground"
                          }
                        >
                          {session.date}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-end gap-3">
                        {session.status === "Upcoming" ? (
                          <>
                            <Button variant="outline">Reschedule</Button>
                            <Button>Join Session</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline">View Notes</Button>
                            <Button>Leave Feedback</Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  You don&apos;t have any sessions scheduled. Book a session
                  with a mentor to get started!
                </p>
                <Button asChild>
                  <a href="#find-mentors">Find Mentors</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
