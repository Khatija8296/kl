

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // Import jspdf-autotable
// import '../App.css';

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount = 0,
//     GST = 0,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   // Calculate the cart total
//   const calculateCartTotal = () => {
//     const basePrice = bus?.price || 0;
//     const totalPrice = basePrice * (numPassengers || 0);
//     const discount = discountAmount;
//     const gstAmount = (totalPrice - discount) * 0.05; // Assuming GST is 5%
//     return totalPrice - discount + gstAmount;
//   };

//   const [cartTotal, setCartTotal] = useState(calculateCartTotal);

//   useEffect(() => {
//     setCartTotal(calculateCartTotal);
//   }, [bus, numPassengers, discountAmount, GST]);

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       bus_id: bus?.busId || 'N/A',
//       selected_seats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discount_amount: discountAmount || 0,
//       gst: GST || 0,
//       cart_total: cartTotal || 0,
//       route: bus ? `${bus.from} - ${bus.to}` : 'N/A',
//       bus_type: bus?.busType || 'N/A',
//       customer_name: customerDetails?.name || 'N/A'
//     };

//     try {
//       const response = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Booking confirmed:', data);
//         generatePDF(bookingData); // Call PDF generation function
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Booking error:', errorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();

//     doc.setFontSize(22);
//     doc.text('Seat Sync', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 60);
//     doc.text(`Bus Name: ${bus?.busName || 'N/A'}`, 20, 70);
//     doc.text(`Bus Number: ${bus?.busNumber || 'N/A'}`, 20, 80);
//     doc.text(`Route: ${bookingData.route}`, 20, 90);
//     doc.text(`Type: ${bus?.busType || 'N/A'}`, 20, 100);
//     doc.text(`Departure: ${bus ? new Date(bus.departure).toLocaleString() : 'N/A'}`, 20, 110);
//     doc.text(`Arrival: ${bus ? new Date(bus.arrival).toLocaleString() : 'N/A'}`, 20, 120);
//     doc.text(`Price: ₹ ${bus?.price ? bus.price.toLocaleString() : 'N/A'}`, 20, 130);
//     doc.text(`Selected Seats: ${bookingData.selected_seats.join(', ')}`, 20, 140);
//     doc.text(`Number of Passengers: ${bookingData.passenger_details.length}`, 20, 150);

