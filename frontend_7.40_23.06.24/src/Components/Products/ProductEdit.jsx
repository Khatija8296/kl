import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Toast } from 'react-bootstrap';

function Update() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('');
    const [selectedUserdescription, setSelectedUserdescription] = useState('');
    const [selectedUserprice, setSelectedUserprice] = useState('');
    const [selectedUserstockQuantity, setSelectedUserstockQuantity] = useState('');
    const [selectedUserimageUrl, setSelectedUserimageUrl] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://capstone-project-qh3r.onrender.com/api/products/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserSelectChange = async (e) => {
        const userId = e.target.value;
        setSelectedUserId(userId);

        try {
            const response = await axios.get(`https://capstone-project-qh3r.onrender.com/api/products/${userId}`);
            const userData = response.data;
            setSelectedUserName(userData.name);
            setSelectedUserdescription(userData.description);
            setSelectedUserprice(userData.price);
            setSelectedUserstockQuantity(userData.stockQuantity);
            setSelectedUserimageUrl(userData.imageUrl);
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
            await axios.put(`https://capstone-project-qh3r.onrender.com/api/products/${selectedUserId}`, {
                name: selectedUserName,
                description: selectedUserdescription,
                price: selectedUserprice,
                stockQuantity: selectedUserstockQuantity,
                imageUrl:selectedUserimageUrl
            });
            setShowToast(true);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Container fluid>
            <h1>Edit/Update a Product</h1>
            <Form id="updateForm" onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="userId">
                    <Form.Label>Select User ID</Form.Label>
                    <Form.Control as="select" value={selectedUserId} onChange={handleUserSelectChange}>
                        <option value="">Select User ID</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.id}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={selectedUserName} onChange={(e) => setSelectedUserName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description)" value={selectedUserdescription} onChange={(e) => setSelectedUserdescription(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter price" value={selectedUserprice} onChange={(e) => setSelectedUserprice(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="stockQuantity">
                    <Form.Label>StockQuantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter stockQuantity" value={selectedUserstockQuantity} onChange={(e) => setSelectedUserstockQuantity(e.target.value)} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="imageUrl">
                    <Form.Label>ImageUrl</Form.Label>
                    <Form.Control type="text" placeholder="Enter imageUrl" value={selectedUserimageUrl} onChange={(e) => setSelectedUserimageUrl(e.target.value)} />
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
