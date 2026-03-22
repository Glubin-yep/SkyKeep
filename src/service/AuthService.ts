import Cookies from "universal-cookie";

import { UserType } from "@/Types/User.type";
import api, { API_URL } from "@/http";

export default class AuthService {
  static async login(email: string, password: string): Promise<UserType> {
    const response = await api.post("auth/login", { email, password });

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data as UserType;
  }

  static async registration(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<UserType> {
    const response = await api.post("auth/register", {
      email,
      firstName,
      lastName,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data as UserType;
  }

  static async logout(): Promise<boolean> {
    localStorage.removeItem("user");
    const response = await api.get("auth/logout");
    return response.status === 200;
  }

  static getCurrentUser(): UserType | null {
    const userStr = localStorage.getItem("user");

    if (userStr) {
      return JSON.parse(userStr) as UserType;
    }

    const token = new Cookies().get("Authorization") as string | undefined;

    if (!token) {
      return null;
    }

    return {
      token,
      id: 0,
      email: "",
    };
  }

  static async isValidToken(): Promise<boolean> {
    try {
      const response = await api.get("auth/validate");
      return response.data.statusCode !== 401;
    } catch {
      return false;
    }
  }

  static githubLogin(): void {
    const normalizedBaseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
    window.location.href = `${normalizedBaseUrl}auth/github`;
  }
}
