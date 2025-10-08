import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { SunFill, MoonFill } from 'react-bootstrap-icons'
import './NavbarLayout.css' // import custom styles

export default function NavbarLayout({ children }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Navbar
        expand="lg"
        variant={theme}
        style={{
          backgroundColor: theme === 'light' ? 'skyblue' : '#212529', // skyblue for light, dark gray for dark
          transition: 'background-color 0.3s ease-in-out',
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold' }}>
            FutureEdge
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className={theme === 'light' ? 'light-nav' : 'dark-nav'}>
              <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
              <Nav.Link as={Link} to="/employer/dashboard">Employer</Nav.Link>
              <Nav.Link as={Link} to="/trainer/learning">Learning</Nav.Link>
              {/* New Links */}
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
            <Button
              variant={theme === 'light' ? 'outline-dark' : 'outline-light'}
              onClick={toggleTheme}
              className="ms-3"
            >
              {theme === 'light' ? <MoonFill /> : <SunFill />}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">{children}</Container>
    </>
  )
}
