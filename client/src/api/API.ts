import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const UserAuth = () =>
  API.get("users/check", { withCredentials: true });

export const UserLogin = (email: string, password: string) =>
  API.post("users/login", { email, password }, { withCredentials: true });

export const UserLogout = () =>
  API.post("users/logout", {}, { withCredentials: true });

export const UserRegister = (
  name: string,
  surname: string,
  username: string,
  email: string,
  phone: string,
  password: string
) =>
  API.post(
    "users",
    { name, surname, username, email, phone, password },
    { withCredentials: true }
  );

export const GetProducts = (category: string) => API.get("products", { params: { category } });