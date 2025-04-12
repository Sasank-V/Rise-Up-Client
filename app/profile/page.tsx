"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading";
import LearnerProfilePage from "@/components/profiles/learner-profile";
import MentorProfilePage from "@/components/profiles/mentor-profile";
import OrganisationProfilePage from "@/components/profiles/organisation-profile";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [role, setRole] = useState("learner");

  useEffect(() => {
    if (session?.user) {
      setRole(session.user.role);
    }
    if (status === "unauthenticated") {
      redirect("/signin");
    }
  }, [session, status]);

  if (status === "loading") {
    return <LoadingScreen />;
  }
  return (
    <div>
      {role === "learner" && <LearnerProfilePage />}
      {role === "mentor" && <MentorProfilePage />}
      {role === "organisation" && <OrganisationProfilePage />}
    </div>
  );
}
