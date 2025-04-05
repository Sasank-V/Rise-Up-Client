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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { MotionDiv } from "@/components/motion-div";

export default function LoginPage() {
  const [role, setRole] = useState<"learner" | "ngo">("learner");

  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
      redirect: true,
    });
  };

  return (
    <div className="p-5 flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Sign in to RiseUp
            </CardTitle>
            <CardDescription>
              Choose your role and sign in with your Google account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              defaultValue="learner"
              value={role}
              onValueChange={(value) => setRole(value as "learner" | "ngo")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="learner"
                  id="learner"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="learner"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-base font-medium">Learner</span>
                  <span className="text-sm text-muted-foreground">
                    Access courses and find jobs
                  </span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="ngo" id="ngo" className="peer sr-only" />
                <Label
                  htmlFor="ngo"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-base font-medium">NGO/Recruiter</span>
                  <span className="text-sm text-muted-foreground">
                    Post jobs and find talent
                  </span>
                </Label>
              </div>
            </RadioGroup>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Continue with
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-muted-foreground">
              By signing in, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </MotionDiv>
    </div>
  );
}
