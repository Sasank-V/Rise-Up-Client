"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CheckCircle,
  Clock,
  Video,
  MessageSquare,
  Award,
} from "lucide-react";
import { MotionDiv } from "@/components/motion-div";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Mock data
const mockInterviews = [
  {
    id: "1",
    title: "Frontend Developer Interview",
    description: "Practice common frontend developer interview questions",
    duration: "30 min",
    difficulty: "Intermediate",
    category: "Technical",
    completed: false,
    scheduled: false,
  },
  {
    id: "2",
    title: "Behavioral Interview Practice",
    description: "Prepare for common behavioral questions",
    duration: "45 min",
    difficulty: "Beginner",
    category: "Behavioral",
    completed: false,
    scheduled: true,
    scheduledDate: "Tomorrow, 2:00 PM",
  },
  {
    id: "3",
    title: "React.js Technical Interview",
    description: "Deep dive into React concepts and coding challenges",
    duration: "60 min",
    difficulty: "Advanced",
    category: "Technical",
    completed: false,
    scheduled: false,
  },
  {
    id: "4",
    title: "Problem Solving Assessment",
    description: "Tackle algorithmic problems and explain your approach",
    duration: "45 min",
    difficulty: "Advanced",
    category: "Technical",
    completed: true,
    score: 85,
  },
];

const quizzes = [
  {
    id: "1",
    title: "HTML & CSS Fundamentals",
    description: "Test your knowledge of HTML and CSS basics",
    questions: 15,
    duration: "20 min",
    difficulty: "Beginner",
    completed: true,
    score: 90,
  },
  {
    id: "2",
    title: "JavaScript Essentials",
    description: "Core JavaScript concepts every developer should know",
    questions: 20,
    duration: "25 min",
    difficulty: "Intermediate",
    completed: false,
  },
  {
    id: "3",
    title: "React Component Patterns",
    description: "Advanced patterns for React component development",
    questions: 15,
    duration: "30 min",
    difficulty: "Advanced",
    completed: false,
  },
  {
    id: "4",
    title: "Web Accessibility",
    description: "Best practices for creating accessible web applications",
    questions: 12,
    duration: "15 min",
    difficulty: "Intermediate",
    completed: true,
    score: 75,
  },
];

// Mock quiz questions
const mockQuizQuestions = [
  {
    id: "q1",
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Symbol"],
    correctAnswer: "Float",
  },
  {
    id: "q2",
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    id: "q3",
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<css>", "<script>", "<style>", "<link>"],
    correctAnswer: "<style>",
  },
];

export default function InterviewPrepPage() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = (quizId: string) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === mockQuizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < mockQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleCloseQuiz = () => {
    setActiveQuiz(null);
  };

  return (
    <div className="p-5 py-8">
      <h1 className="text-3xl font-bold mb-6">Interview Preparation</h1>

      <Tabs defaultValue="mock-interviews" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mock-interviews">Mock Interviews</TabsTrigger>
          <TabsTrigger value="quizzes">Skill Quizzes</TabsTrigger>
        </TabsList>

        <TabsContent value="mock-interviews" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockInterviews.map((interview, index) => (
              <MotionDiv
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{interview.title}</CardTitle>
                      <Badge
                        variant={
                          interview.completed
                            ? "default"
                            : interview.scheduled
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {interview.completed
                          ? "Completed"
                          : interview.scheduled
                          ? "Scheduled"
                          : "Available"}
                      </Badge>
                    </div>
                    <CardDescription>{interview.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{interview.duration}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Award className="h-3.5 w-3.5 mr-1" />
                        <span>{interview.difficulty}</span>
                      </div>
                    </div>

                    {interview.scheduled && (
                      <div className="mt-4 flex items-center text-sm font-medium text-primary">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{interview.scheduledDate}</span>
                      </div>
                    )}

                    {interview.completed && interview.score && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Score</span>
                          <span>{interview.score}%</span>
                        </div>
                        <Progress value={interview.score} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={interview.completed ? "outline" : "default"}
                    >
                      {interview.completed ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          View Results
                        </>
                      ) : interview.scheduled ? (
                        <>
                          <Video className="mr-2 h-4 w-4" />
                          Join Interview
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Start Practice
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz, index) => (
              <MotionDiv
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{quiz.title}</CardTitle>
                      <Badge variant={quiz.completed ? "default" : "secondary"}>
                        {quiz.completed ? "Completed" : "Available"}
                      </Badge>
                    </div>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <span>Questions: {quiz.questions}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <span>{quiz.duration}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Award className="h-3.5 w-3.5 mr-1" />
                        <span>{quiz.difficulty}</span>
                      </div>
                    </div>

                    {quiz.completed && quiz.score && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Score</span>
                          <span>{quiz.score}%</span>
                        </div>
                        <Progress value={quiz.score} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={quiz.completed ? "outline" : "default"}
                      onClick={() =>
                        quiz.completed ? null : handleStartQuiz(quiz.id)
                      }
                      disabled={activeQuiz !== null && activeQuiz !== quiz.id}
                    >
                      {quiz.completed ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          View Results
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Start Quiz
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={activeQuiz !== null} onOpenChange={handleCloseQuiz}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz</DialogTitle>
            <DialogDescription>
              Answer the following questions to test your knowledge.
            </DialogDescription>
          </DialogHeader>

          {activeQuiz && (
            <>
              <div className="mb-4">
                <p className="font-medium">
                  Question {currentQuestion + 1} of {mockQuizQuestions.length}
                </p>
                <p>{mockQuizQuestions[currentQuestion].question}</p>
              </div>

              <RadioGroup
                onValueChange={handleAnswerSelect}
                value={selectedAnswer!}
              >
                {mockQuizQuestions[currentQuestion].options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>

              <Button
                className="mt-4"
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === mockQuizQuestions.length - 1
                  ? "Submit Quiz"
                  : "Next Question"}
              </Button>
            </>
          )}

          {quizCompleted && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Quiz Completed!</h3>
              <p>
                Your Score: {score} / {mockQuizQuestions.length}
              </p>
              <Button onClick={handleCloseQuiz}>Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
