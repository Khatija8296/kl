


// const { Booking } = require('../db/bookingModel');
// const { Op } = require('sequelize');

// // Create a new booking
// const createBooking = async (req, res) => {
//   const {
//     customer_name,
//     phone_number,
//     email,
//     address,
//     bus_id,
//     selected_seats,
//     passenger_details,
//     discount_amount,
//     gst,
//     cart_total,
//     route,
//     bus_type
//   } = req.body;

//   try {
//     // Create the booking record
//     const newBooking = await Booking.create({
//       customer_name,
//       phone_number,
//       email,
//       address,
//       bus_id,
//       selected_seats,
//       passenger_details,
//       discount_amount,
//       gst,
//       cart_total,
//       route,
//       bus_type
//     });

//     // Send success response with the created booking
//     res.status(201).json(newBooking);
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ error: 'Failed to create booking' });
//   }
// };

// // Get all bookings or search by query parameters
// const getAllBookings = async (req, res) => {
//   try {
//     let bookings = await Booking.findAll();
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ error: 'Failed to fetch bookings' });
//   }
// };

// // Get a single booking by ID
// const getBookingById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const booking = await Booking.findByPk(id);
//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     console.error('Error fetching booking by ID:', error);
//     res.status(500).json({ error: 'Failed to fetch booking' });
//   }
// };

// module.exports = {
//   createBooking,
//   getAllBookings,
//   getBookingById
// };




// const { Booking } = require('../db/bookingModel');
// const { Passenger } = require('../db/passenger');
// const { Ticket } = require('../db/ticket');
// const { BookingDetails } = require('../db/bookingDetails');


// // Create a new booking
// const createBooking = async (req, res) => {
//   const {
//     customer_name,
//     phone_number,
//     email,
//     address,
//     bus_id,
//     selected_seats,
//     passenger_details,
//     discount_amount,
//     gst,
//     cart_total,
//     route,
//     bus_type
//   } = req.body;

//   try {
//     // Create the booking record
//     const newBooking = await Booking.create({
//       customerName: customer_name,
//       phoneNumber: phone_number,
//       email,
//       address,
//       busId: bus_id,
//       selectedSeats: selected_seats,
//       BookingDetails: {
//         discountAmount: discount_amount,
//         gst,
//         cartTotal: cart_total,
//         route,
//         busType: bus_type
//       },
//       Passengers: passenger_details.map(passenger => ({
//         name: passenger.name,
//         age: passenger.age,
//         gender: passenger.gender
//       })),
//       Tickets: selected_seats.map(seat => ({
//         seatNumber: seat,
//         fare: calculateFareForSeat(seat) // You need to implement this function
//       }))
//     }, {
//       include: [Passenger, Ticket, BookingDetails]
//     });

//     // Send success response with the created booking
//     res.status(201).json(newBooking);
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ error: 'Failed to create booking' });
//   }
// };

// // Get all bookings or search by query parameters
// const getAllBookings = async (req, res) => {
//   try {
//     let bookings = await Booking.findAll({
//       include: [Passenger, Ticket, BookingDetails]
//     });
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ error: 'Failed to fetch bookings' });
//   }
// };

// // Get a single booking by ID
// const getBookingById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const booking = await Booking.findByPk(id, {
//       include: [Passenger, Ticket, BookingDetails]
//     });
//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     console.error('Error fetching booking by ID:', error);
//     res.status(500).json({ error: 'Failed to fetch booking' });
//   }
// };

// module.exports = {
//   createBooking,
//   getAllBookings,
//   getBookingById
// };


// const { Booking } = require('../db/bookingModel');
// const { Passenger } = require('../db/passenger');
// const { Ticket } = require('../db/ticket');
// const { BookingDetails } = require('../db/bookingDetails');
// const { Op } = require('sequelize');

