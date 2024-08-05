import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: null,
    token: null,
  });

  const login = (newToken, userInfo) => {
    setAuthState({ isLoggedIn: true, user: userInfo, token: newToken });
  };

  const logout = () => {
    setAuthState({ isLoggedIn: false, user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
