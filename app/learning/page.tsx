import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "@/components/course-card";
import { Search, Filter } from "lucide-react";
import { MotionDiv } from "@/components/motion-div";

// Mock data
const courses = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript basics",
    image: "/placeholder.svg?height=150&width=250",
    duration: "8 weeks",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Digital Marketing Essentials",
    description: "Master social media, SEO, and content marketing",
    image: "/placeholder.svg?height=150&width=250",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: "3",
    title: "Data Analysis with Python",
    description: "Learn to analyze and visualize data using Python",
    image: "/placeholder.svg?height=150&width=250",
    duration: "10 weeks",
    level: "Advanced",
  },
  {
    id: "4",
    title: "Graphic Design for Beginners",
    description: "Master the fundamentals of visual design",
    image: "/placeholder.svg?height=150&width=250",
    duration: "5 weeks",
    level: "Beginner",
  },
  {
    id: "5",
    title: "Business Communication Skills",
    description: "Improve your professional communication",
    image: "/placeholder.svg?height=150&width=250",
    duration: "4 weeks",
    level: "Intermediate",
  },
  {
    id: "6",
    title: "Mobile App Development",
    description: "Build iOS and Android apps with React Native",
    image: "/placeholder.svg?height=150&width=250",
    duration: "12 weeks",
    level: "Advanced",
  },
];

export default function LearningPage() {
  return (
    <div className="p-5 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Learning Hub</h1>
          <p className="text-muted-foreground mt-1">
            Discover courses to develop your skills and advance your career
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </TabsContent>
        <TabsContent value="recommended" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course, index) => (
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
        </TabsContent>
        <TabsContent value="popular" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(2, 5).map((course, index) => (
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
        </TabsContent>
        <TabsContent value="new" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(3, 6).map((course, index) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