// // Create a new booking
// const createBooking = async (req, res) => {
//   const {
//     customer_name,
//     phone_number,
//     email,
//     address,
//     bus_id,
//     selected_seats,
//     passenger_details,
//     discount_amount,
//     gst,
//     cart_total,
//     route,
//     bus_type
//   } = req.body;

//   try {
//     // Create the booking record with associations
//     const newBooking = await Booking.create({
//       customerName: customer_name,
//       phoneNumber: phone_number,
//       email,
//       address,
//       busId: bus_id,
//       selectedSeats: selected_seats,
//       BookingDetails: {
//         discountAmount: discount_amount,
//         gst,
//         cartTotal: cart_total,
//         route,
//         busType: bus_type
//       },
//       Passengers: passenger_details.map(passenger => ({
//         name: passenger.name,
//         age: passenger.age,
//         gender: passenger.gender
//       })),
//       Tickets: selected_seats.map(seat => ({
//         seatNumber: seat,
//         fare: calculateFareForSeat(seat) // Implement this function as needed
//       }))
//     }, {
//       include: [Passenger, Ticket, BookingDetails]
//     });

//     res.status(201).json(newBooking);
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ error: 'Failed to create booking' });
//   }
// };

// // Get all bookings or search by query parameters
// const getAllBookings = async (req, res) => {
//   try {
//     let bookings = await Booking.findAll({
//       include: [Passenger, Ticket, BookingDetails]
//     });
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ error: 'Failed to fetch bookings' });
//   }
// };

// // Get a single booking by ID
// const getBookingById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const booking = await Booking.findByPk(id, {
//       include: [Passenger, Ticket, BookingDetails]
//     });
//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     console.error('Error fetching booking by ID:', error);
//     res.status(500).json({ error: 'Failed to fetch booking' });
//   }
// };

// module.exports = {
//   createBooking,
//   getAllBookings,
//   getBookingById
// };

// const { Booking, Passenger, Ticket, BookingDetails } = require('../db/associations');
// const { Op } = require('sequelize');

// // Function to calculate fare for a seat (implement as needed)
// const calculateFareForSeat = (seat) => {
//   // Dummy implementation, replace with actual logic
//   return 100.00;
// };

// // Create a new booking
// const createBooking = async (req, res) => {
//   const {
//     customer_name,
//     phone_number,
//     email,
//     address,
//     bus_id,
//     selected_seats,
//     passenger_details,
//     discount_amount,
//     gst,
//     cart_total,
//     route,
//     bus_type
//   } = req.body;

//   try {
//     // Create the booking record with associations
//     const newBooking = await Booking.create({
//       customerName: customer_name,
//       phoneNumber: phone_number,
//       email,
//       address,
//       busId: bus_id,
//       selectedSeats: selected_seats,
//       BookingDetails: {
//         discountAmount: discount_amount,
//         gst,
//         cartTotal: cart_total,
//         route,
//         busType: bus_type
//       },
//       Passengers: passenger_details.map(passenger => ({
//         name: passenger.name,
//         age: passenger.age,
//         gender: passenger.gender
//       })),
//       Tickets: selected_seats.map(seat => ({
//         seatNumber: seat,
//         fare: calculateFareForSeat(seat)
//       }))
//     }, {
//       include: [Passenger, Ticket, BookingDetails]
//     });

//     res.status(201).json(newBooking);
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ error: 'Failed to create booking' });
//   }
// };

// // Get all bookings or search by query parameters
// const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.findAll({
//       include: [Passenger, Ticket, BookingDetails]
//     });
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ error: 'Failed to fetch bookings' });
//   }
// };

// // Get a single booking by ID
// const getBookingById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const booking = await Booking.findByPk(id, {
//       include: [Passenger, Ticket, BookingDetails]
//     });
//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     console.error('Error fetching booking by ID:', error);
//     res.status(500).json({ error: 'Failed to fetch booking' });
//   }
// };

// module.exports = {
//   createBooking,
//   getAllBookings,
//   getBookingById
// };

// const { Booking } = require('../db/bookingModel');
// const { Passenger } = require('../db/passenger');

