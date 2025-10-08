import { useState } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import NavbarLayout from '../../components/NavbarLayout'

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({ title:'', company:'', location:'', type:'Full-time', skills:'' })

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const addJob = (e) => {
    e.preventDefault()
    const skills = form.skills.split(',').map(s => s.trim()).filter(Boolean)
    setJobs(prev => [...prev, { id:Date.now(), ...form, skills }])
    setForm({ title:'', company:'', location:'', type:'Full-time', skills:'' })
    // Later: axios.post('/api/jobs', payload)
  }

  return (
    <NavbarLayout>
      <h3>Employer Dashboard</h3>

      <Card className="p-3 mb-4 shadow-sm">
        <h5>Post a job</h5>
        <Form onSubmit={addJob}>
          <Row className="g-2">
            <Col md={6}><Form.Control name="title" placeholder="Job title" value={form.title} onChange={change} required /></Col>
            <Col md={6}><Form.Control name="company" placeholder="Company" value={form.company} onChange={change} required /></Col>
            <Col md={6}><Form.Control name="location" placeholder="Location" value={form.location} onChange={change} /></Col>
            <Col md={6}><Form.Select name="type" value={form.type} onChange={change}><option>Full-time</option><option>Part-time</option><option>Remote</option></Form.Select></Col>
            <Col md={12}><Form.Control name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={change} /></Col>
          </Row>
          <Button type="submit" className="mt-3">Publish</Button>
        </Form>
      </Card>

      <Card className="p-3 shadow-sm">
        <h5>Your Posted Jobs</h5>
        {jobs.length === 0 ? <p className="text-muted">No jobs posted yet.</p> : jobs.map(j => (
          <div key={j.id} className="border rounded p-2 mb-2">
            <strong>{j.title}</strong> — {j.company} • {j.location}
            <div className="small text-muted">Skills: {j.skills.join(', ')}</div>
          </div>
        ))}
      </Card>
    </NavbarLayout>
  )
}
