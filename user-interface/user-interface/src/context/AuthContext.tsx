import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from 'jwt-decode';

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

interface CustomJwtPayload extends JwtPayload {
  userId: number;
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const getUserFromToken = (jwtToken: string): User | null => {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(jwtToken);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return null;
      }

      return {
        id: decoded.userId,
        username: decoded.username
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(getUserFromToken(newToken));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};