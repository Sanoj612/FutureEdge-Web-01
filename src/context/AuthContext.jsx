// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginApi, register as registerApi, fetchProfile } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetchProfile();
      setUser(res.data.user || res.data); // depending on your response shape
    } catch (err) {
      console.error("Profile fetch failed", err);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    const token = res.data.token || res.data.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    await loadProfile();
    return res;
  };

  const register = async (payload) => {
    const res = await registerApi(payload);
    if (res.data.token) localStorage.setItem("token", res.data.token);
    await loadProfile();
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
