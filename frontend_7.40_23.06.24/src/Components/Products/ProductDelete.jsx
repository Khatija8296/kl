import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Toast, Spinner } from 'react-bootstrap';

function ProductDelete() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('');
    const [selectedUserDescription, setSelectedUserDescription] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://capstone-project-qh3r.onrender.com/api/products/');
            setUsers(response.data);
        } catch (error) {
            setError('Error fetching users.');
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserSelectChange = async (e) => {
        const userId = e.target.value;
        setSelectedUserId(userId);

        if (userId !== 'manual') {
            try {
                const response = await axios.get(`https://capstone-project-qh3r.onrender.com/api/products/${userId}`);
                setSelectedUserName(response.data.name);
                setSelectedUserDescription(response.data.description);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        } else {
            setSelectedUserName('');
            setSelectedUserDescription('');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!selectedUserId) {
            alert('Please select a user.');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to delete the user?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://capstone-project-qh3r.onrender.com/api/products/${selectedUserId}`);
            setShowToast(true);
            setSelectedUserId('');
            setSelectedUserName('');
            setSelectedUserDescription('');
            // Remove the deleted user from the users array
            setUsers(users.filter(user => user.id !== parseInt(selectedUserId)));
        } catch (error) {
            console.error('Error deleting user:', error);
            // Display error message or handle it as needed
        }
    };

    return (
        <Container fluid>
            <h1>Delete a Product</h1>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="userId">
                        <Form.Control as="select" value={selectedUserId} onChange={handleUserSelectChange}>
                            <option value="">Select User ID</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.id}</option>
                            ))}
                            <option value="manual">Enter ID Manually</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={selectedUserName} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={selectedUserDescription} readOnly />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Delete
                    </Button>
                </Form>
            )}

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Delete User</strong>
                        <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                    </Toast.Header>
                    <Toast.Body>User deleted successfully!</Toast.Body>
                </Toast>
            </div>
        </Container>
    );
}

export default ProductDelete;
