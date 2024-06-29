import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ARSeatSelection = ({ busId }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/seat/seats/${busId}`);
        setSeats(response.data);
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };
    fetchSeats();
  }, [busId]);

  const handleSelectSeat = async (seatId) => {
    try {
      await axios.put(`http://localhost:3000/seat/seats/${seatId}/select`);
      setSelectedSeats([...selectedSeats, seatId]);
    } catch (error) {
      console.error('Error selecting seat:', error);
    }
  };

  const handleDeselectSeat = async (seatId) => {
    try {
      await axios.put(`http://localhost:3000/seat/seats/${seatId}/deselect`);
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } catch (error) {
      console.error('Error deselecting seat:', error);
    }
  };

  return (
    <a-scene>
      {seats.map((seat) => (
        <a-box
          key={seat.id}
          position={seat.position}
          color={selectedSeats.includes(seat.id) ? 'green' : 'red'}
          onClick={() => {
            selectedSeats.includes(seat.id) ? handleDeselectSeat(seat.id) : handleSelectSeat(seat.id);
          }}
        ></a-box>
      ))}
    </a-scene>
  );
};

export default ARSeatSelection;
