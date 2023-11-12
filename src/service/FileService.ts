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
}
