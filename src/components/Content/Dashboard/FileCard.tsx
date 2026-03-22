import {
  Download,
  FileArchive,
  FileImage,
  FileText,
  FileVideo,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatFileSize } from "@/lib/app-utils";
import { FileData } from "@/Types/FileData";

type FileCardProps = {
  file: FileData;
  onDownload: (id: number) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
  actionInFlight?: "download" | "delete" | null;
};

function getFileIcon(mimetype: string) {
  if (mimetype.startsWith("image/")) {
    return FileImage;
  }

  if (mimetype.startsWith("video/")) {
    return FileVideo;
  }

  if (
    mimetype.includes("zip") ||
    mimetype.includes("archive") ||
    mimetype.includes("compressed")
  ) {
    return FileArchive;
  }

  return FileText;
}

export default function FileCard({
  file,
  onDownload,
  onDelete,
  actionInFlight = null,
}: FileCardProps) {
  const FileIcon = getFileIcon(file.mimetype);

  return (
    <Card className="h-full">
      <CardHeader className="space-y-4">
        <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-xl">
          <FileIcon className="size-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="line-clamp-2 text-base">
            {file.originalName}
          </CardTitle>
          <p className="text-muted-foreground text-xs break-all">
            {file.filename}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Type</span>
          <span className="max-w-[70%] truncate font-medium">
            {file.mimetype || "Unknown"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Size</span>
          <span className="font-medium">{formatFileSize(file.size)}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => void onDownload(file.id)}
          disabled={actionInFlight !== null}
        >
          <Download className="size-4" />
          {actionInFlight === "download" ? "Downloading..." : "Download"}
        </Button>
        <Button
          variant="destructive"
          className="flex-1"
          onClick={() => void onDelete(file.id)}
          disabled={actionInFlight !== null}
        >
          <Trash2 className="size-4" />
          {actionInFlight === "delete" ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}
