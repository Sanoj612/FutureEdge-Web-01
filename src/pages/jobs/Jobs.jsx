// src/pages/jobs/Jobs.jsx
import { useEffect, useMemo, useState } from "react";
import { Card, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarLayout from "../../components/NavbarLayout";
import { getJobs } from "../../services/jobService";

export default function Jobs() {
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs from API
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getJobs();
        setJobs(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filtered jobs (search + location)
  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const text = (j.title + " " + j.company + " " + (j.skills || []).join(" ")).toLowerCase();
      const matchText = text.includes(q.toLowerCase());
      const matchLoc = location ? j.location === location : true;
      return matchText && matchLoc;
    });
  }, [q, location, jobs]);

  return (
    <NavbarLayout>
      <h3 className="mb-3">Find Jobs</h3>

      {/* Filter Section */}
      <Card className="p-3 mb-3">
        <Row className="g-2">
          <Col md={6}>
            <Form.Control
              placeholder="Search title, company, skills..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setQ("");
                setLocation("");
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Job List */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading jobs...</p>
        </div>
      ) : (
        <Row className="g-3">
          {filtered.map((job) => (
            <Col key={job.id} md={6} lg={4}>
              <Card className="p-3 h-100 shadow-sm">
                <h5>{job.title}</h5>
                <div className="text-muted">
                  {job.company} • {job.location} • {job.type}
                </div>
                <div className="small my-2">
                  Skills: {(job.skills || []).join(", ")}
                </div>
                <p className="fw-bold">Salary: Rs {job.price || job.salary}</p>
                <Button
                  as={Link}
                  to={`/jobs/apply/${job.id}`}
                  variant="primary"
                >
                  Apply Now
                </Button>
              </Card>
            </Col>
          ))}
          {filtered.length === 0 && !loading && (
            <p className="text-muted">No jobs match your filters.</p>
          )}
        </Row>
      )}
    </NavbarLayout>
  );
}
