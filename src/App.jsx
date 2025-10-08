// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Public Pages
import Home from "./pages/Home";
import Jobs from "./pages/jobs/Jobs";
import Apply from "./pages/jobs/Apply";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Role-based Dashboards
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import Learning from "./pages/trainer/Learning";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Extra Features
import Chatbot from "./pages/chatbot/Chatbot";
import ResumeParse from "./pages/resumeparse/ResumeParse";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* 🟢 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobs" element={<Jobs />} />

      {/* 🟡 Protected Routes */}
      <Route
        path="/jobs/apply/:id"
        element={
          <ProtectedRoute>
            <Apply />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/learning"
        element={
          <ProtectedRoute>
            <Learning />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-parse"
        element={
          <ProtectedRoute>
            <ResumeParse />
          </ProtectedRoute>
        }
      />

      {/* 🔴 Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🔁 Default Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
