// // routes/bookingRoutes.js

// const express = require('express');
// const router = express.Router();
// const { getUserBookings, getBusBookings, search, create, cancel } = require('../controllers/booking');

// // Middleware to protect routes, if needed
// // const authenticate = require('../middleware/authenticate');

// // GET user's bookings
// // router.get('/user-bookings', authenticate, getUserBookings);
// router.get('/user-bookings', getUserBookings);

// // GET bookings for a specific bus
// router.get('/bus-bookings/:busId', getBusBookings);

// // POST search for buses based on route, date, and availability
// router.post('/search', search);

// // POST create a new booking
// // router.post('/create', authenticate, create);
// router.post('/create',create);

// // PUT cancel a booking
// // router.put('/cancel/:bookingId', authenticate, cancel);
// router.put('/cancel/:bookingId', cancel);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const bookingController = require('../controllers/booking');

// // POST request to create a new booking
// router.post('/', bookingController.createBooking);

// // GET request to fetch all bookings
// router.get('/', bookingController.getAllBookings);

// // GET request to fetch a single booking by ID
// router.get(':id', bookingController.getBookingById);

// module.exports = router;


//old code
// const express = require('express');
// const router = express.Router();
// const {
//   createBooking,
//   getAllBookings,
//   getBookingById
// } = require('../controllers/booking');

// // Create a new bus record
// router.post('/', createBooking);

// // Get all bus records
// router.get('/', getAllBookings);

// // Get a single bus record by ID
// router.get('/:id',getBookingById)



// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById
} = require('../controllers/booking');

// Create a new booking
router.post('/', createBooking);

// Get all bookings
router.get('/', getAllBookings);

// Get a single booking by ID
router.get('/:id', getBookingById);

module.exports = router;
