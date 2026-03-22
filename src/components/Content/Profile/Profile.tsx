import { useEffect, useMemo, useState } from "react";
import {
  Database,
  Download,
  FileStack,
  Upload,
} from "lucide-react";

import { EmptyState, ErrorState, LoadingState } from "@/components/shared/page-states";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatFileSize, getErrorMessage } from "@/lib/app-utils";
import { UserStatisticsType } from "@/Types/UserStatistics.type";
import UserStatisticsService from "@/service/UserStatisticsService";

const initialStatistics: UserStatisticsType = {
  id: 0,
  totalFiles: 0,
  usedStorage: 0,
  uploadedFiles: 0,
  downloadedFiles: 0,
  maxStorage: 0,
};

const statisticCards = [
  {
    key: "totalFiles",
    label: "Total files",
    icon: FileStack,
  },
  {
    key: "uploadedFiles",
    label: "Uploads",
    icon: Upload,
  },
  {
    key: "downloadedFiles",
    label: "Downloads",
    icon: Download,
  },
] as const;

const Profile = () => {
  const [statistics, setStatistics] = useState<UserStatisticsType>(initialStatistics);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStatistics() {
    setError(null);
    setIsLoading(true);

    try {
      const data = await UserStatisticsService.getAllStatistics();
      setStatistics(data);
    } catch (loadError) {
      setError(getErrorMessage(loadError, "Unable to load statistics."));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadStatistics();
  }, []);

  const usagePercent = useMemo(() => {
    if (!statistics.maxStorage) {
      return 0;
    }

    return Math.min(
      100,
      Math.round((statistics.usedStorage / statistics.maxStorage) * 100),
    );
  }, [statistics.maxStorage, statistics.usedStorage]);

  if (isLoading) {
    return (
      <LoadingState
        title="Loading profile"
        description="Preparing your SkyKeep storage and usage statistics."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        description={error}
        action={
          <Button variant="outline" onClick={() => void loadStatistics()}>
            Try again
          </Button>
        }
      />
    );
  }

  if (
    statistics.totalFiles === 0 &&
    statistics.usedStorage === 0 &&
    statistics.uploadedFiles === 0 &&
    statistics.downloadedFiles === 0
  ) {
    return (
      <EmptyState
        title="No profile metrics yet"
        description="Upload and download files to populate your SkyKeep account statistics."
      />
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statisticCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.key}>
              <CardHeader className="space-y-3">
                <div className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-xl">
                  <Icon className="size-4" />
                </div>
                <CardTitle className="text-base">{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">
                  {statistics[item.key]}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="size-5" />
            Storage usage
          </CardTitle>
          <CardDescription>
            Current usage based on the statistics returned by the SkyKeep API.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Used storage</span>
              <span className="font-medium">
                {formatFileSize(statistics.usedStorage)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Maximum storage</span>
              <span className="font-medium">
                {formatFileSize(statistics.maxStorage)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-muted h-3 rounded-full">
              <div
                className="bg-primary h-3 rounded-full transition-[width]"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="text-muted-foreground text-sm">
              {usagePercent}% of your available storage is currently in use.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
