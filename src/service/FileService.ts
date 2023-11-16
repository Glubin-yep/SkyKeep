import api from "../http";
import { FileData } from "../Types/FileData";

export default class FileService {
  static async getAllFiles(): Promise<FileData[]> {
    try {
      const response = await api.get("/files");
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
}
