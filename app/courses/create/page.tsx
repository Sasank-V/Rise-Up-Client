"use client";

import { useEffect, useState } from "react";
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
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";

// Import types for the course creation request.
import { useSession } from "next-auth/react";
import useProtectedRoute from "@/hooks/use-protected-route";
import { toast } from "react-toastify";

export default function CreateCoursePage() {
  useProtectedRoute(["organisation"]);
  const { data: session, status } = useSession();
  const [userID, setUserID] = useState("");
  const [banner, setBanner] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState(0); // e.g., total weeks or hours
  const [skills, setSkills] = useState<string[]>([]);
  const [instructors, setInstructors] = useState<string[]>([]);
  const [prerequisites, setPrerequisites] = useState("");
  const [outcomes, setOutcomes] = useState("");

  useEffect(() => {
    if (session && session.user) {
      setUserID(session.user.id);
    }
  }, [session, status]);

  // Modules state for course content
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "",
      description: "",
      lessons: [
        {
          id: 1,
          title: "",
          description: "",
          duration: "",
          contentLink: "",
          contentType: "",
        },
      ],
    },
  ]);

  // Module functions (add, remove, update)
  const addModule = () => {
    const newId =
      modules.length > 0 ? Math.max(...modules.map((m) => m.id)) + 1 : 1;
    setModules([
      ...modules,
      {
        id: newId,
        title: "",
        description: "",
        lessons: [
          {
            id: 1,
            title: "",
            description: "",
            duration: "",
            contentLink: "",
            contentType: "",
          },
        ],
      },
    ]);
  };

  const removeModule = (moduleId: number) => {
    setModules(modules.filter((m) => m.id !== moduleId));
  };

  const updateModule = (moduleId: number, field: string, value: string) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return { ...module, [field]: value };
        }
        return module;
      })
    );
  };

  // Lesson functions (add, remove, update)
  const addLesson = (moduleId: number) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          const newLessonId =
            module.lessons.length > 0
              ? Math.max(...module.lessons.map((l) => l.id)) + 1
              : 1;
          return {
            ...module,
            lessons: [
              ...module.lessons,
              {
                id: newLessonId,
                title: "",
                description: "",
                duration: "",
                contentLink: "",
                contentType: "",
              },
            ],
          };
        }
        return module;
      })
    );
  };

  const removeLesson = (moduleId: number, lessonId: number) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
          };
        }
        return module;
      })
    );
  };

  const updateLesson = (
    moduleId: number,
    lessonId: number,
    field: string,
    value: string
  ) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                return { ...lesson, [field]: value };
              }
              return lesson;
            }),
          };
        }
        return module;
      })
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build CreateCourseRequest object from state
    const createCourseRequest = {
      user_id: userID,
      banner,
      title: courseTitle,
      description: courseDescription,
      difficulty,
      duration,
      skills,
      instructors,
      prerequisites,
      outcomes,
      modules: modules.map((m) => {
        const moduleData = {
          title: m.title,
          order_no: m.id, // Use module's id as the order number
          lessons: m.lessons.map((l) => {
            const lessonData = {
              title: l.title,
              description: l.description,
              content_link: l.contentLink,
              content_type: l.contentType,
              resources: [], // If there are resources, map them here as []CreateResource
              duration: parseInt(l.duration, 10),
              order_no: l.id, // Use lesson's id as the order number
            };
            return lessonData;
          }),
        };
        return moduleData;
      }),
    };

    // Send the POST request to /api/course/create
    try {
      const res = await fetch(
        `${
          process.env.SERVER_URL || "http://localhost:8080"
        }/api/course/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createCourseRequest),
        }
      );

      if (!res.ok) {
        console.error("Course creation failed:", await res.text());
        return;
      }

      const data = await res.json();
      console.log("Course created successfully:", data);
      toast("Course Created Successfully");
    } catch (error) {
      console.error("Error sending course creation request:", error);
    }
  };

  return (
    <div className="p-5 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <Button asChild variant="outline">
          <Link href="/dashboard">Cancel</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
                <CardDescription>
                  Provide the basic information about your course.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Advanced JavaScript Concepts"
                    required
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your course..."
                    className="min-h-[100px]"
                    required
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="banner">Banner URL</Label>
                  <Input
                    id="banner"
                    placeholder="https://example.com/banner.jpg"
                    required
                    value={banner}
                    onChange={(e) => setBanner(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Difficulty Level</Label>
                    <Select onValueChange={(diff) => setDifficulty(diff)}>
                      <SelectTrigger id="level">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* In a real implementation, update the `difficulty` state using a onValueChange handler */}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      Estimated Duration (in weeks)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      required
                      value={duration.toString()}
                      onChange={(e) =>
                        setDuration(parseInt(e.target.value, 10))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., JavaScript, React, Node.js"
                    value={skills.join(", ")}
                    onChange={(e) =>
                      setSkills(
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructors">
                    Instructors (comma-separated)
                  </Label>
                  <Input
                    id="instructors"
                    placeholder="e.g., Alice, Bob"
                    value={instructors.join(", ")}
                    onChange={(e) =>
                      setInstructors(
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Textarea
                    id="prerequisites"
                    placeholder="List any prerequisites for this course..."
                    className="min-h-[80px]"
                    value={prerequisites}
                    onChange={(e) => setPrerequisites(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outcomes">Learning Outcomes</Label>
                  <Textarea
                    id="outcomes"
                    placeholder="What will students learn from this course?"
                    className="min-h-[80px]"
                    value={outcomes}
                    onChange={(e) => setOutcomes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Structure</CardTitle>
                <CardDescription>
                  Organize your course into modules and lessons.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {modules.map((module, moduleIndex) => (
                  <div
                    key={module.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">
                        Module {moduleIndex + 1}
                      </h3>
                      {modules.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeModule(module.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Remove module</span>
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`module-${module.id}-title`}>
                        Module Title
                      </Label>
                      <Input
                        id={`module-${module.id}-title`}
                        value={module.title}
                        onChange={(e) =>
                          updateModule(module.id, "title", e.target.value)
                        }
                        placeholder="e.g., Introduction to JavaScript"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`module-${module.id}-description`}>
                        Module Description
                      </Label>
                      <Textarea
                        id={`module-${module.id}-description`}
                        value={module.description}
                        onChange={(e) =>
                          updateModule(module.id, "description", e.target.value)
                        }
                        placeholder="Describe what this module covers..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Lessons</Label>
                      </div>

                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="border rounded-md p-3 space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">
                              Lesson {lessonIndex + 1}
                            </h4>
                            {module.lessons.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  removeLesson(module.id, lesson.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Remove lesson</span>
                              </Button>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor={`lesson-${module.id}-${lesson.id}-title`}
                            >
                              Lesson Title
                            </Label>
                            <Input
                              id={`lesson-${module.id}-${lesson.id}-title`}
                              value={lesson.title}
                              onChange={(e) =>
                                updateLesson(
                                  module.id,
                                  lesson.id,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., Variables and Data Types"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor={`lesson-${module.id}-${lesson.id}-description`}
                            >
                              Lesson Description
                            </Label>
                            <Textarea
                              id={`lesson-${module.id}-${lesson.id}-description`}
                              value={lesson.description}
                              onChange={(e) =>
                                updateLesson(
                                  module.id,
                                  lesson.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Describe what this lesson covers..."
                              className="min-h-[60px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor={`lesson-${module.id}-${lesson.id}-duration`}
                            >
                              Duration (minutes)
                            </Label>
                            <Input
                              id={`lesson-${module.id}-${lesson.id}-duration`}
                              type="number"
                              value={lesson.duration}
                              onChange={(e) =>
                                updateLesson(
                                  module.id,
                                  lesson.id,
                                  "duration",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., 30"
                              required
                            />
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => addLesson(module.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Lesson
                      </Button>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addModule}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
                <CardDescription>
                  Configure additional settings for your course.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="max-students">Maximum Students</Label>
                  <Input
                    id="max-students"
                    type="number"
                    placeholder="e.g., 30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select>
                    <SelectTrigger id="visibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="invite">Invite Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certification">Certification</Label>
                  <Select>
                    <SelectTrigger id="certification">
                      <SelectValue placeholder="Select certification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Certification</SelectItem>
                      <SelectItem value="completion">
                        Completion Certificate
                      </SelectItem>
                      <SelectItem value="graded">Graded Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="submit">Create Course</Button>
        </div>
      </form>
    </div>
  );
}
