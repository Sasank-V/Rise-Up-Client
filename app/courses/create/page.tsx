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
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "",
      description: "",
      lessons: [{ id: 1, title: "", description: "", duration: "" }],
    },
  ]);

  const addModule = () => {
    const newId =
      modules.length > 0 ? Math.max(...modules.map((m) => m.id)) + 1 : 1;
    setModules([
      ...modules,
      {
        id: newId,
        title: "",
        description: "",
        lessons: [{ id: 1, title: "", description: "", duration: "" }],
      },
    ]);
  };

  const removeModule = (moduleId: number) => {
    setModules(modules.filter((m) => m.id !== moduleId));
  };

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
              { id: newLessonId, title: "", description: "", duration: "" },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    // toast({
    //   title: "Course created",
    //   description: "Your course has been created successfully.",
    // });
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
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your course..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Difficulty Level</Label>
                    <Select>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Estimated Duration</Label>
                    <Select>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 weeks</SelectItem>
                        <SelectItem value="3-4">3-4 weeks</SelectItem>
                        <SelectItem value="5-6">5-6 weeks</SelectItem>
                        <SelectItem value="7-8">7-8 weeks</SelectItem>
                        <SelectItem value="9+">9+ weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Textarea
                    id="prerequisites"
                    placeholder="List any prerequisites for this course..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outcomes">Learning Outcomes</Label>
                  <Textarea
                    id="outcomes"
                    placeholder="What will students learn from this course?"
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                              Duration
                            </Label>
                            <Input
                              id={`lesson-${module.id}-${lesson.id}-duration`}
                              value={lesson.duration}
                              onChange={(e) =>
                                updateLesson(
                                  module.id,
                                  lesson.id,
                                  "duration",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., 30 minutes"
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
