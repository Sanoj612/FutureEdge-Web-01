// src/services/applicationService.js
import api from "../api/api";
export const applyJob = (jobId, coverLetter) => api.post("/api/applications/apply", { job_id: jobId, cover_letter: coverLetter });
export const getApplicationsForJob = (jobId) => api.get(`/api/applications/${jobId}/applications`);
export const updateApplicationStatus = (id, status) => api.put(`/api/applications/applications/${id}/status`, { status });
