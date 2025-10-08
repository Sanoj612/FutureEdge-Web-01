// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until AuthContext finishes checking the token
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in → go to login and remember where they came from
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route has role restrictions → check the user's role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User logged in but doesn’t have permission (redirect to homepage)
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected component
  return children;
}
