// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import NavbarLayout from "../../components/NavbarLayout";
import api from "../../api/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    employers: 0,
    trainers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/admin/summary"); // ✅ Adjust backend endpoint if different
        setStats(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <NavbarLayout>
      <div className="admin-dashboard">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        {loading ? (
          <p className="loading">Loading dashboard data...</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-card users">
              <h3>{stats.users}</h3>
              <p>Total Users</p>
            </div>

            <div className="stat-card jobs">
              <h3>{stats.jobs}</h3>
              <p>Total Jobs</p>
            </div>

            <div className="stat-card employers">
              <h3>{stats.employers}</h3>
              <p>Total Employers</p>
            </div>

            <div className="stat-card trainers">
              <h3>{stats.trainers}</h3>
              <p>Total Trainers</p>
            </div>
          </div>
        )}
      </div>
    </NavbarLayout>
  );
}
