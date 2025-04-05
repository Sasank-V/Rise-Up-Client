"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "@/components/motion-div";
import Image from "next/image";

// Mock course data
const courseData = {
  id: "1",
  title: "Web Development Fundamentals",
  description:
    "Learn HTML, CSS, and JavaScript basics to build your first website",
  image: "/placeholder.svg?height=300&width=800",
  duration: "8 weeks",
  level: "Beginner",
  instructor: "Alex Johnson",
  instructorImage: "/placeholder.svg?height=100&width=100",
  progress: 65,
  modules: [
    {
      id: "m1",
      title: "Introduction to HTML",
      lessons: [
        { id: "l1", title: "HTML Basics", duration: "15 min", completed: true },
        {
          id: "l2",
          title: "HTML Structure",
          duration: "20 min",
          completed: true,
        },
        {
          id: "l3",
          title: "HTML Elements",
          duration: "25 min",
          completed: true,
        },
        { id: "l4", title: "HTML Forms", duration: "30 min", completed: false },
      ],
    },
    {
      id: "m2",
      title: "CSS Styling",
      lessons: [
        { id: "l5", title: "CSS Basics", duration: "20 min", completed: true },
        {
          id: "l6",
          title: "CSS Selectors",
          duration: "25 min",
          completed: true,
        },
        { id: "l7", title: "CSS Layout", duration: "30 min", completed: false },
        {
          id: "l8",
          title: "CSS Responsive Design",
          duration: "35 min",
          completed: false,
        },
      ],
    },
    {
      id: "m3",
      title: "JavaScript Fundamentals",
      lessons: [
        {
          id: "l9",
          title: "JavaScript Basics",
          duration: "25 min",
          completed: false,
        },
        {
          id: "l10",
          title: "JavaScript Functions",
          duration: "30 min",
          completed: false,
        },
        {
          id: "l11",
          title: "DOM Manipulation",
          duration: "35 min",
          completed: false,
        },
        {
          id: "l12",
          title: "JavaScript Events",
          duration: "30 min",
          completed: false,
        },
      ],
    },
  ],
};

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const [activeLesson, setActiveLesson] = useState("l6");

  // In a real app, you would fetch the course data based on the courseId
  const course = courseData;

  // Find the current lesson
  let currentLesson;
  let currentModuleIndex = 0;
  let currentLessonIndex = 0;

  for (let i = 0; i < course.modules.length; i++) {
    const lessonIndex = course.modules[i].lessons.findIndex(
      (lesson) => lesson.id === activeLesson
    );
    if (lessonIndex !== -1) {
      currentLesson = course.modules[i].lessons[lessonIndex];
      currentModuleIndex = i;
      currentLessonIndex = lessonIndex;
      break;
    }
  }

  // Calculate next and previous lessons
  const nextLesson = () => {
    console.log(params.courseId);
    const currentModule = course.modules[currentModuleIndex];
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      // Next lesson in the same module
      return currentModule.lessons[currentLessonIndex + 1];
    } else if (currentModuleIndex < course.modules.length - 1) {
      // First lesson in the next module
      return course.modules[currentModuleIndex + 1].lessons[0];
    }
    return null;
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      // Previous lesson in the same module
      return course.modules[currentModuleIndex].lessons[currentLessonIndex - 1];
    } else if (currentModuleIndex > 0) {
      // Last lesson in the previous module
      const prevModule = course.modules[currentModuleIndex - 1];
      return prevModule.lessons[prevModule.lessons.length - 1];
    }
    return null;
  };

  const next = nextLesson();
  const prev = prevLesson();

  return (
    <div className="p-5 py-8">
      <div className="mb-6">
        <Link
          href="/learning"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </Link>
        <h1 className="text-3xl font-bold">{course.title}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />
            </div>
          </MotionDiv>

          <Tabs defaultValue="content" className="space-y-4">
            <TabsList>
              <TabsTrigger value="content">Lesson Content</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">
                    {currentLesson?.title || "Select a lesson to begin"}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    This lesson covers the fundamentals of{" "}
                    {currentLesson?.title}. You&apos;ll learn how to structure
                    your code, apply best practices, and build a solid
                    foundation for web development.
                  </p>

                  <div className="prose max-w-none">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec euismod, nisl eget ultricies ultricies, nunc nisl
                      ultricies nunc, quis ultricies nisl nisl eget ultricies
                      ultricies.
                    </p>
                    <h3>Key Concepts</h3>
                    <ul>
                      <li>Understanding the core principles</li>
                      <li>Implementing best practices</li>
                      <li>Troubleshooting common issues</li>
                      <li>Building real-world examples</li>
                    </ul>
                    <p>
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  disabled={!prev}
                  onClick={() => prev && setActiveLesson(prev.id)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
                </Button>
                <Button
                  disabled={!next}
                  onClick={() => next && setActiveLesson(next.id)}
                >
                  Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="resources">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Lesson Resources</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <a href="#" className="text-primary hover:underline">
                        Lesson Slides
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <a href="#" className="text-primary hover:underline">
                        Code Examples
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <a href="#" className="text-primary hover:underline">
                        Practice Exercises
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <a href="#" className="text-primary hover:underline">
                        Additional Reading
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="discussion">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Discussion</h2>
                  <p className="text-muted-foreground mb-4">
                    Join the conversation with other students and the
                    instructor.
                  </p>
                  <div className="space-y-4">
                    <p className="text-center text-muted-foreground">
                      No comments yet. Be the first to start the discussion!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-lg font-bold">Course Progress</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>{course.level}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-bold mb-4">Course Content</h2>
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <h3 className="font-medium">{module.title}</h3>
                    <ul className="space-y-1">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <button
                            onClick={() => setActiveLesson(lesson.id)}
                            className={`w-full flex items-center justify-between p-2 text-sm rounded-md ${
                              activeLesson === lesson.id
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-accent"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                              )}
                              <span className="text-left">{lesson.title}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-bold mb-4">Instructor</h2>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={course.instructorImage || "/placeholder.svg"}
                    alt={course.instructor}
                    className="h-full w-full object-cover"
                    width={500}
                    height={500}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{course.instructor}</h3>
                  <p className="text-sm text-muted-foreground">
                    Web Development Instructor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
