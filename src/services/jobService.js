// src/services/jobService.js
import api from "../api/api";
export const getJobs = (params) => api.get("/api/jobs", { params });
export const getJob = (id) => api.get(`/api/jobs/${id}`);
export const createJob = (data) => api.post("/api/jobs", data); // protected
export const updateJob = (id, data) => api.put(`/api/jobs/${id}`, data);
export const deleteJob = (id) => api.delete(`/api/jobs/${id}`);
