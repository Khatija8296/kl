const express = require('express');
const { Register } = require('../db/registerModel');

const otpVerificationRoute = express.Router();

otpVerificationRoute.post("/", async (req, res) => {
  const { email, otp } = req.body;
  try {
    // Find the user by email and OTP
    const user = await Register.findOne({ where: { email, otp } });

    if (!user) {
      res.status(404).send("Invalid OTP");
      return;
    }

    // Update user status to active
    await Register.update({ status: 'active' }, { where: { email } });

    res.send("OTP verified successfully. Your account is now active.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while verifying OTP");
  }
});

module.exports = otpVerificationRoute;
