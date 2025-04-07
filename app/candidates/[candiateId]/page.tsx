"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Download,
  MapPin,
  MessageSquare,
  Phone,
  Globe,
  Linkedin,
  Github,
} from "lucide-react";
import { MotionDiv } from "@/components/motion-div";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock candidate data
const candidateData = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "HTML/CSS",
    "Git",
    "MongoDB",
  ],
  experience: [
    {
      id: "exp1",
      title: "Junior Web Developer",
      company: "Tech Solutions Inc.",
      location: "New York, NY",
      startDate: "June 2021",
      endDate: "Present",
      description:
        "Developed and maintained responsive web applications using React and Node.js. Collaborated with design team to implement UI/UX improvements.",
    },
    {
      id: "exp2",
      title: "Web Development Intern",
      company: "Digital Creations",
      location: "Remote",
      startDate: "January 2021",
      endDate: "May 2021",
      description:
        "Assisted in front-end development tasks. Created responsive layouts using HTML, CSS, and JavaScript.",
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      institution: "New York University",
      location: "New York, NY",
      startDate: "2017",
      endDate: "2021",
      gpa: "3.8/4.0",
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "React Developer Certification",
      issuer: "React Training",
      date: "2022",
    },
    {
      id: "cert2",
      name: "MongoDB Basics",
      issuer: "MongoDB University",
      date: "2021",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "E-commerce Platform",
      description:
        "Built a full-stack e-commerce platform using MERN stack with features like user authentication, product catalog, and payment processing.",
      link: "https://github.com/alexjohnson/ecommerce-platform",
    },
    {
      id: "proj2",
      name: "Weather Dashboard",
      description:
        "Created a weather dashboard application that fetches data from a weather API and displays current conditions and forecasts.",
      link: "https://github.com/alexjohnson/weather-dashboard",
    },
  ],
  appliedJobs: [
    {
      id: "job1",
      title: "Youth Program Coordinator",
      appliedDate: "2023-11-10",
      status: "Interview Scheduled",
      notes: "Strong candidate with relevant experience in youth programs.",
    },
  ],
  courses: [
    {
      id: "course1",
      title: "Digital Skills for Youth",
      progress: 85,
      completedDate: "2023-10-15",
    },
  ],
  status: "Interview",
  match: 95,
  image: "/placeholder.svg?height=200&width=200",
  lastActive: "2 days ago",
  socialLinks: {
    website: "https://alexjohnson.dev",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
  },
  skillAssessments: [
    {
      skill: "JavaScript",
      score: 92,
      level: "Advanced",
    },
    {
      skill: "React",
      score: 88,
      level: "Intermediate",
    },
    {
      skill: "Node.js",
      score: 85,
      level: "Intermediate",
    },
  ],
};

