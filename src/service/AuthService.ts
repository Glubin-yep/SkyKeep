import { UserType } from "../Types/User.type";
import api from "../http";

export default class AuthService {
  static async login(email: string, password: string): Promise<UserType> {
    return api.post("auth/login", { email, password }).then((response) => {
      if (response.data.token) {
        const { id, email } = response.data;

        localStorage.setItem("user", JSON.stringify({ id, email }));
      }

      return response.data;
    });
  }

  static async registration(
    email: string,
    fullName: string,
    password: string
  ): Promise<UserType> {
    return api
      .post("auth/register", { email, fullName, password })
      .then((response) => {
        if (response.data.token) {
          const { id, email } = response.data;

          localStorage.setItem("user", JSON.stringify({ id, email }));
        }

        return response.data;
      });
  }

  static async logout(): Promise<any> {
    return api.post("auth/logout");
  }

  static async getCurrentUser(): Promise<UserType> {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }

    return {} as UserType;
  }
}
