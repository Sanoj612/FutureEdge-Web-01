import api from "../api/api";

// =======================================================
// ANALYTICS
// GET /api/admin/analytics
// =======================================================
export const getAnalytics = () => api.get("/api/admin/analytics");


// =======================================================
// USER MANAGEMENT
// Backend routes:
// GET /api/admin/users
// DELETE /api/admin/users/:id
// PUT /api/admin/users/:id/role
// =======================================================

/**
 * Fetches a list of all users. Requires admin role.
 */
export const getUsers = () => api.get("/api/admin/users");

/**
 * Deletes a user by ID. Requires admin role.
 * @param {string} userId - The ID of the user to delete.
 */
export const deleteUser = (userId) => api.delete(`/api/admin/users/${userId}`);

/**
 * Updates the role of a specific user. Requires admin role.
 * @param {string} userId - The ID of the user to update.
 * @param {object} roleData - Must contain the new role, e.g., { role: "employer" }
 */
export const updateUserRole = (userId, roleData) => api.put(`/api/admin/users/${userId}/role`, roleData);


// =======================================================
// RESOURCE DELETION
// Backend routes:
// DELETE /api/admin/jobs/:id
// DELETE /api/admin/courses/:id
// DELETE /api/admin/mentorships/:id
// =======================================================

/**
 * Deletes a job posting by ID. Requires admin role.
 * @param {string} jobId - The ID of the job to delete.
 */
export const deleteJobAdmin = (jobId) => api.delete(`/api/admin/jobs/${jobId}`);

/**
 * Deletes a course by ID. Requires admin role.
 * @param {string} courseId - The ID of the course to delete.
 */
export const deleteCourse = (courseId) => api.delete(`/api/admin/courses/${courseId}`);

/**
 * Deletes a mentorship entry by ID. Requires admin role.
 * @param {string} mentorshipId - The ID of the mentorship entry to delete.
 */
export const deleteMentorship = (mentorshipId) => api.delete(`/api/admin/mentorships/${mentorshipId}`);

// NOTE: Now you need to create the UI components (e.g., ManageUsers.jsx) 
// to import these functions and call them when needed.
