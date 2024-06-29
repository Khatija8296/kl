
import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import CustomerList from './Components/Customer/CustomerList';
import CustomerForm from './Components/Customer/CustomerForm';
import CustomerEdit from './Components/Customer/CustomerEdit';
import CustomerDelete from './Components/Customer/CustomerDelete';
import ProductList from './Components/Products/ProductList';
import ProductForm from './Components/Products/ProductForm';
import ProductEdit from './Components/Products/ProductEdit';
import ProductDelete from './Components/Products/ProductDelete';
import BusDetails from './Components/BusInfo';
import Billing from './Components/Booking';
import BusSearch from './Components/BusFilter';

function Apps() {
  return (
   
    
        <div className="d-flex">
          <Navbar expand="lg"  variant="dark" className="flex-column" style={{ height: '100vh', position: 'fixed', left: 0 ,background:'#3973ac'}}>
            <Container fluid>
           
              <Navbar.Toggle aria-controls="navbarNavDropdown" />
              <Navbar.Collapse id="navbarNavDropdown">
                <Nav className="flex-column">
                  <h1 style={{color:'white'}}>SeatSync</h1>
                  <Link to="/" className="nav-link">Home</Link>
                  <Link to="/cart" className="nav-link">Billing</Link>
                  <Link to="/ProductList" className="nav-link">Buses</Link>
                  <Link to="/ProductForm" className="nav-link">Create Bus</Link>
                  <Link to="/CustomerList" className="nav-link">Customers</Link>
                  <Link to="/" className="nav-link">Analytics</Link>

                  <NavDropdown title="Products" id="navbarScrollingDropdown">
                    <Link to="/ProductList" className="dropdown-item">View Products</Link>
                    <Link to="/ProductForm" className="dropdown-item">Create a New Product</Link>
                    <Link to="/ProductEdit" className="dropdown-item">Edit / Update a Product</Link>
                    <Link to="/ProductDelete" className="dropdown-item">Delete a Product</Link>
                  </NavDropdown>
                  <NavDropdown title="Customers" id="navbarScrollingDropdown">
                    <Link to="/CustomerList" className="dropdown-item">View Customers</Link>
                    <Link to="/CustomerForm" className="dropdown-item">Create a New Customer</Link>
                    <Link to="/EditCustomer" className="dropdown-item">Edit / Update a Customer</Link>
                    <Link to="/DeleteCustomer" className="dropdown-item">Delete a Customer</Link>
                  </NavDropdown>
                </Nav>

                
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
            <Routes>
              <Route path="/" element={<BusSearch />} />
              <Route path="/CustomerList" element={<CustomerList />} />
              <Route path="/CustomerForm" element={<CustomerForm />} />
              <Route path="/EditCustomer" element={<CustomerEdit />} />
              <Route path="/DeleteCustomer" element={<CustomerDelete />} />
              <Route path="/ProductList" element={<ProductList />} />
              <Route path="/ProductForm" element={<ProductForm />} />
              <Route path="/ProductDelete" element={<ProductDelete />} />
              <Route path="/ProductEdit" element={<ProductEdit />} />
              <Route path="/bus-details" element={<BusDetails />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
    
   
  );
}

export default Apps;
