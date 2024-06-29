

import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import Booking from './Components/Booking';
import BusDetails from './Components/BusInfo';
import Billing from './Components/Booking'; // Correcting the component import
import BusSearch from './Components/BusFilter';
import Profile from './Components/Profile';


function App2() {
  return (

      <div className="d-flex">
        <Navbar expand="lg" variant="dark" className="flex-column" style={{width:'180px', height: '100vh', position: 'fixed', left: 0, background: '#3973ac' }}>
          <Container fluid>
           
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav className="flex-column">
                <Button variant="outline-light" as={Link} to="/profile" className="mb-3">
                  <FaUser style={{ marginRight: '5px' }} />
                  Account
                </Button>
                <Navbar.Brand href="#">  SeatSync  </Navbar.Brand>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/bus-details" className="nav-link">Bus Details</Link>
                <Link to="/billing" className="nav-link">Billing Details</Link>
                <Link to="/booking" className="nav-link">Booking</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="flex-grow-1" style={{ marginLeft: '150px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<BusSearch />} />
            <Route path="/bus-details" element={<BusDetails />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
   
  );
}

export default App2;
