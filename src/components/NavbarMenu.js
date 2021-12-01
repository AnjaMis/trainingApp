import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Customer from './Customer'
import Trainings from './Trainings'
import Calendar from './Calendar'
import Statistics from './Statistics'

function NavbarMenu() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Personal Trainer</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to={'/customers'}>
                Customers
              </Nav.Link>
              <Nav.Link as={Link} to={'/trainings'}>
                Trainings
              </Nav.Link>
              <Nav.Link as={Link} to={'/calendar'}>
                Calendar
              </Nav.Link>
              <Nav.Link as={Link} to={'/statistics'}>
                Statistics
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br />
      </div>
      <div>
        <Routes>
          <Route exact path="/" element={<Customer />}></Route>
          <Route path="/customers" element={<Customer />}></Route>
          <Route path="/trainings" element={<Trainings />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/statistics" element={<Statistics />}></Route>
          <Route render={() => <h1>Page not found</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default NavbarMenu
