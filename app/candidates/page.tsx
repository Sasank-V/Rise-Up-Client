"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Star,
  Mail,
  Download,
  ArrowUpDown,
} from "lucide-react";
import { MotionDiv } from "@/components/motion-div";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for candidates
const candidates = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    location: "New York, NY",
    skills: ["JavaScript", "React", "Node.js"],
    experience: "3 years",
    education: "Bachelor's in Computer Science",
    appliedJobs: ["Youth Program Coordinator"],
    status: "Interview",
    match: 95,
    image: "/placeholder.svg?height=100&width=100",
    lastActive: "2 days ago",
  },
  {
    id: "2",
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    location: "Remote",
    skills: ["Digital Marketing", "Social Media", "Content Creation"],
    experience: "2 years",
    education: "Bachelor's in Marketing",
    appliedJobs: ["Digital Marketing Intern"],
    status: "Application Review",
    match: 88,
    image: "/placeholder.svg?height=100&width=100",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Taylor Brown",
    email: "taylor.brown@example.com",
    location: "Chicago, IL",
    skills: ["Project Management", "Communication", "Leadership"],
    experience: "4 years",
    education: "Master's in Public Administration",
    appliedJobs: ["Youth Program Coordinator", "Community Outreach Specialist"],
    status: "Application Review",
    match: 82,
    image: "/placeholder.svg?height=100&width=100",
    lastActive: "3 days ago",
  },
  {
    id: "4",
    name: "Morgan Lee",
    email: "morgan.lee@example.com",
    location: "San Francisco, CA",
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite"],
    experience: "2 years",
    education: "Bachelor's in Design",
    appliedJobs: [],
    status: "Potential",
    match: 79,
    image: "/placeholder.svg?height=100&width=100",
    lastActive: "1 week ago",
  },
  {
    id: "5",
    name: "Casey Wilson",
    email: "casey.wilson@example.com",
    location: "Austin, TX",
    skills: ["Data Analysis", "Python", "SQL"],
    experience: "1 year",
    education: "Bachelor's in Statistics",
    appliedJobs: [],
    status: "Potential",
    match: 75,
    image: "/placeholder.svg?height=100&width=100",
    lastActive: "5 days ago",
  },
  {
    id: "6",
    name: "Jordan Taylor",
    email: "jordan.taylor@example.com",
    location: "Boston, MA",
    skills: ["Content Writing", "SEO", "Research"],
    experience: "3 years",
    education: "Bachelor's in English",
    appliedJobs: ["Digital Marketing Intern"],
    status: "Rejected",
    match: 65,
    image: "/placeholder.svg?height=100&width=100",
    lastActive: "2 weeks ago",
  },
];

export default function CandidatesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [sortField, setSortField] = useState<string>("match");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter candidates based on active tab
  const filteredCandidates = candidates.filter((candidate) => {
    if (activeTab === "all") return true;
    if (activeTab === "applied") return candidate.appliedJobs.length > 0;
    if (activeTab === "interview") return candidate.status === "Interview";
    if (activeTab === "potential") return candidate.status === "Potential";
    return true;
  });

  // Sort candidates
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortField === "match") {
      return sortDirection === "desc" ? b.match - a.match : a.match - b.match;
    }
    if (sortField === "name") {
      return sortDirection === "desc"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    }
    if (sortField === "status") {
      return sortDirection === "desc"
        ? b.status.localeCompare(a.status)
        : a.status.localeCompare(b.status);
    }
    return 0;
  });

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="p-5 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Candidates</h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage potential candidates for your organisation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Invite Candidates
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search candidates by name, skills, or location..."
            className="w-full pl-8"
          />
        </div>
        <Select defaultValue="match">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Match Score</SelectItem>
            <SelectItem value="recent">Recently Active</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
        >
          <Filter className="h-4 w-4" />
          <span className="sr-only">Toggle View</span>
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="all">All Candidates</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="interview">Interview Stage</TabsTrigger>
          <TabsTrigger value="potential">Potential Matches</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedCandidates.map((candidate, index) => (
                <MotionDiv
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardContent className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={candidate.image}
                              alt={candidate.name}
                            />
                            <AvatarFallback>
                              {candidate.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Link
                              href={`/candidates/${candidate.id}`}
                              className="font-bold hover:underline"
                            >
                              {candidate.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              {candidate.location}
                            </p>
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
                        >
                          {candidate.status}
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-sm font-medium">Skills</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {candidate.skills.map((skill) => (
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

                        <div>
                          <p className="text-sm font-medium">Experience</p>
                          <p className="text-sm text-muted-foreground">
                            {candidate.experience}
                          </p>
                        </div>

                        {candidate.appliedJobs.length > 0 && (
                          <div>
                            <p className="text-sm font-medium">Applied For</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {candidate.appliedJobs.map((job) => (
                                <Badge
                                  key={job}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {job}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-medium">
                            {candidate.match}% Match
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Active {candidate.lastActive}
                        </p>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0 border-t mt-auto">
                      <div className="flex gap-2">
                        <Button asChild size="sm" className="flex-1">
                          <Link href={`/candidates/${candidate.id}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <Button
                          variant="ghost"
                          className="p-0 font-medium"
                          onClick={() => toggleSort("name")}
                        >
                          Candidate
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Applied For</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium"
                          onClick={() => toggleSort("status")}
                        >
                          Status
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium"
                          onClick={() => toggleSort("match")}
                        >
                          Match
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={candidate.image}
                                alt={candidate.name}
                              />
                              <AvatarFallback>
                                {candidate.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {candidate.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {candidate.location}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 2).map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {candidate.appliedJobs.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {candidate.appliedJobs.slice(0, 1).map((job) => (
                                <Badge
                                  key={job}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {job}
                                </Badge>
                              ))}
                              {candidate.appliedJobs.length > 1 && (
                                <Badge variant="outline" className="text-xs">
                                  +{candidate.appliedJobs.length - 1}
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              None
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
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
                          >
                            {candidate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span>{candidate.match}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/organisation/candidates/${candidate.id}`}
                                >
                                  View Profile
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Contact</DropdownMenuItem>
                              <DropdownMenuItem>
                                Schedule Interview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Add to Shortlist
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {sortedCandidates.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  No candidates found matching your criteria.
                </p>
                <Button variant="outline">Clear Filters</Button>
              </CardContent>
            </Card>
          )}

          {sortedCandidates.length > 0 && (
            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
