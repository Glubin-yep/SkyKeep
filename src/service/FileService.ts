import type { AxiosProgressEvent } from "axios";

import api from "@/http";
import { FileData } from "@/Types/FileData";

import AuthService from "./AuthService";

export default class FileService {
  static async getAllFiles(): Promise<FileData[]> {
    const user = AuthService.getCurrentUser();

    const response = await api.get("/files", {
      params:
        typeof user?.id === "number" && user.id > 0 ? { user: user.id } : {},
    });

    return response.data as FileData[];
  }

  static async downloadFile(id: number): Promise<void> {
    const response = await api.get(`/files/${id}/download`, {
      responseType: "blob",
    });

    const contentType = response.headers["content-type"];
    const blob = new Blob([response.data], { type: contentType });
    const disposition = response.headers["content-disposition"] as
      | string
      | undefined;
    const filename = disposition?.split("filename=")[1]?.replace(/"/g, "");

    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);
    link.download = filename || `file-${id}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static async uploadFile(
    file: File,
    onProgress?: (percent: number) => void,
  ): Promise<FileData> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event: AxiosProgressEvent) => {
        const total = event.total ?? file.size;

        if (!total) {
          return;
        }

        onProgress?.(Math.round((event.loaded / total) * 100));
      },
    });

    return response.data as FileData;
  }

  static async deleteFile(id: number): Promise<FileData[]> {
    const response = await api.delete("/files", { params: { id } });
    return response.data as FileData[];
  }
}
