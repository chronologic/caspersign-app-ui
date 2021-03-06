import React, { createContext, useCallback, useEffect, useState } from "react";

import { IUser } from "../../types";

export interface IAuthContext {
  isAuthenticated: boolean;
  email: string;
  token: string;
  onAuthenticated: (user: IUser) => void;
  onLogout: () => void;
}

interface IProps {
  children: React.ReactNode;
}

const USER_STORAGE_KEY = "user";

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  email: "",
  token: "",
  onAuthenticated: () => {},
  onLogout: () => {},
});

const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const onAuthenticated = useCallback((user?: IUser | null) => {
    setIsAuthenticated(!!user);
    setEmail(user?.email || "");
    setToken(user?.oauthToken || "");
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user || null));
  }, []);
  const onLogout = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    let user: IUser | null = JSON.parse(
      localStorage.getItem(USER_STORAGE_KEY) || "null"
    );
    let logoutTimeout: NodeJS.Timeout;
    if (user) {
      const timeToExpiration =
        new Date(user.oauthTokenExpirationDate).getTime() -
        new Date().getTime();

      if (timeToExpiration <= 0) {
        user = null;
      } else {
        logoutTimeout = setTimeout(onLogout, timeToExpiration);
      }
    }
    onAuthenticated(user);

    return () => {
      clearTimeout(logoutTimeout);
    };
  }, [onAuthenticated, onLogout]);

  return (
    <AuthContext.Provider
      value={{ email, token, isAuthenticated, onAuthenticated, onLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
