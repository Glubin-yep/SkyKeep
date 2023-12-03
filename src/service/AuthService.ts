import { UserType } from "../Types/User.type";
import api from "../http";

export default class AuthService {
  static async login(email: string, password: string): Promise<UserType> {
    return api.post("auth/login", { email, password }).then((response) => {
      if (response.data.token) {
        const { id, email, token } = response.data;

        localStorage.setItem("user", JSON.stringify({ id, email, token }));
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
          const { id, email, token } = response.data;
          localStorage.setItem("user", JSON.stringify({ id, email, token }));
        }

        return response.data;
      });
  }

  static async logout(): Promise<boolean> {
    localStorage.clear();
    const logout = await api.get("auth/logout");
    return logout.status === 200;
  }

  static getCurrentUser(): UserType {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }

    return {} as UserType;
  }

  static getAuthToken(): string | null {
    const userStr = localStorage.getItem("user");

    if (userStr) {
      return JSON.parse(userStr).token;
    }
    return null;
  }

  static async isValidToken(): Promise<boolean> {
    const userStr = localStorage.getItem("user");

    if (userStr) {
      const token = JSON.parse(userStr).token;

      try {
        const response = await api.get(`/auth/validate/${token}`);

        if (response.data.statusCode === 401) {
          return false;
        }
        return true;
      } catch (error) {
        return false;
      }
    }

    return false;
  }
}
