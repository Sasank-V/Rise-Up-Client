"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Link from "next/link";

export default function CreateJobPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    // toast({
    //   title: "Job posted",
    //   description: "Your job has been posted successfully.",
    // });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Post New Job</h1>
        <Button asChild variant="outline">
          <Link href="/dashboard">Cancel</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="requirements">
              Requirements & Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
                <CardDescription>
                  Provide the basic information about the job position.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Youth Program Coordinator"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="e.g., Youth Services"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="on-site">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Only show if on-site or hybrid is selected */}
                <div className="space-y-2">
                  <Label htmlFor="address">Office Address</Label>
                  <Input
                    id="address"
                    placeholder="e.g., 123 Main St, City, State, ZIP"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min">Minimum Salary</Label>
                    <Input
                      id="salary-min"
                      type="number"
                      placeholder="e.g., 40000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary-max">Maximum Salary</Label>
                    <Input
                      id="salary-max"
                      type="number"
                      placeholder="e.g., 55000"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="hide-salary" />
                  <Label htmlFor="hide-salary">
                    Hide salary from job posting
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>
                  Provide detailed information about the job position.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="summary">Job Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Provide a brief overview of the position..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="List the key responsibilities for this position..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    placeholder="List the benefits offered with this position..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="application-instructions">
                    Application Instructions
                  </Label>
                  <Textarea
                    id="application-instructions"
                    placeholder="Provide any specific instructions for applicants..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Requirements & Skills</CardTitle>
                <CardDescription>
                  Specify the qualifications and skills needed for this
                  position.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qualifications">Qualifications</Label>
                  <Textarea
                    id="qualifications"
                    placeholder="List the required qualifications for this position..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Select>
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select required experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">
                        Entry Level (0-1 years)
                      </SelectItem>
                      <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                      <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      <SelectItem value="lead">
                        Lead/Manager (7+ years)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Select>
                    <SelectTrigger id="education">
                      <SelectValue placeholder="Select required education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">
                        High School Diploma
                      </SelectItem>
                      <SelectItem value="associate">
                        Associate&apos;s Degree
                      </SelectItem>
                      <SelectItem value="bachelor">
                        Bachelor&apos;s Degree
                      </SelectItem>
                      <SelectItem value="master">
                        Master&apos;s Degree
                      </SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                      <SelectItem value="none">
                        No Specific Requirement
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Required Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {skill}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>

                  <form onSubmit={addSkill} className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      className="flex-1"
                    />
                    <Button type="submit" size="sm">
                      Add
                    </Button>
                  </form>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assessment">Assessment Type</Label>
                  <Select>
                    <SelectTrigger id="assessment">
                      <SelectValue placeholder="Select assessment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Assessment</SelectItem>
                      <SelectItem value="test">Skills Test</SelectItem>
                      <SelectItem value="assignment">
                        Take-home Assignment
                      </SelectItem>
                      <SelectItem value="interview">
                        Technical Interview
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publishing Options</CardTitle>
                <CardDescription>
                  Configure how and when your job will be published.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Publication Status</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                      <SelectItem value="publish">Publish Now</SelectItem>
                      <SelectItem value="schedule">
                        Schedule Publication
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Only show if schedule is selected */}
                <div className="space-y-2">
                  <Label htmlFor="publish-date">Publication Date</Label>
                  <Input id="publish-date" type="datetime-local" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" />
                  <Label htmlFor="featured">Mark as featured job</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Publish Job</Button>
        </div>
      </form>
    </div>
  );
}
