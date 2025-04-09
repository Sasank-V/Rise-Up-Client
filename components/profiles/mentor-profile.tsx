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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/motion-div";
import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function MentorProfilePage() {
  const [expertise, setExpertise] = useState([
    "Web Development",
    "React",
    "Frontend Architecture",
    "UI/UX Implementation",
    "Performance Optimization",
  ]);
  const [newExpertise, setNewExpertise] = useState("");
  const [availableTimes, setAvailableTimes] = useState([
    { day: "Monday", startTime: "18:00", endTime: "20:00" },
    { day: "Wednesday", startTime: "17:00", endTime: "19:00" },
    { day: "Friday", startTime: "16:00", endTime: "18:00" },
  ]);

  const handleAddExpertise = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpertise && !expertise.includes(newExpertise)) {
      setExpertise([...expertise, newExpertise]);
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (skill: string) => {
    setExpertise(expertise.filter((s) => s !== skill));
  };

  const handleAddTimeSlot = () => {
    setAvailableTimes([
      ...availableTimes,
      { day: "Monday", startTime: "09:00", endTime: "10:00" },
    ]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    setAvailableTimes(availableTimes.filter((_, i) => i !== index));
  };

  const handleUpdateTimeSlot = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedTimes = [...availableTimes];
    updatedTimes[index] = { ...updatedTimes[index], [field]: value };
    setAvailableTimes(updatedTimes);
  };

  const handleSaveProfile = () => {
    // toast({
    //   title: "Profile Updated",
    //   description: "Your mentor profile has been successfully updated.",
    // });
  };

  return (
    <div className="p-5 py-8">
      <h1 className="text-3xl font-bold mb-6">My Mentor Profile</h1>

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
                    <AvatarImage src="https://picsum.photos/96" alt="Profile" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">Sarah Johnson</h2>
                    <p className="text-muted-foreground">
                      Senior Frontend Developer
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Profile Completion
                    </span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <span className="font-medium">4.9</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 text-yellow-500 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-muted-foreground">(24 reviews)</span>
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
                <CardTitle>Mentor Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="availability">Available for Mentoring</Label>
                  <Switch id="availability" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-mentees">Accepting New Mentees</Label>
                  <Switch id="new-mentees" defaultChecked />
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full justify-start">
                    View Mentee Requests
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="w-full justify-start">
                    Manage Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="expertise">
                  Expertise & Experience
                </TabsTrigger>
                <TabsTrigger value="mentoring">
                  Mentoring Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="Sarah" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Johnson" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="sarah.johnson@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+1 (555) 987-6543" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        defaultValue="https://linkedin.com/in/sarahjohnson"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">
                        Personal Website/Portfolio
                      </Label>
                      <Input
                        id="website"
                        defaultValue="https://sarahjohnson.dev"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Professional Bio</CardTitle>
                    <CardDescription>
                      Tell potential mentees about yourself and your experience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        defaultValue="Senior Frontend Developer at TechCorp"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        defaultValue="Frontend developer with 8+ years of experience specializing in React and modern JavaScript frameworks. Passionate about mentoring junior developers and helping them grow in their careers. I've led teams at startups and enterprise companies, and I enjoy sharing my knowledge about best practices, career growth, and technical skills."
                        className="min-h-[150px]"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="expertise" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                    <CardDescription>
                      Add your areas of expertise to help match with the right
                      mentees.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expertise.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {skill}
                          <button
                            onClick={() => handleRemoveExpertise(skill)}
                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {skill}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <form onSubmit={handleAddExpertise} className="flex gap-2">
                      <Input
                        placeholder="Add an area of expertise..."
                        value={newExpertise}
                        onChange={(e) => setNewExpertise(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit">Add</Button>
                    </form>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>
                      Add your professional experience to build credibility.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4 border rounded-md p-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" defaultValue="TechCorp" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          defaultValue="Senior Frontend Developer"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input
                            id="start-date"
                            type="month"
                            defaultValue="2020-03"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date">End Date</Label>
                          <Input
                            id="end-date"
                            type="month"
                            defaultValue=""
                            placeholder="Present"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue="Led a team of 5 frontend developers, implemented React component library, improved site performance by 40%, mentored junior developers."
                        />
                      </div>
                    </div>

                    <div className="space-y-4 border rounded-md p-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-2">Company</Label>
                        <Input
                          id="company-2"
                          defaultValue="WebSolutions Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position-2">Position</Label>
                        <Input
                          id="position-2"
                          defaultValue="Frontend Developer"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date-2">Start Date</Label>
                          <Input
                            id="start-date-2"
                            type="month"
                            defaultValue="2017-06"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date-2">End Date</Label>
                          <Input
                            id="end-date-2"
                            type="month"
                            defaultValue="2020-02"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description-2">Description</Label>
                        <Textarea
                          id="description-2"
                          defaultValue="Developed responsive web applications using React, implemented state management with Redux, collaborated with UX designers to improve user experience."
                        />
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add Another Experience
                    </Button>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mentoring" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mentoring Preferences</CardTitle>
                    <CardDescription>
                      Set your mentoring style and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mentoring-style">Mentoring Style</Label>
                      <Select defaultValue="collaborative">
                        <SelectTrigger id="mentoring-style">
                          <SelectValue placeholder="Select mentoring style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="collaborative">
                            Collaborative
                          </SelectItem>
                          <SelectItem value="directive">Directive</SelectItem>
                          <SelectItem value="coaching">Coaching</SelectItem>
                          <SelectItem value="advisory">Advisory</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session-format">
                        Preferred Session Format
                      </Label>
                      <Select defaultValue="video">
                        <SelectTrigger id="session-format">
                          <SelectValue placeholder="Select session format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Call</SelectItem>
                          <SelectItem value="audio">Audio Call</SelectItem>
                          <SelectItem value="chat">Text Chat</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session-duration">
                        Preferred Session Duration
                      </Label>
                      <Select defaultValue="45">
                        <SelectTrigger id="session-duration">
                          <SelectValue placeholder="Select session duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mentees-count">
                        Maximum Active Mentees
                      </Label>
                      <Select defaultValue="3">
                        <SelectTrigger id="mentees-count">
                          <SelectValue placeholder="Select maximum mentees" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 mentee</SelectItem>
                          <SelectItem value="3">3 mentees</SelectItem>
                          <SelectItem value="5">5 mentees</SelectItem>
                          <SelectItem value="10">10 mentees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                    <CardDescription>
                      Set your available time slots for mentoring sessions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {availableTimes.map((timeSlot, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Select
                          value={timeSlot.day}
                          onValueChange={(value) =>
                            handleUpdateTimeSlot(index, "day", value)
                          }
                        >
                          <SelectTrigger className="w-[30%]">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                              "Sunday",
                            ].map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="time"
                          value={timeSlot.startTime}
                          onChange={(e) =>
                            handleUpdateTimeSlot(
                              index,
                              "startTime",
                              e.target.value
                            )
                          }
                          className="w-[25%]"
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          value={timeSlot.endTime}
                          onChange={(e) =>
                            handleUpdateTimeSlot(
                              index,
                              "endTime",
                              e.target.value
                            )
                          }
                          className="w-[25%]"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTimeSlot(index)}
                          className="text-destructive"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove time slot</span>
                        </Button>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={handleAddTimeSlot}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Time Slot
                    </Button>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
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
