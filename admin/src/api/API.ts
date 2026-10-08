import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.NODE_ENV === "production" ? import.meta.env.VITE_API_URL : "http://localhost:3000/api/v1/",
});

export const AdminCheck = () =>
  API.get("admin/check", { withCredentials: true });

export const AdminLogin = (username: string, password: string) =>
  API.post("admin/login", { username, password }, { withCredentials: true });

export const AdminLogout = () =>
  API.post("admin/logout", {}, { withCredentials: true });