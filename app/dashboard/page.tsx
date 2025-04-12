"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { LearnerDashboard } from "@/components/dashboards/learner-dashboard";
import { MentorDashboard } from "@/components/dashboards/mentor-dashboard";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading";
import { OrganisationDashboard } from "@/components/dashboards/organisation-dashboard";

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
    <div className="p-5 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {role === "learner" && <LearnerDashboard />}
      {role === "mentor" && <MentorDashboard />}
      {role === "organisation" && <OrganisationDashboard />}
    </div>
  );
}
