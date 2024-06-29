import React, { createContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      handleLogin();
    }
  }, [handleLogin]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
