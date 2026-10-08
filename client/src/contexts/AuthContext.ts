import { createContext } from "react";

export interface AuthContextType {
  user: {
    id: string,
    name: string,
    surname: string,
    username: string,
    email: string,
    phone: string,
    reservations: string[] | null,
    cart: string[] | null,
    orderHistory: string[] | null
  } | null,
  isAuthenticated: boolean,
  loading: boolean,
  login: (username: string, password: string) => Promise<void>,
  logout: () => Promise<void>,
  register: (
    name: string,
    surname: string,
    username: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<void>,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);