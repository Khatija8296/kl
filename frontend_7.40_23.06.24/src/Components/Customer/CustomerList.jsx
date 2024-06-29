import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

function Read() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/register/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <>
      <Container fluid>
        <h1>Users</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              {/* <th>Name</th> */}
              <th>Email</th>
              <th>Phone Number</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.registerId}>
                <td>{user.registerId}</td>
                {/* <td>{user.userName ? userName : 'N/A'}</td> */}
                <td>{user.email ? user.email : 'N/A'}</td>
                <td>{user.phoneNumber ? user.phoneNumber : 'N/A'}</td>  
                <td>{user.age ? user.age : 'N/A'}</td>  
                <td>{user.gender ? user.gender : 'N/A'}</td>  
                <td>{user.createdAt ? user.createdAt : 'N/A'}</td>  
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Read;
