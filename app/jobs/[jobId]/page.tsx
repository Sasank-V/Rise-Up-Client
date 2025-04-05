"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Calendar,
  ArrowLeft,
  BookmarkPlus,
  Share2,
} from "lucide-react";
import { MotionDiv } from "@/components/motion-div";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
// import { useToast } from "@/hooks/use-toast";

// Mock job data
const jobData = {
  id: "1",
  title: "Junior Web Developer",
  company: "TechStart Solutions",
  location: "Remote",
  type: "Full-time",
  salary: "$40,000 - $55,000",
  posted: "2 days ago",
  deadline: "Dec 31, 2023",
  logo: "/placeholder.svg?height=100&width=100",
  match: 92,
  description: `
    <p>TechStart Solutions is looking for a motivated Junior Web Developer to join our growing team. This is an excellent opportunity for recent graduates or those early in their career to gain valuable experience in a supportive environment.</p>
    <h3>Responsibilities:</h3>
    <ul>
      <li>Develop and maintain responsive websites and web applications</li>
      <li>Collaborate with designers to implement user interfaces</li>
      <li>Debug issues and implement fixes</li>
      <li>Write clean, maintainable code</li>
      <li>Participate in code reviews and team meetings</li>
    </ul>
    <h3>Requirements:</h3>
    <ul>
      <li>Basic knowledge of HTML, CSS, and JavaScript</li>
      <li>Familiarity with at least one modern framework (React, Vue, Angular)</li>
      <li>Understanding of responsive design principles</li>
      <li>Ability to work in a team environment</li>
      <li>Strong problem-solving skills</li>
      <li>Eagerness to learn and grow</li>
    </ul>
    <h3>Benefits:</h3>
    <ul>
      <li>Competitive salary</li>
      <li>Flexible working hours</li>
      <li>Remote work options</li>
      <li>Professional development opportunities</li>
      <li>Mentorship from senior developers</li>
      <li>Health insurance</li>
      <li>Paid time off</li>
    </ul>
  `,
  skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
  companyInfo:
    "TechStart Solutions is a dynamic tech company focused on creating innovative web solutions for businesses of all sizes. We value creativity, collaboration, and continuous learning.",
};

// Mock similar jobs
const similarJobs = [
  {
    id: "2",
    title: "Frontend Developer Intern",
    company: "Digital Innovations",
    location: "Remote",
    type: "Internship",
    salary: "$20 - $25/hour",
    posted: "1 week ago",
    logo: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    title: "Junior UI Developer",
    company: "Creative Tech Labs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$45,000 - $55,000",
    posted: "3 days ago",
    logo: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "4",
    title: "Web Development Assistant",
    company: "Growth Solutions",
    location: "Chicago, IL",
    type: "Part-time",
    salary: "$22 - $28/hour",
    posted: "5 days ago",
    logo: "/placeholder.svg?height=50&width=50",
  },
];

export default function JobDetailPage({
  params,
}: {
  params: { jobId: string };
}) {
  const [isApplying, setIsApplying] = useState(false);
  //   const { toast } = useToast();

  // In a real app, you would fetch the job data based on the jobId
  const job = jobData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(params.jobId);
    // toast({
    //   title: "Application Submitted",
    //   description: "Your application has been submitted successfully.",
    // });
    setIsApplying(false);
  };

  return (
    <div className="p-5 py-8">
      <div className="mb-6">
        <Link
          href="/jobs"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to jobs
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={job.logo || "/placeholder.svg"}
                    alt={job.company}
                    className="h-full w-full object-cover"
                    height={500}
                    width={500}
                  />
                </div>
                <div>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <div className="text-lg text-muted-foreground">
                    {job.company}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Tabs defaultValue="description" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="space-y-4">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </TabsContent>
                  <TabsContent value="company" className="space-y-4">
                    <div className="prose max-w-none">
                      <p>{job.companyInfo}</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Dialog open={isApplying} onOpenChange={setIsApplying}>
                    <DialogTrigger asChild>
                      <Button className="flex-1">Apply Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter your full name" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="resume">Resume/CV</Label>
                          <Input id="resume" type="file" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cover">Cover Letter (Optional)</Label>
                          <Textarea
                            id="cover"
                            placeholder="Write a brief cover letter..."
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsApplying(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Submit Application</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="flex-1">
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    Save Job
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job Match</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{job.match}%</span>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      className="text-muted opacity-20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeDasharray={`${job.match * 2.83} 283`}
                      strokeLinecap="round"
                      className="text-primary"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Your profile is a strong match for this position
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Deadline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{job.deadline}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar Jobs Section */}
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Similar Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {similarJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-muted transition-colors rounded"
                >
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="h-10 w-10 rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm">{job.salary}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.posted}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
