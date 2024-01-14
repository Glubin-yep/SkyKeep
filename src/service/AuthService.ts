import { UserType } from "../Types/User.type";
import api from "../http";
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

  static getAuthToken(): string | null {
    const cookies = new Cookies();
    const cookie = cookies.get("Authorization");
    if (cookie) {
      return cookie.token;
    } else {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        return JSON.parse(userStr).token;
      }
    }
    return null;
  }

  static async isValidToken(): Promise<boolean> {
    const cookies = new Cookies();
    const cookie = cookies.get("Authorization");
    if (cookie) {
      try {
        const response = await api.get(`/auth/validate/${cookie.token}`);

        if (response.data.statusCode === 401) {
          return false;
        }
        return true;
      } catch (error) {
        return false;
      }
    } else {
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
    }

    return false;
  }

  static async GithubLogin(): Promise<any> {
    //   return api.get("auth/github").then((response) => {
    //     if (response.data.token) {
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //     }
    //     return response.data;
    //   });

    try {
      window.open(
        `https://discrete-akita-quality.ngrok-free.app/auth/github`,
        "_self"
      );
    } catch (ex) {
      console.log(ex);
    }
  }
}
