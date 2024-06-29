const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: '',
  subject: 'Password Reset',
  text: 'Hi, please confirm your email and click the link to reset your password.'
};

module.exports = { transporter, mailOptions };
