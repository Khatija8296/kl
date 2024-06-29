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
      const response = await axios.get('http://localhost:3000/bus');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <>
      <Container fluid>
        <h1>Products</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Bus Id</th>
              <th>Bus Name</th>
              <th>Bus Number</th>
              <th>Capacity</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {users.map(bus => (
              <tr key={bus.busId}>
                <td>{bus.busId}</td>
                <td>{bus.busName ? bus.busName : 'N/A'}</td>
                <td>{bus.busNumber ? bus.busNumber : 'N/A'}</td>
                <td>{bus.capacity ? bus.capacity : 'N/A'}</td>  
                <td>{bus.from ? bus.from : 'N/A'}</td>  
                <td>{bus.to ? bus.to : 'N/A'}</td>  
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Read;
