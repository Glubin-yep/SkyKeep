import { UserStatisticsType } from "../Types/UserStatistics.type";
import api from "../http";

export default class UserStatistics {
  static async getAllStatistics(): Promise<UserStatisticsType> {
    const data = (await api.get("users/statistic")).data;
    const storage = await this.getStorage();

    data.maxStorage = storage.maxStorage;
    data.usedStorage = storage.usedStorage;

    return data;
  }

  private static async getStorage(): Promise<UserStatisticsType> {
    return (await api.get("users/storage")).data;
  }
}
