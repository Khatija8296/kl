// import express from 'express';
// import { Register } from '../db/dbConection';
// import { v4 as uuidv4 } from 'uuid';
// import bcrypt from 'bcrypt';

// export const registerRoute = express.Router();

// registerRoute.get("/", (req, res) => {
//   res.send("register page");
// });

// registerRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     const existingUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['userName', 'email', 'password']
//     });

//     if (existingUser) {
//       res.status(409).send("user already registered");
//       return;
//     }

//     bcrypt.hash(data.password, 10, async (err, hash) => {
//       if (err) {
//         res.status(500).send("error in registering");
//         return;
//       }

//       const newUser = await Register.create({
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//       });

//       if (newUser) {
//         res.send("User register successfully");
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("error while user registration");
//   }
// });

// registerRoute.get('/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     const user = await Register.findOne({
//       where: { email },
//       attributes: ['userName', 'email']
//     });

//     if (user) {
//       res.send(user);
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (err) {
//     res.status(500).send('Error while getting user');
//   }
// });
// const express = require('express');
// const { Register } = require('../db/dbConection'); // Adjust the path if necessary
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');

// const registerRoute = express.Router();

// registerRoute.get("/", (req, res) => {
//   res.send("register page");
// });

// registerRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     const existingUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['userName', 'email', 'password']
//     });

//     if (existingUser) {
//       res.status(409).send("user already registered");
//       return;
//     }

//     bcrypt.hash(data.password, 10, async (err, hash) => {
//       if (err) {
//         res.status(500).send("error in registering");
//         return;
//       }

//       const newUser = await Register.create({
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//       });

//       if (newUser) {
//         res.send("User registered successfully");
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("error while user registration");
//   }
// });

// registerRoute.get('/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     const user = await Register.findOne({
//       where: { email },
//       attributes: ['userName', 'email']
//     });

//     if (user) {
//       res.send(user);
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (err) {
//     res.status(500).send('Error while getting user');
//   }
// });

// module.exports = registerRoute;

// const express = require('express');
// const { Register } = require('../db/dbConection'); // Adjust the path if necessary
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');

// const registerRoute = express.Router();

// registerRoute.get("/", (req, res) => {
//   res.send("register page");
// });

// registerRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     const existingUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['userName', 'email', 'password']
//     });

//     if (existingUser) {
//       res.status(409).send("user already registered");
//       return;
//     }

//     bcrypt.hash(data.password, 10, async (err, hash) => {
//       if (err) {
//         res.status(500).send("error in registering");
//         return;
//       }

//       const newUser = await Register.create({
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//       });

//       if (newUser) {
//         res.send("User registered successfully");
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("error while user registration");
//   }
// });

// registerRoute.get('/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     const user = await Register.findOne({
//       where: { email },
//       attributes: ['userName', 'email', 'phoneNumber'] // Include phoneNumber in the attributes
//     });

//     if (user) {
//       res.send(user);
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (err) {
//     res.status(500).send('Error while getting user');
//   }
// });

// module.exports = registerRoute;

// const express = require('express');
// const { Register } = require('../db/dbConection'); // Adjust the path if necessary
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');
// const sgMail = require('./sendGrid'); // Import SendGrid module

// const registerRoute = express.Router();

// registerRoute.get("/", (req, res) => {
//   res.send("register page");
// });

// registerRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     const existingUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['userName', 'email', 'password']
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

//       const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

//       const newUser = await Register.create({
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//         otp // Store OTP in the database
//       });

//       const msg = {
//         to: data.email, // Recipient's email
//         from: 'your-email@example.com', // Your verified sender email
//         subject: 'OTP for Account Verification',
//         text: `Your OTP for account verification is: ${otp}`,
//       };

//       try {
//         await sgMail.send(msg);
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

// const express = require('express');
// const { Register } = require('../db/dbConection'); // Adjust the path if necessary
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');
// const { transporter, mailOptions } = require('./nodemailerConfig'); // Import Nodemailer configuration

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

//       const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

//       const newUser = await Register.create({
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//         otp // Store OTP in the database
//       });

//       const emailOptions = {
//         ...mailOptions,
//         to: data.email, // Recipient's email
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
// const express = require('express');
// const bcrypt = require('bcrypt');
// const { Register } = require('../db/dbConection');
// const { v4: uuidv4 } = require('uuid');

// const registerRoute = express.Router();

// registerRoute.get("/", (req, res) => {
//   res.send("register page");
// });

// registerRoute.post("/", async (req, res) => {
//   const { userName, email, password, phoneNumber } = req.body;

//   try {
//     const existingUser = await Register.findOne({ where: { email }, attributes: ['email'] });
//     if (existingUser) {
//       res.status(409).send("User already registered");
//       return;
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user record with phone number
//     const newUser = await Register.create({
//       registerId: uuidv4(),
//       userName,
//       email,
//       password: hashedPassword,
//       phoneNumber, // Include the phone number field
//     });

//     if (newUser) {
//       res.send("User registered successfully");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user registration");
//   }
// });

// module.exports = registerRoute;
// const express = require('express');
// const { Register } = require('../db/dbConection');
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');
// const { verifyOtpFunction } = require('./otpVerificationRoute');

// const registerRoute = express.Router();

// registerRoute.get("/", (req, res) => {
//   res.send("register page");
// });

// registerRoute.post("/", async (req, res) => {
//   const data = req.body;
//   const { email, otp, phoneNumber } = data; // Extract phone number from request data
//   try {
//     // Verify OTP first
//     const isOtpVerified = await verifyOtpFunction(email, otp);

//     if (!isOtpVerified) {
//       res.status(401).send("OTP verification failed");
//       return;
//     }

//     // If OTP verification is successful, proceed with user registration
//     const existingUser = await Register.findOne({
//       where: { email },
//       attributes: ['userName', 'email', 'password']
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

//       const newUser = await Register.create({
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//         phoneNumber // Add phone number to the user data
//       });

//       if (newUser) {
//         res.send("User registered successfully");
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user registration");
//   }
// });

// module.exports = registerRoute;

// const express = require('express');
// const bcrypt = require('bcrypt');
// const { Register } = require('../db/dbConection');
// const { v4: uuidv4 } = require('uuid');

// const registerRoute = express.Router();

// registerRoute.get("/", (req, res) => {
//   res.send("register page");
// });

// registerRoute.post("/", async (req, res) => {
//   const { userName, email, password, phoneNumber } = req.body;

//   try {
//     const existingUser = await Register.findOne({ where: { email }, attributes: ['email'] });
//     if (existingUser) {
//       res.status(409).send("User already registered");
//       return;
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user record with phone number
//     const newUser = await Register.create({
//       registerId: uuidv4(),
//       userName,
//       email,
//       password: hashedPassword,
//       phoneNumber, // Include the phone number field
//     });

//     if (newUser) {
//       res.send("User registered successfully");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user registration");
//   }
// });

// module.exports = registerRoute;

// const express = require('express');
// const { Register } = require('../db/dbConection'); // Adjust the path if necessary
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');
// const { transporter, mailOptions } = require('./nodemailerConfig'); // Import Nodemailer configuration

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

//       const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

//       const newUser = await Register.create({
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//         otp // Store OTP in the database
//       });

//       const emailOptions = {
//         ...mailOptions,
//         to: data.email, // Recipient's email
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
// const express = require('express');
// const { Register } = require('../db/dbConection');
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');
// const { transporter, mailOptions } = require('./nodemailerConfig');

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
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//         otp,
//         status: 'pending'
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
// const express = require('express');
// const { Register } = require('../db/dbConection');
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');
// const { transporter, mailOptions } = require('./nodemailerConfig');

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
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//         otp,
//         status: 'pending'
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
// const express = require('express');
// const { Register } = require('../db/registerModel');
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');
// const { transporter, mailOptions } = require('./nodemailerConfig');

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
//         ...data,
//         registerId: uuidv4(),
//         password: hash,
//         otp,
//         status: 'pending'
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
      res.status(409).send("User already registered");
      return;
    }

    bcrypt.hash(data.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).send("Error in registering");
        return;
      }

      const otp = Math.floor(100000 + Math.random() * 900000);

      await Register.create({
        ...data,
        registerId: uuidv4(),
        password: hash,
        otp,
        status: 'pending'
      });

      const emailOptions = {
        ...mailOptions,
        to: data.email,
        text: `Your OTP for account verification is: ${otp}`,
      };

      try {
        await transporter.sendMail(emailOptions);
        res.send("User registered successfully. OTP sent to email.");
      } catch (error) {
        console.error('Error sending OTP email:', error);
        res.status(500).send("User registered but failed to send OTP email.");
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error while user registration");
  }
});

// New route to get all registered users
registerRoute.get("/all", async (req, res) => {
  try {
    const users = await Register.findAll({
      attributes: ['userName', 'email', 'phoneNumber', 'status']
    });
    res.json(users);
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).send("Error retrieving users");
  }
});


module.exports = registerRoute;