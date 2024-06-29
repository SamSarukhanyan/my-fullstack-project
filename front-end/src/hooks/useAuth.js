// hooks/useAuth.js
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminToken");
    navigate("/login");
  }, [navigate]);

  return {
    isLoggedIn,
    handleLogin,
    handleLogout
  };
};

export default useAuth;