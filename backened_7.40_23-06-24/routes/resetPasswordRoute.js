// const express = require('express');
// const { Register } = require('../db/dbConection'); // Ensure the correct path
// const { userEmail } = require('./forgotPassword'); // Ensure the correct path
// const bcrypt = require('bcrypt');

// const resetPasswordRoute = express.Router();

// resetPasswordRoute.get("/", (req, res) => {
//   console.log(userEmail);
//   res.send(userEmail[0]);
// });

// resetPasswordRoute.post("/", async (req, res) => {
//   const newPassword = req.body.password;

//   if (!userEmail[0]) {
//     return res.status(400).send("No user email found. Please request password reset again.");
//   }

//   try {
//     const user = await Register.findOne({
//       where: { email: userEmail[0] },
//       attributes: ['email', 'userName', 'registerId']
//     });

//     if (!user) {
//       return res.status(404).send("User not found.");
//     }

//     bcrypt.hash(newPassword, 10, async (err, hash) => {
//       if (err) {
//         return res.status(500).send("Error while updating password");
//       }

//       user.password = hash;
//       await user.save();

//       res.send("Password updated successfully.");
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error occurred while updating password.");
//   }
// });

// module.exports = resetPasswordRoute;
// const express = require('express');
// const { Register } = require('../db/dbConection'); // Ensure the correct path
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const resetPasswordRoute = express.Router();

// resetPasswordRoute.post("/", async (req, res) => {
//   const { token, password } = req.body;

//   if (!token) {
//     return res.status(400).send("Token is required.");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userEmail = decoded.email;

//     const user = await Register.findOne({
//       where: { email: userEmail },
//       attributes: ['email', 'userName', 'registerId', 'password']
//     });

//     if (!user) {
//       return res.status(404).send("User not found.");
//     }

//     bcrypt.hash(password, 10, async (err, hash) => {
//       if (err) {
//         return res.status(500).send("Error while updating password");
//       }

//       user.password = hash;
//       await user.save();

//       res.send("Password updated successfully.");
//     });
//   } catch (err) {
//     console.error(err);
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).send("Token has expired.");
//     }
//     res.status(500).send("Error occurred while updating password.");
//   }
// });

// module.exports = resetPasswordRoute;

// const express = require('express');
// const { Register } = require('../db/dbConection'); // Ensure the correct path
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const resetPasswordRoute = express.Router();

// resetPasswordRoute.post("/", async (req, res) => {
//   const { token, password } = req.body;

//   if (!token) {
//     return res.status(400).send("Token is required.");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userEmail = decoded.email;

//     const user = await Register.findOne({
//       where: { email: userEmail },
//       attributes: ['email', 'userName', 'registerId', 'password']
//     });

//     if (!user) {
//       return res.status(404).send("User not found.");
//     }

//     bcrypt.hash(password, 10, async (err, hash) => {
//       if (err) {
//         return res.status(500).send("Error while updating password");
//       }

//       user.password = hash;
//       await user.save();

//       res.send("Password updated successfully.");
//     });
//   } catch (err) {
//     console.error(err);
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).send("Token has expired.");
//     }
//     res.status(500).send("Error occurred while updating password.");
//   }
// });

// module.exports = resetPasswordRoute;
// const express = require('express');
// const { Register } = require('../db/dbConection'); // Ensure the correct path
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const resetPasswordRoute = express.Router();

// resetPasswordRoute.post("/", async (req, res) => {
//   const { token, currentPassword, newPassword, confirmNewPassword } = req.body;

//   if (!token) {
//     return res.status(400).send("Token is required.");
//   }

//   if (newPassword !== confirmNewPassword) {
//     return res.status(400).send("New passwords do not match.");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userEmail = decoded.email;

//     const user = await Register.findOne({
//       where: { email: userEmail },
//       attributes: ['email', 'userName', 'registerId', 'password']
//     });

//     if (!user) {
//       return res.status(404).send("User not found.");
//     }

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(401).send("Current password is incorrect.");
//     }

//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedNewPassword;
//     await user.save();

//     res.send("Password updated successfully.");
//   } catch (err) {
//     console.error(err);
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).send("Token has expired.");
//     }
//     res.status(500).send("Error occurred while updating password.");
//   }
// });

// module.exports = resetPasswordRoute;
const express = require('express');
const { Register } = require('../db/registerModel'); // Ensure the correct path
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const resetPasswordRoute = express.Router();

resetPasswordRoute.post("/", async (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).send("New passwords do not match.");
  }

  try {
    const user = await Register.findOne({
      where: { email: email },
      attributes: ['email', 'userName', 'registerId', 'password']
    });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).send("Old password is incorrect.");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.send("Password updated successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred while updating password.");
  }
});

module.exports = resetPasswordRoute;
