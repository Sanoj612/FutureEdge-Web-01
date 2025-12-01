import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ roles, children }) {
  const token = localStorage.getItem('fe_token');
  const user = JSON.parse(localStorage.getItem('fe_user') || 'null');
  if (!token || !user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

