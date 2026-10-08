import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.NODE_ENV === "production" ? import.meta.env.VITE_API_URL : "http://localhost:3000/api/v1/user/",
});

export const UserAuth = () =>
  API.get("check", { withCredentials: true });

export const UserLogin = (username: string, password: string) =>
  API.post("login", { username, password }, { withCredentials: true });

export const UserLogout = () =>
  API.post("logout", {}, { withCredentials: true });

export const UserRegister = (
  name: string,
  surname: string,
  username: string,
  email: string,
  phone: string,
  password: string
) =>
  API.post(
    "register",
    { name, surname, username, email, phone, password },
    { withCredentials: true }
  );