import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const UserAuth = () =>
  API.get("user/check", { withCredentials: true });

export const UserLogin = (username: string, password: string) =>
  API.post("user/login", { username, password }, { withCredentials: true });

export const UserLogout = () =>
  API.post("user/logout", {}, { withCredentials: true });

export const UserRegister = (
  name: string,
  surname: string,
  username: string,
  email: string,
  phone: string,
  password: string
) =>
  API.post(
    "user",
    { name, surname, username, email, phone, password },
    { withCredentials: true }
  );

export const GetProducts = () => API.get("products")