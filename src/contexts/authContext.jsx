import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (token, userData) => {
    localStorage.setItem("authToken", token);

    try {
      setLoading(true);
      setUser(userData);
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      login(token);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, loading, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
