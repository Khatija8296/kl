// const express = require('express');
// const { Register } = require('../db/registerModel');
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');
// const { transporter, mailOptions } = require('../utils/nodemailerConfig');

// const registerRoute = express.Router();

// registerRoute.get("/", (req, res) => {
//   res.send("register page");
// });

// registerRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     const existingUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['userName', 'email', 'phoneNumber', 'password']
//     });

//     if (existingUser) {
//       res.status(409).send("User already registered");
//       return;
//     }

//     bcrypt.hash(data.password, 10, async (err, hash) => {
//       if (err) {
//         res.status(500).send("Error in registering");
//         return;
//       }

//       const otp = Math.floor(100000 + Math.random() * 900000);

//       await Register.create({
//         registerId: uuidv4(),
//         userName: data.userName,
//         email: data.email,
//         phoneNumber: data.phoneNumber,
//         password: hash,
//         otp,
//         status: 'pending',
//         age: data.age,
//         gender: data.gender,
//       });

//       const emailOptions = {
//         ...mailOptions,
//         to: data.email,
//         text: `Your OTP for account verification is: ${otp}`,
//       };

//       try {
//         await transporter.sendMail(emailOptions);
//         res.send("User registered successfully. OTP sent to email.");
//       } catch (error) {
//         console.error('Error sending OTP email:', error);
//         res.status(500).send("User registered but failed to send OTP email.");
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user registration");
//   }
// });

// module.exports = registerRoute;

const express = require('express');
const { Register } = require('../db/registerModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { transporter, mailOptions } = require('./nodemailerConfig');
const jwt = require('jsonwebtoken');
 
const registerRoute = express.Router();
 
registerRoute.get("/", (req, res) => {
  res.send("register page");
});
 
registerRoute.post("/", async (req, res) => {
  const data = req.body;
  try {
    const existingUser = await Register.findOne({
      where: { email: data.email },
      attributes: ['userName', 'email', 'phoneNumber', 'password']
    });
 
    if (existingUser) {
      return res.status(409).send("User already registered");
    }
 
    const hash = await bcrypt.hash(data.password, 10);
 
    const otp = Math.floor(100000 + Math.random() * 900000);
 
    const newUser = await Register.create({
      registerId: uuidv4(),
      userName: data.userName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hash,
      otp,
      status: 'pending',
      age: data.age,
      gender: data.gender,
      role: 'user',  // Default role for new users
    });
 
    // Generate JWT token with userId and role in payload
    const tokenPayload = {
      userId: newUser.registerId,
      role: newUser.role,
    };
 
    const token = jwt.sign(tokenPayload, 'your_jwt_secret_key', { expiresIn: '1h' });
 
    const emailOptions = {
      ...mailOptions,
      to: data.email,
      text: `Your OTP for account verification is: ${otp}`,
    };
 
    await transporter.sendMail(emailOptions);
 
    res.json({ message: "User registered successfully. OTP sent to email.", token });
 
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send("Error while user registration");
  }
});
 
module.exports = registerRoute;