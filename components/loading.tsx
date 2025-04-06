"use client";

import { useTheme } from "next-themes";
import { MotionDiv } from "@/components/motion-div";
import { Loader } from "lucide-react";

const LoadingScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Loader className="animate-spin h-16 w-16 text-primary" />
        <h2 className="mt-4 text-2xl font-bold">Loading...</h2>
      </MotionDiv>
    </div>
  );
};

export default LoadingScreen;
