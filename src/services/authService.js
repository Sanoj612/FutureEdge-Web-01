// src/services/authService.js
import api from "../api/api";

export const register = (payload) => api.post("/api/users/register", payload);
export const login = (email, password) => api.post("/api/users/login", { email, password });
export const fetchProfile = () => api.get("/api/users/profile");
