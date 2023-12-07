import api from "../http";
import { FileData } from "../Types/FileData";
import AuthService from "./AuthService";

export default class FileService {
  static async getAllFiles(): Promise<FileData[]> {
    try {
      const user = AuthService.getCurrentUser();
      const response = await api.get("/files", { params: { user: user.id } });
      return response.data as FileData[];
    } catch (error) {
      console.error("Error while fetching files:", error);
      throw error;
    }
  }

  static async downloadFile(id: number): Promise<void> {
    try {
      const response = await api.get(`/files/${id}/download`, {
        responseType: "blob",
      });

      const contentType = response.headers["content-type"];
      console.log(contentType);

      const blob = new Blob([response.data], { type: contentType });

      const [, filename] =
        response.headers["content-disposition"].split("filename=");

      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);

      link.download = filename;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error while downloading file:", error);
      throw error;
    }
  }

  static async uploadFile(options: any): Promise<any> {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onProgress: (event: ProgressEvent) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    try {
      const { data } = await api.post("files", formData, config);

      onSuccess();

      return data;
    } catch (err) {
      onError({ err });
    }
  }
}
