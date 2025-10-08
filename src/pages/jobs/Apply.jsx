// src/pages/jobs/Apply.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import NavbarLayout from "../../components/NavbarLayout";
import { getJobs } from "../../services/jobService"; // ✅ fetch jobs from backend
import api from "../../api/api"; // ✅ axios instance with interceptor

export default function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch single job from backend
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getJobs();
        const jobFound = res.data.find((j) => j.id === Number(id));
        setJob(jobFound || null);
      } catch (err) {
        console.error("❌ Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Handle form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      jobId: id,
      name: formData.get("name"),
      email: formData.get("email"),
      resumeUrl: formData.get("resume"),
    };

    try {
      setSubmitting(true);
      await api.post("/applications", payload); // ✅ backend API call
      alert("✅ Application submitted successfully!");
      navigate("/jobs");
    } catch (err) {
      console.error("❌ Error submitting application:", err);
      alert("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <NavbarLayout>
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading job details...</p>
        </div>
      </NavbarLayout>
    );
  }

  if (!job) {
    return (
      <NavbarLayout>
        <p className="text-danger">Job not found.</p>
      </NavbarLayout>
    );
  }

  return (
    <NavbarLayout>
      <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: 700 }}>
        <h4 className="mb-3">
          Apply: {job.title} — {job.company}
        </h4>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control name="name" required placeholder="Your full name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resume (paste URL for now)</Form.Label>
            <Form.Control
              name="resume"
              type="url"
              required
              placeholder="https://..."
            />
            <div className="form-text">
              Later we’ll integrate file uploads (S3 or local).
            </div>
          </Form.Group>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </Form>
      </Card>
    </NavbarLayout>
  );
}
