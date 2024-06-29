const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const forgotPasswordRoute = require('./routes/forgotPassword');
const verifyOtpRoute = require('./routes/verifyOtp');
const bus=require('./Route/busRoute');
const booking=require('./Route/bookingRoutes')

// Use routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/forgotPassword', forgotPasswordRoute);
app.use('/verifyOtp', verifyOtpRoute);
app.use('/bus',bus);
app.use('/booking',booking);


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Bus Booking Application');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
