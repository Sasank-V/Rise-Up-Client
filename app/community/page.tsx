"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/motion-div";
import { ArrowLeft } from "lucide-react";

// Mock data
const discussions = [
  {
    id: "1",
    title: "How to prepare for a frontend developer interview?",
    author: "Alex Johnson",
    authorImage: "/placeholder.svg?height=50&width=50",
    date: "2 days ago",
    category: "Career Advice",
    replies: 12,
    likes: 24,
    content:
      "I have an interview coming up for a junior frontend developer position. What are some key topics I should focus on? Any tips for technical questions or coding challenges?",
  },
  {
    id: "2",
    title: "Best resources to learn React in 2023",
    author: "Jamie Smith",
    authorImage: "/placeholder.svg?height=50&width=50",
    date: "1 week ago",
    category: "Learning",
    replies: 18,
    likes: 32,
    content:
      "I'm looking to learn React from scratch. What are the best courses, tutorials, or books you'd recommend for someone starting out in 2023?",
  },
  {
    id: "3",
    title: "Feedback on my portfolio website",
    author: "Taylor Brown",
    authorImage: "/placeholder.svg?height=50&width=50",
    date: "3 days ago",
    category: "Portfolio Review",
    replies: 8,
    likes: 15,
    content:
      "I just finished building my portfolio website and would love some feedback from the community. Here's the link: [portfolio-link]. Any suggestions for improvement?",
  },
  {
    id: "4",
    title: "Transitioning from college to tech industry",
    author: "Jordan Lee",
    authorImage: "/placeholder.svg?height=50&width=50",
    date: "5 days ago",
    category: "Career Advice",
    replies: 15,
    likes: 28,
    content:
      "I'm graduating next month with a computer science degree. What advice do you have for someone transitioning from academic projects to industry work? How can I prepare for this change?",
  },
];

export default function DiscussionsPage() {
  return (
    <div className="p-5 py-8">
      <div className="mb-6">
        <Link
          href="/community"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Community
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Community Discussions</h1>
      <div className="grid gap-6">
        {discussions.map((discussion) => (
          <MotionDiv
            key={discussion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{discussion.title}</CardTitle>
                  <Badge variant="secondary">{discussion.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <img
                    src={discussion.authorImage}
                    alt={discussion.author}
                    className="h-8 w-8 rounded-full"
                  />
                  <span>{discussion.author}</span>
                  <span>•</span>
                  <span>{discussion.date}</span>
                </div>
                <p className="text-muted-foreground">{discussion.content}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{discussion.replies} replies</span>
                  <span>{discussion.likes} likes</span>
                </div>
                <div>
                  <Link
                    href={`/discussions/${discussion.id}`}
                    className="text-primary hover:underline text-sm"
                  >
                    View Discussion
                  </Link>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
}
