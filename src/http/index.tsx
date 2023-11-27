import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AuthToken = cookies.get("Authorization")?.token;

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${AuthToken}`
    return config;
})

export default api;