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
import { UserHistoryType } from "@/Types/UserHistory.type";
import api from "@/http";

const History = () => {
  const [historyData, setHistoryData] = useState<UserHistoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadHistory() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await api.get("files/getHistory");
      setHistoryData(response.data as UserHistoryType[]);
    } catch (loadError) {
      setError(getErrorMessage(loadError, "Unable to load file history."));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadHistory();
  }, []);

  if (isLoading) {
    return (
      <LoadingState
        title="Loading history"
        description="Collecting the latest file events from SkyKeep."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        description={error}
        action={
          <Button variant="outline" onClick={() => void loadHistory()}>
            Try again
          </Button>
        }
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File history</CardTitle>
        <CardDescription>
          Audit uploads, downloads, and other file events associated with your
          storage.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={[
            {
              key: "created-on",
              header: "Action time",
              render: (row) => formatDateTime(row.createdOn),
            },
            {
              key: "file-id",
              header: "File ID",
              render: (row) => row.fileId,
            },
            {
              key: "file-name",
              header: "File name",
              render: (row) => row.fileName,
            },
            {
              key: "action",
              header: "Action",
              render: (row) => row.action,
            },
          ]}
          rows={historyData}
          getRowKey={(row) => row.id}
          emptyState={
            <EmptyState
              title="No file history yet"
              description="SkyKeep has not recorded any file events for this account."
            />
          }
        />
      </CardContent>
    </Card>
  );
};

export default History;
