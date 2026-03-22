import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthService from "@/service/AuthService";

const Logout = () => {
  const [isLogout, setIsLogout] = useState<boolean | null>(null);

  useEffect(() => {
    const performLogout = async () => {
      try {
        const logoutResult = await AuthService.logout();
        setIsLogout(logoutResult);
      } catch (error) {
        console.error("Logout error:", error);
        setIsLogout(false);
      }
    };

    void performLogout();
  }, []);

  const icon =
    isLogout === null ? (
      <LoaderCircle className="size-5 animate-spin" />
    ) : isLogout ? (
      <CheckCircle2 className="size-5" />
    ) : (
      <XCircle className="size-5" />
    );

  const title =
    isLogout === null
      ? "Signing you out"
      : isLogout
        ? "Logout successful"
        : "Logout failed";

  const description =
    isLogout === null
      ? "Ending your current SkyKeep session."
      : isLogout
        ? "You have successfully logged out of SkyKeep."
        : "SkyKeep could not complete the logout request. Please try again.";

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center text-center">
          <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground text-sm">{description}</p>
          {isLogout === null ? null : (
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link to={isLogout ? "/auth/login" : "/dashboard"}>
                  {isLogout ? "Sign in again" : "Back to dashboard"}
                </Link>
              </Button>
              {isLogout ? (
                <Button asChild variant="outline">
                  <Link to="/auth/registration">Create another account</Link>
                </Button>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Logout;
