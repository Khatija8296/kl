import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Toast } from 'react-bootstrap';

function Update() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('');
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const [selectedUserPhone, setSelectedUserPhone] = useState('');
    const [selectedUserAddress, setSelectedUserAddress] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://capstone-project-qh3r.onrender.com/api/customers/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserSelectChange = async (e) => {
        const userId = e.target.value;
        setSelectedUserId(userId);

        try {
            const response = await axios.get(`https://capstone-project-qh3r.onrender.com/api/customers/${userId}`);
            const userData = response.data;
            setSelectedUserName(userData.name);
            setSelectedUserEmail(userData.email);
            setSelectedUserPhone(userData.phoneNumber);
            setSelectedUserAddress(userData.address);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!selectedUserId) {
            alert('Please select a user.');
            return;
        }

        try {
            await axios.put(`https://capstone-project-qh3r.onrender.com/api/customers/${selectedUserId}`, {
                name: selectedUserName,
                email: selectedUserEmail,
                phoneNumber: selectedUserPhone,
                address: selectedUserAddress
            });
            setShowToast(true);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Container fluid>
            <h1>Edit/Update a User</h1>
            <Form id="updateForm" onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="userId">
                    <Form.Label>Select User ID</Form.Label>
                    <Form.Control as="select" value={selectedUserId} onChange={handleUserSelectChange}>
                        <option value="">Select User ID</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>{user._id}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={selectedUserName} onChange={(e) => setSelectedUserName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={selectedUserEmail} onChange={(e) => setSelectedUserEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone number" value={selectedUserPhone} onChange={(e) => setSelectedUserPhone(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" value={selectedUserAddress} onChange={(e) => setSelectedUserAddress(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Update User</strong>
                        <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                    </Toast.Header>
                    <Toast.Body>User updated successfully!</Toast.Body>
                </Toast>
            </div>
        </Container>
    );
}

export default Update;
