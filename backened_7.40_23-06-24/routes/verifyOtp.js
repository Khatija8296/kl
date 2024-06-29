// // const express = require('express');
// // const otps = require('./otpStore'); // Use shared module

// // const verifyOtpRoute = express.Router();

// // verifyOtpRoute.post("/", (req, res) => {
// //   const { email, otp } = req.body;

// //   if (otps[email] && otps[email] === otp) {
// //     delete otps[email];
// //     res.send("OTP verified successfully");
// //   } else {
// //     res.status(400).send("Invalid OTP");
// //   }
// // });

// // module.exports = verifyOtpRoute;

// // const express = require('express');
// // const { Register } = require('../db/dbConection'); // Adjust the path if necessary

// // const verifyOtpRoute = express.Router();

// // verifyOtpRoute.post("/", async (req, res) => {
// //   const { email, otp } = req.body;
// //   try {
// //     const user = await Register.findOne({
// //       where: { email: email, otp: otp }
// //     });

// //     if (user) {
// //       await Register.update({ otp: null }, { where: { email: email } }); // Clear OTP after verification
// //       res.send("OTP verified successfully.");
// //     } else {
// //       res.status(400).send("Invalid OTP.");
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Error verifying OTP.");
// //   }
// // });

// // module.exports = verifyOtpRoute;
// // const express = require('express');
// // const { Register } = require('../db/dbConection'); // Adjust the path if necessary

// // const verifyOtpRoute = express.Router();

// // verifyOtpRoute.post("/", async (req, res) => {
// //   const { email, otp } = req.body;
// //   try {
// //     const user = await Register.findOne({
// //       where: { email: email, otp: otp }
// //     });

// //     if (user) {
// //       await Register.update({ otp: null }, { where: { email: email } }); // Clear OTP after verification
// //       res.send("OTP verified successfully.");
// //     } else {
// //       res.status(400).send("Invalid OTP.");
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Error verifying OTP.");
// //   }
// // });

// // module.exports = verifyOtpRoute;
// // const express = require('express');
// // const { Register } = require('../db/dbConection');

// // const verifyOtpRoute = express.Router();

// // verifyOtpRoute.post("/", async (req, res) => {
// //   const { email, otp } = req.body;
// //   try {
// //     const user = await Register.findOne({ where: { email, otp } });

// //     if (user) {
// //       await Register.update({ otp: null, status: 'active' }, { where: { email } });
// //       res.send("OTP verified successfully. Account is now active.");
// //     } else {
// //       res.status(400).send("Invalid OTP.");
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Error verifying OTP.");
// //   }
// // });

// // module.exports = verifyOtpRoute;

// const express = require('express');
// const { Register } = require('../db/dbConection');

// const verifyOtpRoute = express.Router();

// verifyOtpRoute.post("/", async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const user = await Register.findOne({ where: { email, otp } });

//     if (user) {
//       await Register.update({ otp: null, status: 'active' }, { where: { email } });
//       res.send("OTP verified successfully. Account is now active.");
//     } else {
//       res.status(400).send("Invalid OTP.");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error verifying OTP.");
//   }
// });

// module.exports = verifyOtpRoute;
const express = require('express');
const { Register } = require('../db/registerModel');

const verifyOtpRoute = express.Router();

verifyOtpRoute.post("/", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await Register.findOne({ where: { email, otp } });

    if (user) {
      await Register.update({ otp: null, status: 'active' }, { where: { email } });
      res.send("OTP verified successfully. Account is now active.");
    } else {
      res.status(400).send("Invalid OTP.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error verifying OTP.");
  }
});

module.exports = verifyOtpRoute;
