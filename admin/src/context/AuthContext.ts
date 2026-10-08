import { createContext } from "react";

interface AuthContextType {
  admin: {
    id: string,
    username: string,
    isSuperAdmin: boolean,
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)