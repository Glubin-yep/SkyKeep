import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegistrationPrompt = () => {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center text-center">
          <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
            <LockKeyhole className="size-5" />
          </div>
          <CardTitle>Authentication required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground text-sm">
            You need to register or sign in before opening the SkyKeep
            dashboard.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/auth/login">Sign in</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/auth/registration">Create account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationPrompt;
