import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { UserAuth, UserLogin, UserLogout, UserRegister } from "../api/API";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkUserAuth = async () => {
      setLoading(true);
      try {
        const { data } = await UserAuth();

        if ( data.success ) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
      } finally {
        setLoading(false);
      }
    }

    checkUserAuth();
  }, []);

  const register = async (
    name: string,
    surname: string,
    username: string,
    email: string,
    phone: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const { data } = await UserRegister( name, surname, username, email, phone, password );

      if (data.success) {
        login(username, password);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  }

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await UserLogin(username, password);

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    setLoading(true);

    try {
      const { data } = await UserLogout();

      if (data.sucess) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}