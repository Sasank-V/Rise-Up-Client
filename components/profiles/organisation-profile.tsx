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
import { X, Plus, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrganisationProfilePage() {
  const [industries, setIndustries] = useState([
    "Technology",
    "Education",
    "Non-profit",
  ]);
  const [newIndustry, setNewIndustry] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    {
      name: "Michael Chen",
      role: "HR Manager",
      email: "michael.chen@globalreach.org",
    },
    {
      name: "Priya Patel",
      role: "Program Director",
      email: "priya.patel@globalreach.org",
    },
  ]);

  const handleAddIndustry = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIndustry && !industries.includes(newIndustry)) {
      setIndustries([...industries, newIndustry]);
      setNewIndustry("");
    }
  };

  const handleRemoveIndustry = (industry: string) => {
    setIndustries(industries.filter((i) => i !== industry));
  };

  const handleAddTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "", email: "" }]);
  };

  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleUpdateTeamMember = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
  };

  const handleSaveProfile = () => {
    // toast({
    //   title: "Profile Updated",
    //   description: "Your Organisation profile has been successfully updated.",
    // });
  };

  return (
    <div className="p-5 py-8">
      <h1 className="text-3xl font-bold mb-6">Organisation Profile</h1>

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
                    <AvatarImage
                      src="https://picsum.photos/96"
                      alt="Organisation Logo"
                    />
                    <AvatarFallback>GR</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">Global Reach NGO</h2>
                    <p className="text-muted-foreground">
                      Non-profit Organisation
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Logo
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Profile Completion
                    </span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Complete your Organisation profile to attract more talent.
                  </p>
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
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Job Postings</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Applications</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Interviews Scheduled</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Positions Filled</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    View Dashboard
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
                  Billing & Subscription
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
            <Tabs defaultValue="Organisation" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="Organisation">
                  Organisation Info
                </TabsTrigger>
                <TabsTrigger value="team">Team Members</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              </TabsList>

              <TabsContent value="Organisation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Organisation Information</CardTitle>
                    <CardDescription>
                      Update your Organisation&apos;s details and contact
                      information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organisation Name</Label>
                      <Input id="org-name" defaultValue="Global Reach NGO" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="org-type">Organisation Type</Label>
                      <Select defaultValue="non-profit">
                        <SelectTrigger id="org-type">
                          <SelectValue placeholder="Select Organisation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="non-profit">Non-profit</SelectItem>
                          <SelectItem value="corporation">
                            Corporation
                          </SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="educational">
                            Educational Institution
                          </SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="org-size">Organisation Size</Label>
                      <Select defaultValue="50-200">
                        <SelectTrigger id="org-size">
                          <SelectValue placeholder="Select Organisation size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="50-200">
                            50-200 employees
                          </SelectItem>
                          <SelectItem value="201-500">
                            201-500 employees
                          </SelectItem>
                          <SelectItem value="501+">501+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="founded">Year Founded</Label>
                      <Input id="founded" type="number" defaultValue="2005" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        defaultValue="https://globalreachngo.org"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Contact Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="contact@globalreachngo.org"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Contact Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Headquarters Address</Label>
                      <Textarea
                        id="address"
                        defaultValue="123 Impact Street, New York, NY 10001, USA"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Organisation Profile</CardTitle>
                    <CardDescription>
                      Tell potential candidates about your Organisation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mission">Mission Statement</Label>
                      <Textarea
                        id="mission"
                        defaultValue="To empower underserved communities through education, technology access, and job opportunities."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        About the Organisation
                      </Label>
                      <Textarea
                        id="description"
                        defaultValue="Global Reach NGO is a non-profit Organisation dedicated to bridging the opportunity gap for underserved communities worldwide. Founded in 2005, we've helped over 10,000 young people gain access to education and employment opportunities through our various programs and partnerships with local and international businesses."
                        className="min-h-[150px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Industries</Label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {industries.map((industry) => (
                          <Badge
                            key={industry}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {industry}
                            <button
                              onClick={() => handleRemoveIndustry(industry)}
                              className="ml-1 rounded-full hover:bg-muted p-0.5"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {industry}</span>
                            </button>
                          </Badge>
                        ))}
                      </div>

                      <form onSubmit={handleAddIndustry} className="flex gap-2">
                        <Input
                          placeholder="Add an industry..."
                          value={newIndustry}
                          onChange={(e) => setNewIndustry(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit">Add</Button>
                      </form>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Add team members who can access and manage your
                      Organisation&apos;s account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="space-y-4 border rounded-md p-4"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">
                            Team Member {index + 1}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTeamMember(index)}
                            className="text-destructive"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove team member</span>
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`name-${index}`}>Name</Label>
                          <Input
                            id={`name-${index}`}
                            value={member.name}
                            onChange={(e) =>
                              handleUpdateTeamMember(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`role-${index}`}>Role</Label>
                          <Input
                            id={`role-${index}`}
                            value={member.role}
                            onChange={(e) =>
                              handleUpdateTeamMember(
                                index,
                                "role",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`email-${index}`}>Email</Label>
                          <Input
                            id={`email-${index}`}
                            type="email"
                            value={member.email}
                            onChange={(e) =>
                              handleUpdateTeamMember(
                                index,
                                "email",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`access-${index}`}>
                            Access Level
                          </Label>
                          <Select defaultValue="editor">
                            <SelectTrigger id={`access-${index}`}>
                              <SelectValue placeholder="Select access level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">
                                Admin (Full Access)
                              </SelectItem>
                              <SelectItem value="editor">
                                Editor (Can edit content)
                              </SelectItem>
                              <SelectItem value="viewer">
                                Viewer (Read-only)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={handleAddTeamMember}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Team Member
                    </Button>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="opportunities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Opportunity Settings</CardTitle>
                    <CardDescription>
                      Configure how you post and manage opportunities.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-job-type">Default Job Type</Label>
                      <Select defaultValue="full-time">
                        <SelectTrigger id="default-job-type">
                          <SelectValue placeholder="Select default job type" />
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
                      <Label htmlFor="application-method">
                        Application Method
                      </Label>
                      <Select defaultValue="platform">
                        <SelectTrigger id="application-method">
                          <SelectValue placeholder="Select application method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platform">
                            Apply through platform
                          </SelectItem>
                          <SelectItem value="email">Apply via email</SelectItem>
                          <SelectItem value="website">
                            Apply on company website
                          </SelectItem>
                          <SelectItem value="mixed">Mixed methods</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="application-notifications">
                        Application Notifications
                      </Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="application-notifications">
                          <SelectValue placeholder="Select notification preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All applications</SelectItem>
                          <SelectItem value="daily">Daily digest</SelectItem>
                          <SelectItem value="weekly">Weekly digest</SelectItem>
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
                    <CardTitle>Branding</CardTitle>
                    <CardDescription>
                      Customize how your opportunities appear to candidates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cover-image">Cover Image</Label>
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag & drop an image here, or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Recommended size: 1200 x 300px. Max 2MB.
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          Upload Image
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Brand Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          id="primary-color"
                          defaultValue="#4f46e5"
                          className="w-12 h-10 p-1"
                        />
                        <Input defaultValue="#4f46e5" className="flex-1" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tagline">Company Tagline</Label>
                      <Input
                        id="tagline"
                        defaultValue="Empowering communities through opportunity and education"
                      />
                    </div>

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
