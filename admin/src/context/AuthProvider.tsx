import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { AdminCheck, AdminLogin, AdminLogout } from "../api/API";
import { useToast } from "../hooks/useToast";

interface AuthProviderType {
  children: ReactNode
}

interface AdminDataType {
  id: string,
  username: string,
  isSuperAdmin: boolean,
}

export function AuthProvider({ children }: AuthProviderType) {
  const [admin, setAdmin] = useState<AdminDataType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const toastState = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      try {
        const { data } = await AdminCheck();
        if (data.success) {
          setAdmin(data.admin);
          setIsAuthenticated(true);
        } else {
          setAdmin(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAdmin(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    }

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);

    const { data } = await AdminLogin(username, password);
    if (data.success) {
      setAdmin(data.admin);
      setIsAuthenticated(true);
      toastState?.displayToast(true, "Successfully logged in");
    } else {
      toastState?.displayToast(false, "Failed to log in");
    }

    setLoading(false);
  }
  const logout = async () => {
    setLoading(true);
    
    const { data } = await AdminLogout();
    
    if (data.success) {
      setAdmin(null);
      setIsAuthenticated(false);
      toastState?.displayToast(true, "Successfully logged out");
    } else {
      toastState?.displayToast(false, "Failed to log out");
    }

    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}