// // Function to create a new booking
// const createBooking = async (req, res) => {
//   const bookingData = req.body; // Assuming the request body contains all necessary booking data

//   try {
//     // Create the booking record in the database
//     const booking = await Booking.create(bookingData);

//     // Create passenger records associated with the booking
//     const passengerDetails = bookingData.passenger_details;
//     const passengerRecords = passengerDetails.map(passenger => ({
//       bookingId: booking.id,
//       name: passenger.name,
//       age: passenger.age,
//       gender: passenger.gender
//     }));

//     await Passenger.bulkCreate(passengerRecords);

//     // Return success response
//     res.status(201).json({ message: 'Booking created successfully', bookingId: booking.id });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to create booking. Please try again.' });
//   }
// };

// // Function to get all bookings
// const getAllBookings = async (req, res) => {
//   try {
//     // Fetch all bookings
//     const bookings = await Booking.findAll({
//       include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with each booking
//     });

//     // Return bookings
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to fetch bookings. Please try again.' });
//   }
// };

// // Function to get a booking by ID
// const getBookingById = async (req, res) => {
//   const bookingId = req.params.id;

//   try {
//     // Fetch the booking by ID
//     const booking = await Booking.findByPk(bookingId, {
//       include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with the booking
//     });

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found.' });
//     }

//     // Return the booking
//     res.status(200).json(booking);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to fetch booking. Please try again.' });
//   }
// };

// module.exports = {
//   createBooking,
//   getAllBookings,
//   getBookingById,
// };

// const { Booking } = require('../db/bookingModel');
// const { Passenger } = require('../db/passenger'); // Corrected import path

// // Function to create a new booking
// const createBooking = async (req, res) => {
//   const bookingData = req.body; // Assuming the request body contains all necessary booking data

//   try {
//     // Create the booking record in the database
//     const booking = await Booking.create(bookingData);

//     // Create passenger records associated with the booking
//     const passengerDetails = bookingData.passenger_details;
//     const passengerRecords = passengerDetails.map(passenger => ({
//       bookingId: booking.id,
//       name: passenger.name,
//       age: passenger.age,
//       gender: passenger.gender
//     }));


//     await Passenger.bulkCreate(passengerRecords);

//     // Return success response
//     res.status(201).json({ message: 'Booking created successfully', bookingId: booking.id });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to create booking. Please try again.' });
//   }
// };

// // Function to get all bookings
// const getAllBookings = async (req, res) => {
//   try {
//     // Fetch all bookings
//     const bookings = await Booking.findAll({
//       include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with each booking
//     });

//     // Return bookings
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to fetch bookings. Please try again.' });
//   }
// };

// // Function to get a booking by ID
// const getBookingById = async (req, res) => {
//   const bookingId = req.params.id;

//   try {
//     // Fetch the booking by ID
//     const booking = await Booking.findByPk(bookingId, {
//       include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with the booking
//     });

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found.' });
//     }

//     // Return the booking
//     res.status(200).json(booking);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to fetch booking. Please try again.' });
//   }
// };

// module.exports = {
//   createBooking,
//   getAllBookings,
//   getBookingById,
// };

//my old
// const { Booking } = require('../db/bookingModel'); 
// const { Passenger } = require('../db/passenger'); 
// const { sequelize } = require('../db/dbConnectionsModel'); // Import the sequelize instance to use transactions

// // Function to create a new booking
// const createBooking = async (req, res) => {
//   const bookingData = req.body; // Assuming the request body contains all necessary booking data

//   const transaction = await sequelize.transaction();

//   try {
//     // Explicitly map the fields from the request body to the booking model attributes
//     const booking = await Booking.create({
//       customerName: bookingData.customerName,
//       phoneNumber: bookingData.phoneNumber,
//       email: bookingData.email,
//       address: bookingData.address,
//       busId: bookingData.busId,
//       selectedSeats: bookingData.selectedSeats,
//       discountAmount: bookingData.discountAmount,
//       GST: bookingData.GST,
//       cartTotal: bookingData.cartTotal,
//       createdAt: bookingData.createdAt,
//       updatedAt: bookingData.updatedAt
//     }, { transaction });

