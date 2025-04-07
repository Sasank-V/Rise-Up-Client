"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Users,
  MessageSquare,
  Award,
} from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "@/components/motion-div";
import Image from "next/image";

export default function Home() {
  return (
    <div className="  mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Empowering Youth with Skills and Opportunities
            </h1>
            <p className="text-muted-foreground md:text-xl">
              RiseUp connects young talent with the skills, mentorship, and job
              opportunities they need to succeed in today&apos;s competitive
              market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/signin">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[350px] lg:h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src="/hero.jpg"
              alt="Youth empowerment"
              className="object-cover w-full h-full"
              width={500}
              height={500}
            />
          </MotionDiv>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Key Features
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Everything you need to develop your skills and advance your career
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<BookOpen className="h-10 w-10" />}
            title="Personalized Learning"
            description="Access courses tailored to your interests and career goals"
            delay={0.1}
          />
          <FeatureCard
            icon={<Briefcase className="h-10 w-10" />}
            title="Job Opportunities"
            description="Connect with employers looking for your specific skills"
            delay={0.2}
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="Mentorship"
            description="Learn from industry professionals who guide your development"
            delay={0.3}
          />
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10" />}
            title="Community Support"
            description="Join a network of peers to share knowledge and experiences"
            delay={0.4}
          />
          <FeatureCard
            icon={<Award className="h-10 w-10" />}
            title="Mock Interviews"
            description="Practice and prepare for real job interviews"
            delay={0.5}
          />
          <FeatureCard
            icon={<ArrowRight className="h-10 w-10" />}
            title="Career Advancement"
            description="Track your progress and advance toward your career goals"
            delay={0.6}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20">
        <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Rise Up?
            </h2>
            <p className="text-primary-foreground/90 md:text-xl">
              Join thousands of young people who are developing their skills and
              finding opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/signin">Sign Up Now</Link>
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                size="lg"
              >
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full">
        <CardHeader>
          <div className="text-primary mb-2">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