//     // Passenger details table
//     doc.autoTable({
//       startY: 160,
//       head: [['Passenger', 'Name', 'Age', 'Gender']],
//       body: bookingData.passenger_details.map((passenger, index) => [
//         `Passenger ${index + 1}`,
//         passenger.name,
//         passenger.age,
//         passenger.gender
//       ]),
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
//       }
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discount_amount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.gst.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cart_total.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`JourneyJet_Invoice_${bookingData.customer_name.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container">
//       <h2>Booking Confirmation</h2>
//       <hr />
//       {customerDetails && (
//         <div>
//           <h4>Customer Name: {customerDetails.name}</h4>
//           <p>Phone Number: {customerDetails.phoneNumber}</p>
//           <p>Email: {customerDetails.email}</p>
//           <p>Address: {customerDetails.address}</p>
//         </div>
//       )}
//       <hr />
//       {bus && (
//         <div>
//           <h3>Bus Details:</h3>
//           <p><strong>Bus Name:</strong> {bus.busName}</p>
//           <p><strong>Bus Number:</strong> {bus.busNumber}</p>
//           <p><strong>Route:</strong> {bus.from} - {bus.to}</p>
//           <p><strong>Type:</strong> {bus.busType}</p>
//           <p><strong>Departure:</strong> {new Date(bus.departure).toLocaleString()}</p>
//           <p><strong>Arrival:</strong> {new Date(bus.arrival).toLocaleString()}</p>
//           <p><strong>Price:</strong> ₹ {bus.price.toLocaleString()}</p>
//           <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
//           <p><strong>Number of Passengers:</strong> {numPassengers}</p>
//         </div>
//       )}
//       <hr />
//       <div>
//         <h3>Passenger Details:</h3>
//         {passengerDetails.map((passenger, index) => (
//           <div key={index} className="passenger-form">
//             <h4>Passenger {index + 1}</h4>
//             <div className="form-group">
//               <label htmlFor={`name-${index}`}>Name</label>
//               <input
//                 type="text"
//                 id={`name-${index}`}
//                 className="form-control"
//                 value={passenger.name}
//                 onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor={`age-${index}`}>Age</label>
//               <input
//                 type="number"
//                 id={`age-${index}`}
//                 className="form-control"
//                 value={passenger.age}
//                 onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor={`gender-${index}`}>Gender</label>
//               <select
//                 id={`gender-${index}`}
//                 className="form-control"
//                 value={passenger.gender}
//                 onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <hr />
//           </div>
//         ))}
//       </div>
//       <div className="totals">
       
//         <h2>Total: ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</h2>
//       </div>
//       <button className="btn btn-primary" onClick={handleConfirmBooking}>
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default Booking;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // Import jspdf-autotable
// import '../App.css';

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount = 0,
//     GST = 0,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const calculateCartTotal = () => {
//     const basePrice = bus?.price || 0;
//     const totalPrice = basePrice * (numPassengers || 0);
//     const discount = discountAmount;
//     const gstAmount = (totalPrice - discount) * 0.05; // Assuming GST is 5%
//     return totalPrice - discount + gstAmount;
//   };

//   const [cartTotal, setCartTotal] = useState(calculateCartTotal);

//   useEffect(() => {
//     setCartTotal(calculateCartTotal);
//   }, [bus, numPassengers, discountAmount, GST]);

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       bus_id: bus?.busId || 'N/A',
//       selected_seats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discount_amount: discountAmount || 0,
//       gst: GST || 0,
//       cart_total: cartTotal || 0,
//       route: bus ? `${bus.from} - ${bus.to}` : 'N/A',
//       bus_type: bus?.busType || 'N/A',
//       customer_name: customerDetails?.name || 'N/A'
//     };

//     try {
//       const response = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Booking confirmed:', data);
//         generatePDF(bookingData); // Call PDF generation function
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Booking error:', errorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();

//     doc.setFontSize(22);
//     doc.text('Seat Sync', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     doc.text('Bus Details:', 20, 60);
//     doc.text(`Bus Name: ${bus?.busName || 'N/A'}`, 20, 70);
//     doc.text(`Bus Number: ${bus?.busNumber || 'N/A'}`, 20, 80);
//     doc.text(`Route: ${bookingData.route}`, 20, 90);
//     doc.text(`Type: ${bus?.busType || 'N/A'}`, 20, 100);
//     doc.text(`Departure: ${bus ? new Date(bus.departure).toLocaleString() : 'N/A'}`, 20, 110);
//     doc.text(`Arrival: ${bus ? new Date(bus.arrival).toLocaleString() : 'N/A'}`, 20, 120);
//     doc.text(`Price: ₹ ${bus?.price ? bus.price.toLocaleString() : 'N/A'}`, 20, 130);
//     doc.text(`Selected Seats: ${bookingData.selected_seats.join(', ')}`, 20, 140);
//     doc.text(`Number of Passengers: ${bookingData.passenger_details.length}`, 20, 150);

//     doc.autoTable({
//       startY: 160,
//       head: [['Passenger', 'Name', 'Age', 'Gender']],
//       body: bookingData.passenger_details.map((passenger, index) => [
//         `Passenger ${index + 1}`,
//         passenger.name,
//         passenger.age,
//         passenger.gender
//       ]),
//       didDrawPage: (data) => {
//         doc.setFontSize(12);
//         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
//       }
//     });

//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discount_amount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.gst.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cart_total.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     doc.save(`JourneyJet_Invoice_${bookingData.customer_name.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container">
//       <h2>Booking Confirmation</h2>
//       <hr />
//       {customerDetails && (
//         <div>
//           <h4>Customer Name: {customerDetails.name}</h4>
//           <p>Phone Number: {customerDetails.phoneNumber}</p>
//           <p>Email: {customerDetails.email}</p>
//           <p>Address: {customerDetails.address}</p>
//         </div>
//       )}
//       <hr />
//       {bus && (
//         <div className="bus-details">
//           <h3>Bus Details:</h3>
//           <p><strong>Bus Name:</strong> {bus.busName}</p>
//           <p><strong>Bus Number:</strong> {bus.busNumber}</p>
//           <p><strong>Route:</strong> {bus.from} - {bus.to}</p>
//           <p><strong>Type:</strong> {bus.busType}</p>
//           <p><strong>Departure:</strong> {new Date(bus.departure).toLocaleString()}</p>
//           <p><strong>Arrival:</strong> {new Date(bus.arrival).toLocaleString()}</p>
//           <p><strong>Price:</strong> ₹ {bus.price.toLocaleString()}</p>
//           <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
//           <p><strong>Number of Passengers:</strong> {numPassengers}</p>
//         </div>
//       )}
//       <hr />
//       <div>
//         <h3>Passenger Details:</h3>
//         {passengerDetails.map((passenger, index) => (
//           <div key={index} className="passenger-form">
//             <h4>Passenger {index + 1}</h4>
//             <div className="form-group">
//               <label htmlFor={`name-${index}`}>Name</label>
//               <input
//                 type="text"
//                 id={`name-${index}`}
//                 className="form-control"
//                 value={passenger.name}
//                 onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor={`age-${index}`}>Age</label>
//               <input
//                 type="number"
//                 id={`age-${index}`}
//                 className="form-control"
//                 value={passenger.age}
//                 onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor={`gender-${index}`}>Gender</label>
//               <select
//                 id={`gender-${index}`}
//                 className="form-control"
//                 value={passenger.gender}
//                 onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <hr />
//           </div>
//         ))}
//       </div>
//       <div className="totals">
//         <h2>Total: ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</h2>
//       </div>
//       <button className="btn btn-primary" onClick={handleConfirmBooking}>
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default Booking;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jspdf-autotable
import '../App.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails, customerDetails } = location.state || {};

  const {
    selectedSeats,
    bus,
    numPassengers,
    discountAmount = 0,
    GST = 0,
  } = bookingDetails || {};

  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
  );

  const calculateCartTotal = () => {
    const basePrice = bus?.price || 0;
    const totalPrice = basePrice * (numPassengers || 0);
    const discount = discountAmount;
    const gstAmount = (totalPrice - discount) * 0.05; // Assuming GST is 5%
    return totalPrice - discount + gstAmount;
  };

  const [cartTotal, setCartTotal] = useState(calculateCartTotal);

  useEffect(() => {
    setCartTotal(calculateCartTotal);
  }, [bus, numPassengers, discountAmount, GST]);

  const handlePassengerChange = (index, field, value) => {
    const updatedDetails = passengerDetails.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengerDetails(updatedDetails);
  };

  const validatePassengerDetails = () => {
    for (const passenger of passengerDetails) {
      if (!passenger.name || !passenger.age || !passenger.gender) {
        return false;
      }
    }
    return true;
  };

  const handleConfirmBooking = async () => {
    if (!validatePassengerDetails()) {
      alert('Please fill in all passenger details.');
      return;
    }

    const bookingData = {
      bus_id: bus?.busId || 'N/A',
      selected_seats: selectedSeats || [],
      passenger_details: passengerDetails,
      discount_amount: discountAmount || 0,
      gst: GST || 0,
      cart_total: cartTotal || 0,
      route: bus ? `${bus.from} - ${bus.to}` : 'N/A',
      bus_type: bus?.busType || 'N/A',
      customer_name: customerDetails?.name || 'N/A'
    };

    try {
      const response = await fetch('http://localhost:3000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Booking confirmed:', data);
        generatePDF(bookingData); // Call PDF generation function
        alert('Booking confirmed successfully!');
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Booking error:', errorData);
        alert('Failed to confirm booking. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while confirming the booking. Please try again.');
    }
  };

  const generatePDF = (bookingData) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Seat Sync', 105, 20, 'center');
    doc.setFontSize(18);
    doc.text('Invoice', 105, 35, 'center');

    doc.text('Bus Details:', 20, 60);
    doc.text(`Bus Name: ${bus?.busName || 'N/A'}`, 20, 70);
    doc.text(`Bus Number: ${bus?.busNumber || 'N/A'}`, 20, 80);
    doc.text(`Route: ${bookingData.route}`, 20, 90);
    doc.text(`Type: ${bus?.busType || 'N/A'}`, 20, 100);
    doc.text(`Departure: ${bus ? new Date(bus.departure).toLocaleString() : 'N/A'}`, 20, 110);
    doc.text(`Arrival: ${bus ? new Date(bus.arrival).toLocaleString() : 'N/A'}`, 20, 120);
    doc.text(`Price: ₹ ${bus?.price ? bus.price.toLocaleString() : 'N/A'}`, 20, 130);
    doc.text(`Selected Seats: ${bookingData.selected_seats.join(', ')}`, 20, 140);
    doc.text(`Number of Passengers: ${bookingData.passenger_details.length}`, 20, 150);

    doc.autoTable({
      startY: 160,
      head: [['Passenger', 'Name', 'Age', 'Gender']],
      body: bookingData.passenger_details.map((passenger, index) => [
        `Passenger ${index + 1}`,
        passenger.name,
        passenger.age,
        passenger.gender
      ]),
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
      }
    });

    doc.setFontSize(16);
    doc.text(`Discount: ₹ ${bookingData.discount_amount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
    doc.text(`GST (5%): ₹ ${bookingData.gst.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
    doc.text(`Total: ₹ ${bookingData.cart_total.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

    doc.save(`JourneyJet_Invoice_${bookingData.customer_name.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <div className="container">
      <h2>Booking Confirmation</h2>
      <hr />
      {customerDetails && (
        <div>
          <h4>Customer Name: {customerDetails.name}</h4>
          <p>Phone Number: {customerDetails.phoneNumber}</p>
          <p>Email: {customerDetails.email}</p>
          <p>Address: {customerDetails.address}</p>
        </div>
      )}
      <hr />
      {bus && (
        <div className="bus-details">
          <h3>Bus Details:</h3>
          <table className="bus-table">
            <tbody>
              <tr>
                <td><strong>Bus Name:</strong></td>
                <td>{bus.busName}</td>
              </tr>
              <tr>
                <td><strong>Bus Number:</strong></td>
                <td>{bus.busNumber}</td>
              </tr>
              <tr>
                <td><strong>Route:</strong></td>
                <td>{bus.from} - {bus.to}</td>
              </tr>
              <tr>
                <td><strong>Type:</strong></td>
                <td>{bus.busType}</td>
              </tr>
              <tr>
                <td><strong>Departure:</strong></td>
                <td>{new Date(bus.departure).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Arrival:</strong></td>
                <td>{new Date(bus.arrival).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Price:</strong></td>
                <td>₹ {bus.price.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Selected Seats:</strong></td>
                <td>{selectedSeats.join(', ')}</td>
              </tr>
              <tr>
                <td><strong>Number of Passengers:</strong></td>
                <td>{numPassengers}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <hr />
      <div>
        <h3>Passenger Details:</h3>
        {passengerDetails.map((passenger, index) => (
          <div key={index} className="passenger-form">
            <h4>Passenger {index + 1}</h4>
            <div className="form-group">
              <label htmlFor={`name-${index}`}>Name</label>
              <input
                type="text"
                id={`name-${index}`}
                className="form-control"
                value={passenger.name}
                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`age-${index}`}>Age</label>
              <input
                type="number"
                id={`age-${index}`}
                className="form-control"
                value={passenger.age}
                onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`gender-${index}`}>Gender</label>
              <select
                id={`gender-${index}`}
                className="form-control"
                value={passenger.gender}
                onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="totals">
        <h4>Discount: ₹ {discountAmount.toLocaleString()}</h4>
        <h4>GST (5%): ₹ {GST.toLocaleString()}</h4>
        <h4>Total: ₹ {cartTotal.toLocaleString()}</h4>
      </div>
      <button className="btn btn-primary" onClick={handleConfirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
