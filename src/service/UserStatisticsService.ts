import { UserStatisticsType } from "../Types/UserStatistics.type";
import api from "../http";

export default class UserStatistics {
  static async getAllStatistics(): Promise<UserStatisticsType> {
    return api.get("users/statistic").then(response => response.data);

  }
}
