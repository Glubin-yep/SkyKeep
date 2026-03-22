import { useEffect, useState } from "react";

import { DataTable } from "@/components/shared/data-table";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/page-states";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateTime, getErrorMessage } from "@/lib/app-utils";
import { UserActivityType } from "@/Types/UserActivity.type";
import api from "@/http";

const Activity = () => {
  const [activityData, setActivityData] = useState<UserActivityType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadActivity() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await api.get("users/activity");
      setActivityData(response.data as UserActivityType[]);
    } catch (loadError) {
      setError(getErrorMessage(loadError, "Unable to load activity."));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadActivity();
  }, []);

  if (isLoading) {
    return (
      <LoadingState
        title="Loading activity"
        description="Collecting recent sign-in records from the SkyKeep API."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        description={error}
        action={
          <Button variant="outline" onClick={() => void loadActivity()}>
            Try again
          </Button>
        }
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign-in activity</CardTitle>
        <CardDescription>
          Review access history, browser metadata, and source details for your
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={[
            {
              key: "login-time",
              header: "Login time",
              render: (row) => formatDateTime(row.loginTime),
            },
            {
              key: "ip-address",
              header: "IP address",
              render: (row) => row.ipAddress,
            },
            {
              key: "browser",
              header: "Browser",
              render: (row) => row.browser,
            },
            {
              key: "platform",
              header: "Platform",
              render: (row) => row.platform,
            },
            {
              key: "device",
              header: "Device",
              render: (row) => row.deviceType || "Unknown",
            },
            {
              key: "location",
              header: "Location",
              render: (row) => row.location || "Unknown",
            },
            {
              key: "agent",
              header: "User agent",
              render: (row) => row.userAgent || "Unknown",
            },
          ]}
          rows={activityData}
          getRowKey={(row) => row.id}
          emptyState={
            <EmptyState
              title="No activity yet"
              description="SkyKeep has no recorded sign-in activity for this account."
            />
          }
        />
      </CardContent>
    </Card>
  );
};

export default Activity;
