import api from "../api/api";

/**
 * Sends text or resume file data to the backend for parsing.
 * Requires authentication (token).
 * @param {object} data - The resume data (e.g., { text: '...' } or FormData).
 */
export const parseResume = (data) => api.post("/api/resumes/parse", data);

/**
 * Fetches a list of resumes previously parsed and saved by the current user.
 * Requires authentication (token).
 */
export const getUserResumes = () => api.get("/api/resumes/my-resumes");

// NOTE: Ensure your backend is mounting these routes in index.js, 
// e.g., app.use("/api/resumes", resumeRoutes);
