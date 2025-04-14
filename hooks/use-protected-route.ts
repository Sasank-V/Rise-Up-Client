import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const useProtectedRoute = (allowedRoles: string[] = []) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Wait until loading finishes
    if (status === "loading") return;

    // If there's no session, redirect to login
    if (!session) {
      router.push("/login");
      return;
    }

    // If allowedRoles array is provided, check if user's role is permitted.
    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      router.push("/");
    }
  }, [session, status, router, allowedRoles]);
};

export default useProtectedRoute;