export default function CandidateProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  // In a real app, you would fetch the candidate data based on the candidateId
  const candidate = candidateData;

  const handleScheduleInterview = () => {
    // toast({
    //   title: "Interview Scheduled",
    //   description: "Interview has been scheduled successfully.",
    // });
  };

  const handleSendMessage = () => {
    // toast({
    //   title: "Message Sent",
    //   description: "Your message has been sent to the candidate.",
    // });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Link
          href="/organization/candidates"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm mr-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to candidates
        </Link>
        <h1 className="text-3xl font-bold flex-1">{candidate.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Profile
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={candidate.image} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{candidate.name}</h2>
                    <p className="text-muted-foreground">Web Developer</p>
                    <div className="flex items-center justify-center mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm text-muted-foreground">
                        {candidate.location}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant={
                      candidate.status === "Interview"
                        ? "default"
                        : candidate.status === "Application Review"
                        ? "outline"
                        : candidate.status === "Potential"
                        ? "secondary"
                        : "destructive"
                    }
                    className="px-3 py-1"
                  >
                    {candidate.status}
                  </Badge>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Match Score</span>
                    <span className="font-medium">{candidate.match}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${candidate.match}%` }}
                    ></div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${candidate.email}`}
                        className="text-sm hover:underline"
                      >
                        {candidate.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${candidate.phone}`}
                        className="text-sm hover:underline"
                      >
                        {candidate.phone}
                      </a>
                    </div>
                    {candidate.socialLinks.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={candidate.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          Personal Website
                        </a>
                      </div>
                    )}
                    {candidate.socialLinks.linkedin && (
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={candidate.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                    {candidate.socialLinks.github && (
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={candidate.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          GitHub Profile
                        </a>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="pt-2 space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Schedule Interview</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Schedule Interview with {candidate.name}
                          </DialogTitle>
                          <DialogDescription>
                            Set up an interview time and format for this
                            candidate.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="interview-type">
                              Interview Type
                            </Label>
                            <Select defaultValue="video">
                              <SelectTrigger id="interview-type">
                                <SelectValue placeholder="Select interview type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">
                                  Video Call
                                </SelectItem>
                                <SelectItem value="phone">
                                  Phone Call
                                </SelectItem>
                                <SelectItem value="in-person">
                                  In-Person
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="interview-date">Date</Label>
                            <Input id="interview-date" type="date" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="interview-time">Time</Label>
                            <Input id="interview-time" type="time" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="interview-duration">Duration</Label>
                            <Select defaultValue="60">
                              <SelectTrigger id="interview-duration">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                                <SelectItem value="90">90 minutes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="interview-notes">Notes</Label>
                            <Textarea
                              id="interview-notes"
                              placeholder="Add any specific details or questions for the interview..."
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" type="button">
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={handleScheduleInterview}
                          >
                            Schedule
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Message {candidate.name}</DialogTitle>
                          <DialogDescription>
                            Send a direct message to this candidate.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="message-subject">Subject</Label>
                            <Input
                              id="message-subject"
                              placeholder="Enter message subject"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="message-body">Message</Label>
                            <Textarea
                              id="message-body"
                              placeholder="Type your message here..."
                              className="min-h-[150px]"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" type="button">
                            Cancel
                          </Button>
                          <Button type="button" onClick={handleSendMessage}>
                            Send Message
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Skill Assessments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.skillAssessments.map((assessment) => (
                  <div key={assessment.skill} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{assessment.skill}</span>
                      <span className="font-medium">
                        {assessment.score}% - {assessment.level}
                      </span>
                    </div>
                    <Progress value={assessment.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {candidate.experience.map((exp) => (
                      <div key={exp.id} className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{exp.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <p className="text-sm font-medium">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {candidate.education.map((edu) => (
                      <div key={edu.id} className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{edu.degree}</h3>
                          <span className="text-sm text-muted-foreground">
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        <p className="text-sm font-medium">
                          {edu.institution} • {edu.location}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-muted-foreground">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {candidate.certifications.map((cert) => (
                      <div key={cert.id} className="space-y-1">
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {candidate.projects.map((project) => (
                      <div key={project.id} className="space-y-2">
                        <h3 className="font-bold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.description}
                        </p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                {candidate.appliedJobs.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Job Applications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {candidate.appliedJobs.map((job) => (
                        <div key={job.id} className="space-y-3">
                          <div className="flex justify-between">
                            <h3 className="font-bold">{job.title}</h3>
                            <Badge variant="outline">{job.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Applied on{" "}
                            {new Date(job.appliedDate).toLocaleDateString()}
                          </p>
                          {job.notes && (
                            <div className="bg-muted p-3 rounded-md">
                              <p className="text-sm">{job.notes}</p>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button size="sm">View Application</Button>
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground mb-4">
                        This candidate hasn&apos;t applied to any jobs yet.
                      </p>
                      <Button variant="outline">Recommend Jobs</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                {candidate.courses.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {candidate.courses.map((course) => (
                        <div key={course.id} className="space-y-3">
                          <div className="flex justify-between">
                            <h3 className="font-bold">{course.title}</h3>
                            <span className="text-sm text-muted-foreground">
                              Completed on{" "}
                              {new Date(
                                course.completedDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground mb-4">
                        This candidate hasn&apos;t enrolled in any courses yet.
                      </p>
                      <Button variant="outline">Recommend Courses</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recruiter Notes</CardTitle>
                    <CardDescription>
                      Add private notes about this candidate that are only
                      visible to your team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Add notes about this candidate..."
                      className="min-h-[200px]"
                    />
                    <div className="flex justify-end mt-4">
                      <Button>Save Notes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
