// contexts/AuthContext.js
"use client";
import { createContext, useContext, useState } from "react";

// Create a Context for Authentication
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Mock authentication check (you can modify this as per your requirements)
    if (username === "user" && password === "password") {
      setUser({ username });
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
