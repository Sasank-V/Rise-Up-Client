import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    progress?: number;
    image: string;
    duration: string;
    level: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-background/90 text-foreground text-xs font-medium px-2 py-1 rounded">
          {course.level}
        </div>
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <p className="text-sm text-muted-foreground mb-4">
          {course.description}
        </p>
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <Clock className="h-3 w-3 mr-1" />
          <span>{course.duration}</span>
        </div>
        {course.progress !== undefined && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" size="sm">
          <Link href={`/courses/${course.id}`}>
            <BookOpen className="mr-2 h-4 w-4" />
            {course.progress !== undefined && course.progress > 0
              ? "Continue"
              : "Start"}{" "}
            Course
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
