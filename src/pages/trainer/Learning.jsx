import { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import NavbarLayout from '../../components/NavbarLayout'

export default function Learning() {
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({ title:'', link:'' })

  const add = (e) => {
    e.preventDefault()
    setCourses(prev => [...prev, { id:Date.now(), ...form }])
    setForm({ title:'', link:'' })
  }

  return (
    <NavbarLayout>
      <h3>Learning Module</h3>

      <Card className="p-3 mb-4" style={{ maxWidth: 700 }}>
        <Form onSubmit={add}>
          <Form.Group className="mb-2">
            <Form.Control placeholder="Course title" value={form.title} onChange={e => setForm({...form, title:e.target.value})} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control placeholder="Material link (YouTube/Docs)" value={form.link} onChange={e => setForm({...form, link:e.target.value})} required />
          </Form.Group>
          <Button type="submit">Add Course</Button>
        </Form>
      </Card>

      <Card className="p-3">
        <h5>My Courses</h5>
        {courses.length === 0 && <p className="text-muted">No courses yet.</p>}
        {courses.map(c => (
          <div key={c.id} className="border rounded p-2 mb-2">
            <strong>{c.title}</strong><br />
            <a href={c.link} target="_blank" rel="noreferrer">{c.link}</a>
          </div>
        ))}
      </Card>
    </NavbarLayout>
  )
}
