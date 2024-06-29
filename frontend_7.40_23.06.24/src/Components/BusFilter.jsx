

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './BusSearch.css';

// const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// const BusFilter = () => {
//   const [pickup, setPickup] = useState('');
//   const [dropoff, setDropoff] = useState('');
//   const [date, setDate] = useState('');
//   const [buses, setBuses] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [noBusesFound, setNoBusesFound] = useState(false);

//   const navigate = useNavigate();

//   const fetchAllBuses = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`${API_URL}/bus`);
//       setBuses(response.data);
//     } catch (error) {
//       setError('Error fetching bus data. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllBuses();
//   }, []);

//   const handleSearch = async () => {
//     setIsLoading(true);
//     setError(null);
//     setNoBusesFound(false);

//     try {
//       const response = await axios.get(`${API_URL}/bus`, {
//         params: { from: pickup, to: dropoff, datesAvailable: datesAvailable.date }
//       });

//       if (response.data.length === 0) {
//         setNoBusesFound(true);
//       } else {
//         setBuses(response.data);
//       }
//     } catch (error) {
//       setError('Error fetching bus data. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBookNow = (busId) => {
//     navigate('/bus-details', { state: { busId } });
//   };

//   return (
//     <div className="bus-search-container" style={{background: ' #e6f7ff'}}>
//       <div className="hero-section text-center py-5" style={{background: '#b3d9ff'}}>
//         <h1 className="display-4">Discover Your Ideal Bus</h1>
//         <p className="lead">Search and book buses with ease</p>
//       </div>

//       <div className="search-form-container shadow p-4 mb-5 bg-white rounded">
//         <div className="row">
//           <div className="col-md-3 mb-3">
//             <label htmlFor="pickup" className="form-label">Pick Up</label>
//             <input
//               type="text"
//               id="pickup"
//               className="form-control"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//               placeholder="Enter pickup location"
//             />
//           </div>
//           <div className="col-md-3 mb-3">
//             <label htmlFor="dropoff" className="form-label">Drop Off</label>
//             <input
//               type="text"
//               id="dropoff"
//               className="form-control"
//               value={dropoff}
//               onChange={(e) => setDropoff(e.target.value)}
//               placeholder="Enter drop off location"
//             />
//           </div>
//           <div className="col-md-3 mb-3">
//             <label htmlFor="datepicker" className="form-label">Select Date</label>
//             <input
//               type="date"
//               id="datepicker"
//               className="form-control"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>
//           <div className="col-md-3 mb-3 d-flex align-items-end" >
//             <button
//               type="button"
//               onClick={handleSearch}
//               disabled={isLoading}
//               className="btn  w-100"
//               style={{background: '#1aa3ff',color:'white'}}
//             >
//               {isLoading ? 'Searching...' : 'Search'}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="results-container">
//         {error && <div className="alert alert-danger">{error}</div>}

//         {noBusesFound && <div className="alert alert-warning">No buses available for the selected criteria.</div>}

//         <div className="row">
//           {buses.length > 0 ? (
//             buses.map(bus => (
//               <div key={bus.busId} className="col-md-12 mb-4">
//                 <div className="card h-100 shadow-sm hover-zoom">
//                   <div className="card-body d-flex flex-column">
//                     <div className="mb-3">
//                       <h5 className="card-title">{bus.busName}</h5>
//                       <h6 className="card-subtitle mb-2 text-muted">{bus.busNo}</h6>
//                     </div>

//                     <div className="mb-3">
//                       <p className="card-text">{bus.from} - {bus.to}</p>
//                       <p className="card-text">{bus.busType}</p>
//                     </div>

//                     <div className="mb-3 d-flex justify-content-between">
//                       <small className="text-muted">Departure: {new Date(bus.departure).toLocaleString()}</small>
//                       <small className="text-muted">Arrival: {new Date(bus.arrival).toLocaleString()}</small>
//                     </div>

//                     <div className="mt-auto d-flex justify-content-between align-items-center" style={{alignItemsl:'left'}}>
//                       <p className="mb-0">Price: ₹ {bus.price}</p>
//                       <button className="btn btn-primary" onClick={() => handleBookNow(bus.busId)}>Book Now</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             !isLoading && (
//               <div className="col text-center">
//                 <p>No buses found. Please try different search criteria.</p>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusFilter;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BusSearch.css';

const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

const BusFilter = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noBusesFound, setNoBusesFound] = useState(false);

  const navigate = useNavigate();

  const fetchAllBuses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/bus`);
      setBuses(response.data);
    } catch (error) {
      setError('Error fetching bus data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBuses();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setNoBusesFound(false);

    try {
      const response = await axios.get(`${API_URL}/bus`, {
        params: { from: pickup, to: dropoff, datesAvailable: date }
      });

      if (response.data.length === 0) {
        setNoBusesFound(true);
      } else {
        setBuses(response.data);
      }
    } catch (error) {
      setError('Error fetching bus data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = (busId) => {
    navigate('/bus-details', { state: { busId } });
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="bus-search-container" style={{ background: ' #e6f7ff' }}>
      <div className="hero-section text-center py-5" style={{ background: '#b3d9ff' }}>
        <h1 className="display-4">Discover Your Ideal Bus</h1>
        <p className="lead">Search and book buses with ease</p>
      </div>

      <div className="search-form-container shadow p-4 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="pickup" className="form-label">Pick Up</label>
            <input
              type="text"
              id="pickup"
              className="form-control"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="dropoff" className="form-label">Drop Off</label>
            <input
              type="text"
              id="dropoff"
              className="form-control"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Enter drop off location"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="datepicker" className="form-label">Select Date</label>
            <input
              type="date"
              id="datepicker"
              className="form-control"
              value={date}
              min={getTodayDate()}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3 d-flex align-items-end">
            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading}
              className="btn  w-100"
              style={{ background: '#1aa3ff', color: 'white' }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      <div className="results-container">
        {error && <div className="alert alert-danger">{error}</div>}

        {noBusesFound && <div className="alert alert-warning">No buses available for the selected criteria.</div>}

        <div className="row">
          {buses.length > 0 ? (
            buses.map(bus => (
              <div key={bus.busId} className="col-md-12 mb-4">
                <div className="card h-100 shadow-sm hover-zoom">
                  <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                      <h5 className="card-title">{bus.busName}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{bus.busNo}</h6>
                    </div>

                    <div className="mb-3">
                      <p className="card-text">{bus.from} - {bus.to}</p>
                      <p className="card-text">{bus.busType}</p>
                    </div>

                    <div className="mb-3 d-flex justify-content-between">
                      <small className="text-muted">Departure: {new Date(bus.departure).toLocaleString()}</small>
                      <small className="text-muted">Arrival: {new Date(bus.arrival).toLocaleString()}</small>
                    </div>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <p className="mb-0">Price: ₹ {bus.price}</p>
                      <button className="btn btn-primary" onClick={() => handleBookNow(bus.busId)}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !isLoading && (
              <div className="col text-center">
                <p>No buses found. Please try different search criteria.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BusFilter;
