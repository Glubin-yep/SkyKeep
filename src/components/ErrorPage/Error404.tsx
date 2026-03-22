import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Error404 = () => {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center text-center">
          <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
            <Compass className="size-5" />
          </div>
          <CardTitle>404 - Page not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground text-sm">
            The page you requested does not exist or was moved to another route.
          </p>
          <Button asChild>
            <Link to="/dashboard">Go to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Error404;
