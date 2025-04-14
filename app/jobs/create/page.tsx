"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Link from "next/link";

export default function CreateJobPage() {
  // States for the simple fields.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [evaluationCriteria, setEvaluationCriteria] = useState("");
  const [salaryRangeStart, setSalaryRangeStart] = useState("");
  const [salaryRangeEnd, setSalaryRangeEnd] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");

  // Skill Tags states
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
    // Build your Job object.
    const job = {
      title,
      description,
      skill_tags: skills,
      work_mode: workMode,
      job_type: jobType,
      location,
      salary_range_start: Number(salaryRangeStart),
      salary_range_end: Number(salaryRangeEnd),
      contact,
      evaluation_criteria: evaluationCriteria,
    };
    console.log("Job submitted:", job);
    // Send job data to your backend or API here.
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
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g., Youth Program Coordinator"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed overview of the job..."
                className="min-h-[150px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Skill Tags */}
            <div className="space-y-2">
              <Label>Skill Tags</Label>
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
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="flex-1"
                />
                <Button type="submit" size="sm" onClick={addSkill}>
                  Add
                </Button>
              </div>
            </div>

            <div className="flex gap-10">
              {/* Work Mode */}
              <div className="space-y-2">
                <Label htmlFor="work-mode">Work Mode</Label>
                <Select value={workMode} onValueChange={setWorkMode}>
                  <SelectTrigger id="work-mode">
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label htmlFor="job-type">Job Type</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="job-type">
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
              {/* Location */}
              <div className="space-y-2 w-full">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter a specific location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary-range-start">Minimum Salary</Label>
                <Input
                  id="salary-range-start"
                  type="number"
                  placeholder="e.g., 40000"
                  value={salaryRangeStart}
                  onChange={(e) => setSalaryRangeStart(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary-range-end">Maximum Salary</Label>
                <Input
                  id="salary-range-end"
                  type="number"
                  placeholder="e.g., 55000"
                  value={salaryRangeEnd}
                  onChange={(e) => setSalaryRangeEnd(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                placeholder="Enter contact details (e.g., email or phone)"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            {/* Evaluation Criteria */}
            <div className="space-y-2">
              <Label htmlFor="evaluation-criteria">Evaluation Criteria</Label>
              <Textarea
                id="evaluation-criteria"
                placeholder="Enter evaluation criteria for the job"
                className="min-h-[100px]"
                value={evaluationCriteria}
                onChange={(e) => setEvaluationCriteria(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="submit">Publish Job</Button>
        </div>
      </form>
    </div>
  );
}
