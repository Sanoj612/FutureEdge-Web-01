import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import JobSeekerDashboard from './pages/JobSeekerDashboard.jsx';
import EmployerDashboard from './pages/EmployerDashboard.jsx';
import TrainerDashboard from './pages/TrainerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import JobBrowse from './pages/JobBrowse.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ChatbotWidget from './components/ChatbotWidget.jsx';
import Footer from './components/Footer.jsx';
import Background from './components/Background.jsx';

function Nav() {
  const user = JSON.parse(localStorage.getItem('fe_user') || 'null');
  const logout = () => { localStorage.removeItem('fe_token'); localStorage.removeItem('fe_user'); window.location.href = '/'; };
  return (
    <header className="bg-white/20 backdrop-blur-xl border-b border-white/30 sticky top-0 z-10">
      <div className="container-narrow flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-primary-700">FutureEdge</Link>
          <nav className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
            <Link to="/">Jobs</Link>
            {user?.role === 'jobseeker' && <Link to="/jobseeker">My Dashboard</Link>}
            {user?.role === 'employer' && <Link to="/employer">Employer</Link>}
            {user?.role === 'trainer' && <Link to="/trainer">Trainer</Link>}
            {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {!user && (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-gradient">Sign up</Link>
            </>
          )}
          {user && (
            <button onClick={logout} className="btn btn-secondary">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Nav />
      <main className="flex-1">
        <div className="container-narrow py-6">
          <Routes>
            <Route path="/" element={<JobBrowse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/jobseeker" element={<ProtectedRoute roles={["jobseeker"]}><JobSeekerDashboard /></ProtectedRoute>} />
            <Route path="/employer" element={<ProtectedRoute roles={["employer"]}><EmployerDashboard /></ProtectedRoute>} />
            <Route path="/trainer" element={<ProtectedRoute roles={["trainer"]}><TrainerDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
