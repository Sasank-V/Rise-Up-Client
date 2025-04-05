import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobCard } from "@/components/job-card";
import { Search, MapPin } from "lucide-react";
import { MotionDiv } from "@/components/motion-div";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
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
  {
    id: "4",
    title: "Social Media Coordinator",
    company: "Digital Futures",
    location: "Remote",
    type: "Full-time",
    salary: "$38,000 - $45,000",
    posted: "1 day ago",
    logo: "/placeholder.svg?height=50&width=50",
    match: 88,
  },
  {
    id: "5",
    title: "Customer Support Representative",
    company: "Tech Innovators",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$35,000 - $42,000",
    posted: "5 days ago",
    logo: "/placeholder.svg?height=50&width=50",
    match: 75,
  },
  {
    id: "6",
    title: "Graphic Design Intern",
    company: "Creative Solutions Agency",
    location: "Los Angeles, CA",
    type: "Internship",
    salary: "$18 - $22/hour",
    posted: "1 week ago",
    logo: "/placeholder.svg?height=50&width=50",
    match: 82,
  },
];

export default function JobsPage() {
  return (
    <div className="p-5 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          <p className="text-muted-foreground mt-1">
            Find the perfect job to kickstart your career
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter location"
                  className="w-full pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="nonprofit">Non-profit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs..."
                className="w-full pl-8"
              />
            </div>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="salary-high">
                  Salary (High to Low)
                </SelectItem>
                <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="applied">Applied</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4">
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
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>
            <TabsContent value="recommended" className="space-y-4">
              <div className="grid gap-4">
                {jobs.slice(0, 3).map((job, index) => (
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
            </TabsContent>
            <TabsContent value="applied" className="space-y-4">
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  You haven&apos;t applied to any jobs yet.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="saved" className="space-y-4">
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  You haven&apos;t saved any jobs yet.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
