
// module.exports = loginRoute;

// const express = require('express');
// const {  Login } = require('../db/loginModel');
// const {  Register } = require('../db/registerModel'); // Adjust the path if necessary
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');

// const loginRoute = express.Router();

// loginRoute.get("/", (req, res) => {
//   res.send("login page");
// });

// loginRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     const checkUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['userName', 'password', 'email', 'status']
//     });

//     if (checkUser) {
//       if (checkUser.status !== 'active') {
//         res.status(403).send('Account not yet activated. Please verify your OTP.');
//         return;
//       }

//       bcrypt.compare(data.password, checkUser.password, async (err, result) => {
//         if (!result) {
//           res.status(401).send("Invalid Data");
//         } else {
//           const newUser = await Login.create({
//             ...data,
//             loginId: uuidv4(),
//           });

//           if (newUser) {
//             res.send("User logged in successfully");
//           }
//         }
//       });
//     } else {
//       res.status(403).send('Not yet registered');
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(401).send("Error while user login");
//   }
// });

// module.exports = loginRoute;

// // const express = require('express');
// // const { Register, Login } = require('../db/dbConection');
// // const { v4: uuidv4 } = require('uuid');
// // const bcrypt = require('bcrypt');

// // const loginRoute = express.Router();

// // loginRoute.get("/", (req, res) => {
// //   res.send("login page");
// // });

// // loginRoute.post("/", async (req, res) => {
// //   const data = req.body;
// //   try {
// //     const checkUser = await Register.findOne({
// //       where: { email: data.email },
// //       attributes: ['userName', 'password', 'email', 'status']
// //     });

// //     if (checkUser) {
// //       if (checkUser.status !== 'active') {
// //         res.status(403).send('Account not yet activated. Please verify your OTP.');
// //         return;
// //       }

// //       bcrypt.compare(data.password, checkUser.password, async (err, result) => {
// //         if (!result) {
// //           res.status(401).send("Invalid Data");
// //         } else {
// //           const newUser = await Login.create({
// //             ...data,
// //             loginId: uuidv4(),
// //           });

// //           if (newUser) {
// //             res.send("User logged in successfully");
// //           }
// //         }
// //       });
// //     } else {
// //       res.status(403).send('Not yet registered');
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(401).send("Error while user login");
// //   }
// // });

// // module.exports = loginRoute;


const express = require('express');
const { Login } = require('../db/loginModel'); // Adjust this import based on your actual models
const { Register } = require('../db/registerModel'); // Adjust this import based on your actual models
const bcrypt = require('bcrypt');
 
const loginRoute = express.Router();
 
loginRoute.get("/", (req, res) => {
  res.send("login page");
});
 
loginRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the Register model
    const checkUser = await Register.findOne({
      where: { email },
      attributes: ['registerId', 'userName', 'password', 'email', 'status', 'role','phoneNumber','age','gender',]
    });
 
    if (!checkUser) {
      return res.status(403).send('User not found'); // User not registered
    }
 
    // Check if account is active
    if (checkUser.status !== 'active') {
      return res.status(403).send('Account not yet activated. Please verify your OTP.');
    }
 
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, checkUser.password);
 
    if (!passwordMatch) {
      return res.status(401).send('Invalid password'); // Incorrect password
    }
 
    // Return user details including role
    res.json({
      userName: checkUser.userName,
      email: checkUser.email,
      role: checkUser.role ,
      phoneNumber:checkUser.phoneNumber,
      age:checkUser.age,
      gender:checkUser.gender
 
     
    });
 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while user login");
  }
});
 
module.exports = loginRoute;