// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  admin: null,
  setAuth: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ isLoggedIn: false, admin: null });

  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) setAuthState({ isLoggedIn: true, admin: JSON.parse(stored) });
  }, []);

  const setAuth = (payload) => setAuthState(payload);
  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("auth");
    setAuthState({ isLoggedIn: false, admin: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
