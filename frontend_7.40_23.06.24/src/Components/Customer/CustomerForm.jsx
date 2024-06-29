import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Create() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address:''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            // For nested state, spread the current state of the nested object and update the specific property
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://capstone-project-qh3r.onrender.com/api/customers/', formData);
            setMessage('User created successfully!');
            setError('');
            clearForm();
        } catch (error) {
            setMessage('');
            setError('Error creating user. Please try again.');
        }
    };

    const clearForm = () => {
        setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            address:''
        });
    };

    return (
        <Container fluid>
            <h1>Create a New Customer</h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>PhoneNumber</Form.Label>
                    <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phoneNumber" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" />
                </Form.Group>

               

                <Button variant="primary" type="submit">
                    Create User
                </Button>
            </Form>
        </Container>
    );
}

export default Create;
