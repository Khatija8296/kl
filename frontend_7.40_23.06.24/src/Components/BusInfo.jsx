


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

const BusInfo = () => {
  const location = useLocation();
  const busId = location.state?.busId;
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [numPassengers, setNumPassengers] = useState(1);

  const fetchBusDetails = async (busId) => {
    try {
      const response = await axios.get(`${API_URL}/bus/${busId}`);
      setBus(response.data);
    } catch (error) {
      console.error('Error fetching bus details:', error);
    }
  };

  useEffect(() => {
    if (busId) {
      fetchBusDetails(busId);
    }
  }, [busId]);

  useEffect(() => {
    setNumPassengers(selectedSeats.length);
  }, [selectedSeats]);

  const handleSeatSelection = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const handleBooking = () => {
    const bookingDetails = {
      selectedSeats,
      bus,
      numPassengers,
    };

    navigate('/billing', { state: { bookingDetails } });
  };

  if (!bus) {
    return <div>No bus details available</div>;
  }

  const halfCapacity = Math.ceil(bus.capacity / 2);
  const lowerLeftCapacity = Math.ceil(halfCapacity / 2);
  const lowerRightCapacity = halfCapacity - lowerLeftCapacity;
  const upperLeftCapacity = Math.ceil((bus.capacity - halfCapacity) / 2);
  const upperRightCapacity = bus.capacity - halfCapacity - upperLeftCapacity;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="seat-selection-container">
            <h5 style={{color:'#007bff'}}>Select Seats - Lower Half Left</h5>
            <div className="seat-selection">
              {[...Array(lowerLeftCapacity).keys()].map((seat) => (
                <button
                  key={seat}
                  className={`btn seat-btn ${selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'}`}
                  onClick={() => handleSeatSelection(seat)}
                >
                  <FontAwesomeIcon icon={faChair} /> {seat + 1}
                </button>
              ))}
            </div>
          </div>
          <hr />
          <div className="seat-selection-container mt-3">
            <h5 style={{color:'#007bff'}}>Select Seats - Lower Half Right</h5>
            <div className="seat-selection">
              {[...Array(lowerRightCapacity).keys()].map((seat) => (
                <button
                  key={seat + lowerLeftCapacity}
                  className={`btn seat-btn ${selectedSeats.includes(seat + lowerLeftCapacity) ? 'btn-success' : 'btn-outline-primary'}`}
                  onClick={() => handleSeatSelection(seat + lowerLeftCapacity)}
                >
                  <FontAwesomeIcon icon={faChair} /> {seat + 1 + lowerLeftCapacity}
                </button>
              ))}
            </div>
          </div>
          <hr />
          <div className="seat-selection-container mt-3">
            <h5 style={{color:'#007bff'}} >Select Seats - Upper Half Left</h5>
            <div className="seat-selection">
              {[...Array(upperLeftCapacity).keys()].map((seat) => (
                <button
                  key={seat + halfCapacity}
                  className={`btn seat-btn ${selectedSeats.includes(seat + halfCapacity) ? 'btn-success' : 'btn-outline-primary'}`}
                  onClick={() => handleSeatSelection(seat + halfCapacity)}
                >
                  <FontAwesomeIcon icon={faChair} /> {seat + 1 + halfCapacity}
                </button>
              ))}
            </div>
          </div>
          <hr />
          <div className="seat-selection-container mt-3">
            <h5 style={{color:'#007bff'}}>Select Seats - Upper Half Right</h5>
            <div className="seat-selection">
              {[...Array(upperRightCapacity).keys()].map((seat) => (
                <button
                  key={seat + halfCapacity + upperLeftCapacity}
                  className={`btn seat-btn ${selectedSeats.includes(seat + halfCapacity + upperLeftCapacity) ? 'btn-success' : 'btn-outline-primary'}`}
                  onClick={() => handleSeatSelection(seat + halfCapacity + upperLeftCapacity)}
                >
                  <FontAwesomeIcon icon={faChair} /> {seat + 1 + halfCapacity + upperLeftCapacity}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6" style={{ borderLeftColor:'black' }} >
          <div className="card mb-4" style={{ borderLeftColor:'black' }}>
            <div className="card-body" style={{background: '#e6f7ff'}}>
              <h5 className="card-title">{bus.busName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
              <p className="card-text">{bus.from} - {bus.to}</p>
              <p className="card-text">{bus.busType}</p>
              <p className="card-text">Departure: {new Date(bus.departure).toLocaleString()}</p>
              <p className="card-text">Arrival: {new Date(bus.arrival).toLocaleString()}</p>
              <p className="card-text">Fare: ₹ {bus.price.toLocaleString()}</p>
              <p className="card-text">Remaining Capacity: {bus.capacity - selectedSeats.length}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="numPassengers" className="form-label">Number of Passengers</label>
                <input
                  type="number"
                  id="numPassengers"
                  className="form-control"
                  value={numPassengers}
                  readOnly
                  style={{background: '#e6f7ff'}}
                />
              </div>

              <button className="btn btn-primary" onClick={handleBooking}>Confirm Booking</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusInfo;
