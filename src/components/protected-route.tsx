import { useEffect, useState } from "react";

import RegistrationPrompt from "@/components/ErrorPage/AuthError";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LoadingState } from "@/components/shared/page-states";
import AuthService from "@/service/AuthService";

export function ProtectedRoute() {
  const [status, setStatus] = useState<"loading" | "ready" | "denied">(
    "loading",
  );

  useEffect(() => {
    let active = true;

    async function validate() {
      const isAuthenticated = await AuthService.isValidToken();

      if (!active) {
        return;
      }

      setStatus(isAuthenticated ? "ready" : "denied");
    }

    void validate();

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <LoadingState
            title="Checking access"
            description="Verifying your SkyKeep session before opening the dashboard."
          />
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return <RegistrationPrompt />;
  }

  return <DashboardLayout />;
}
