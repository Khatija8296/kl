
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function BusForm() {
    const [formData, setFormData] = useState({
        busName: '',
        busNo: '',
        capacity: '',
        busType: '',
        numberOfSeats: '',
        from: '',
        to: '',
        busRoute: '',
        busRouteTimes: '',
        departure: '',
        arrival: '',
        facilities: '',
        price: '',
        reviews: '',
        datesAvailable: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert busRoute and busRouteTimes to arrays
        const busRoute = formData.busRoute.split(',').map(route => route.trim());
        const busRouteTimes = formData.busRouteTimes.split(',').map(time => new Date(time.trim()));

        const updatedFormData = {
            ...formData,
            busRoute,
            busRouteTimes,
            facilities: formData.facilities.split(',').map(facility => facility.trim()),
            reviews: formData.reviews ? JSON.parse(formData.reviews) : [],
            datesAvailable: formData.datesAvailable.split(',').map(date => date.trim())
        };

        try {
            const response = await axios.post('http://localhost:3000/buses', updatedFormData);
            setMessage('Bus created successfully!');
            setError('');
            clearForm();
        } catch (error) {
            setMessage('');
            setError('Error creating bus. Please try again.');
        }
    };

    const clearForm = () => {
        setFormData({
            busName: '',
            busNo: '',
            capacity: '',
            busType: '',
            numberOfSeats: '',
            from: '',
            to: '',
            busRoute: '',
            busRouteTimes: '',
            departure: '',
            arrival: '',
            facilities: '',
            price: '',
            reviews: '',
            datesAvailable: ''
        });
    };

    return (
        <Container fluid>
            <h1>Create a New Bus</h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="busName">
                    <Form.Label>Bus Name</Form.Label>
                    <Form.Control type="text" name="busName" value={formData.busName} onChange={handleChange} placeholder="Enter bus name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busNo">
                    <Form.Label>Bus Number</Form.Label>
                    <Form.Control type="text" name="busNo" value={formData.busNo} onChange={handleChange} placeholder="Enter bus number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="capacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Enter capacity" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busType">
                    <Form.Label>Bus Type</Form.Label>
                    <Form.Control type="text" name="busType" value={formData.busType} onChange={handleChange} placeholder="Enter bus type" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfSeats">
                    <Form.Label>Number of Seats</Form.Label>
                    <Form.Control type="number" name="numberOfSeats" value={formData.numberOfSeats} onChange={handleChange} placeholder="Enter number of seats" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="from">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} placeholder="Enter starting location" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="to">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} placeholder="Enter destination" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busRoute">
                    <Form.Label>Bus Route</Form.Label>
                    <Form.Control type="text" name="busRoute" value={formData.busRoute} onChange={handleChange} placeholder="Enter bus route (comma separated)" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busRouteTimes">
                    <Form.Label>Bus Route Times</Form.Label>
                    <Form.Control type="text" name="busRouteTimes" value={formData.busRouteTimes} onChange={handleChange} placeholder="Enter bus route times (comma separated)" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="departure">
                    <Form.Label>Departure</Form.Label>
                    <Form.Control type="datetime-local" name="departure" value={formData.departure} onChange={handleChange} placeholder="Enter departure time" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="arrival">
                    <Form.Label>Arrival</Form.Label>
                    <Form.Control type="datetime-local" name="arrival" value={formData.arrival} onChange={handleChange} placeholder="Enter arrival time" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="facilities">
                    <Form.Label>Facilities</Form.Label>
                    <Form.Control type="text" name="facilities" value={formData.facilities} onChange={handleChange} placeholder="Enter facilities (comma separated)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="reviews">
                    <Form.Label>Reviews</Form.Label>
                    <Form.Control type="text" name="reviews" value={formData.reviews} onChange={handleChange} placeholder='Enter reviews as JSON (e.g., [{"user": "John", "rating": 4, "comment": "Good"}])' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="datesAvailable">
                    <Form.Label>Dates Available</Form.Label>
                    <Form.Control type="text" name="datesAvailable" value={formData.datesAvailable} onChange={handleChange} placeholder="Enter dates available (comma separated)" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Bus
                </Button>
            </Form>
        </Container>
    );
}

export default BusForm;
