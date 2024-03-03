import { UserType } from "../Types/User.type";
import api, { API_URL } from "../http";
import Cookies from "universal-cookie";

export default class AuthService {
  static async login(email: string, password: string): Promise<UserType> {
    return api.post("auth/login", { email, password }).then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  static async registration(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<UserType> {
    return api
      .post("auth/register", { email, firstName, lastName, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
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
    const cookies = new Cookies();
    const cookie = cookies.get("Authorization");
    if (cookie) {
      return cookie;
    } else {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        return JSON.parse(userStr);
      }
    }

    return {} as UserType;
  }

  static async isValidToken(): Promise<boolean> {
    try {
      const response = await api.get(`/auth/validate`);

      if (response.data.statusCode === 401) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  static async GithubLogin(): Promise<any> {
    try {
      window.location.href = API_URL + "auth/github";
    } catch (ex) {
      console.log(ex);
    }
  }
}
