import axios from "axios";
import AuthService from "../service/AuthService";

const AuthToken = AuthService.getAuthToken();

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${AuthToken}`;
  return config;
});

export default api;