//     // Create passenger records associated with the booking
//     const passengerDetails = bookingData.passenger_details;
//     const passengerRecords = passengerDetails.map(passenger => ({
//       bookingId: booking.id,
//       name: passenger.name,
//       age: passenger.age,
//       gender: passenger.gender
//     }));

//     await Passenger.bulkCreate(passengerRecords, { transaction });

//     // Commit the transaction
//     await transaction.commit();

//     // Return success response
//     res.status(201).json({ message: 'Booking created successfully', bookingId: booking.id });
//   } catch (error) {
//     // Rollback the transaction in case of an error
//     await transaction.rollback();

//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to create booking. Please try again.' });
//   }
// };

// // Function to get all bookings
// const getAllBookings = async (req, res) => {
//   try {
//     // Fetch all bookings
//     const bookings = await Booking.findAll({
//       include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with each booking
//     });

//     // Return bookings
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to fetch bookings. Please try again.' });
//   }
// };

// // Function to get a booking by ID
// const getBookingById = async (req, res) => {
//   const bookingId = req.params.id;

//   try {
//     // Fetch the booking by ID
//     const booking = await Booking.findByPk(bookingId, {
//       include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with the booking
//     });

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found.' });
//     }

//     // Return the booking
//     res.status(200).json(booking);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to fetch booking. Please try again.' });
//   }
// };

// module.exports = {
//   createBooking,
//   getAllBookings,
//   getBookingById,
// };


const { Booking } = require('../db/bookingModel');
const { Passenger } = require('../db/passenger');
const { sequelize } = require('../db/dbConnectionsModel');

// Function to create a new booking
const createBooking = async (req, res) => {
  const bookingData = req.body;

  console.log('Incoming booking data:', bookingData); // Log incoming booking data

  if (!bookingData.passenger_details || !Array.isArray(bookingData.passenger_details)) {
    return res.status(400).json({ message: 'Passenger details are missing or invalid' });
  }

  const transaction = await sequelize.transaction();

  try {
    // Explicitly map the fields from the request body to the booking model attributes
    const booking = await Booking.create({
      customerName: bookingData.customerName,
      phoneNumber: bookingData.phoneNumber,
      email: bookingData.email,
      address: bookingData.address,
      busId: bookingData.busId,
      selectedSeats: bookingData.selectedSeats,
      discountAmount: bookingData.discountAmount,
      GST: bookingData.GST,
      cartTotal: bookingData.cartTotal,
      createdAt: bookingData.createdAt,
      updatedAt: bookingData.updatedAt
    }, { transaction });

    // Create passenger records associated with the booking
    const passengerDetails = bookingData.passenger_details;
    const passengerRecords = passengerDetails.map(passenger => ({
      bookingId: booking.id,
      name: passenger.name,
      age: passenger.age,
      gender: passenger.gender
    }));

    await Passenger.bulkCreate(passengerRecords, { transaction });

    // Commit the transaction
    await transaction.commit();

    // Return success response
    res.status(201).json({ message: 'Booking created successfully', bookingId: booking.id });
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();

    console.error('Error details:', error); // Log detailed error information
    res.status(500).json({ message: 'Failed to create booking. Please try again.', error: error.message });
  }
};

// Function to get all bookings
const getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings
    const bookings = await Booking.findAll({
      include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with each booking
    });

    // Return bookings
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch bookings. Please try again.' });
  }
};

// Function to get a booking by ID
const getBookingById = async (req, res) => {
  const bookingId = req.params.id;

  try {
    // Fetch the booking by ID
    const booking = await Booking.findByPk(bookingId, {
      include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with the booking
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Return the booking
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch booking. Please try again.' });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
};
