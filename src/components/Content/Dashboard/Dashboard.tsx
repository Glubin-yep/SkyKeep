import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { HardDriveUpload, RefreshCw, UploadCloud } from "lucide-react";

import FileCard from "@/components/Content/Dashboard/FileCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/page-states";
import { getErrorMessage } from "@/lib/app-utils";
import { FileData } from "@/Types/FileData";
import FileService from "@/service/FileService";

type BannerState = {
  variant: "default" | "destructive";
  title: string;
  description: string;
} | null;

function DashBoard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<BannerState>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeFileAction, setActiveFileAction] = useState<{
    id: number;
    type: "download" | "delete";
  } | null>(null);

  async function loadFiles() {
    setError(null);
    setIsLoading(true);

    try {
      const data = await FileService.getAllFiles();
      setFiles(data);
    } catch (loadError) {
      setError(getErrorMessage(loadError, "Unable to load files."));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadFiles();
  }, []);

  async function uploadSelectedFile(file: File | null) {
    if (!file) {
      return;
    }

    setBanner(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      await FileService.uploadFile(file, setUploadProgress);
      setBanner({
        variant: "default",
        title: "Upload complete",
        description: `${file.name} was uploaded successfully.`,
      });
      await loadFiles();
    } catch (uploadError) {
      setBanner({
        variant: "destructive",
        title: "Upload failed",
        description: getErrorMessage(uploadError, "Unable to upload file."),
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;
    void uploadSelectedFile(nextFile);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragOver(false);
    const nextFile = event.dataTransfer.files?.[0] ?? null;
    void uploadSelectedFile(nextFile);
  }

  async function handleDownload(id: number) {
    setActiveFileAction({ id, type: "download" });

    try {
      await FileService.downloadFile(id);
    } catch (downloadError) {
      setBanner({
        variant: "destructive",
        title: "Download failed",
        description: getErrorMessage(downloadError, "Unable to download file."),
      });
    } finally {
      setActiveFileAction(null);
    }
  }

  async function handleDelete(id: number) {
    const shouldDelete = window.confirm(
      "Delete this file from your SkyKeep storage?",
    );

    if (!shouldDelete) {
      return;
    }

    setActiveFileAction({ id, type: "delete" });

    try {
      await FileService.deleteFile(id);
      setBanner({
        variant: "default",
        title: "File deleted",
        description: "The selected file was removed from storage.",
      });
      await loadFiles();
    } catch (deleteError) {
      setBanner({
        variant: "destructive",
        title: "Delete failed",
        description: getErrorMessage(deleteError, "Unable to delete file."),
      });
    } finally {
      setActiveFileAction(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card
        className={isDragOver ? "border-primary shadow-lg shadow-primary/10" : undefined}
      >
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <HardDriveUpload className="size-5" />
              Upload files
            </CardTitle>
            <CardDescription>
              Drag and drop a file here or choose one manually. SkyKeep uploads
              one file at a time.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void loadFiles()}>
              <RefreshCw className="size-4" />
              Refresh
            </Button>
            <Button onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="size-4" />
              Choose file
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            className="border-muted-foreground/25 bg-muted/20 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadCloud className="text-muted-foreground mb-3 size-8" />
            <p className="font-medium">Drop a file to upload</p>
            <p className="text-muted-foreground max-w-md text-sm">
              Supported by the existing SkyKeep upload API. The list below
              refreshes automatically after a successful upload.
            </p>
          </div>
          {isUploading ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Upload progress</span>
                <span className="font-medium">{uploadProgress}%</span>
              </div>
              <div className="bg-muted h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full transition-[width]"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : null}
          {banner ? (
            <Alert variant={banner.variant}>
              <AlertTitle>{banner.title}</AlertTitle>
              <AlertDescription>{banner.description}</AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
      </Card>

      {isLoading ? (
        <LoadingState
          title="Loading files"
          description="Fetching your current SkyKeep storage inventory."
        />
      ) : error ? (
        <ErrorState
          description={error}
          action={
            <Button variant="outline" onClick={() => void loadFiles()}>
              Try again
            </Button>
          }
        />
      ) : files.length === 0 ? (
        <EmptyState
          title="No files uploaded yet"
          description="Upload your first file to start using the SkyKeep dashboard."
          action={
            <Button onClick={() => fileInputRef.current?.click()}>
              Upload first file
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onDownload={handleDownload}
              onDelete={handleDelete}
              actionInFlight={
                activeFileAction?.id === file.id ? activeFileAction.type : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashBoard;
