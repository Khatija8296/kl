import express from "express";
import { registerModel } from "../db/models.js";
import { userEmail } from "./forgotPassword.js";
import bcrypt from "bcrypt";

const resetPasswordRoute = express.Router();

resetPasswordRoute.get("/", (req, res) => {
  console.log(userEmail);
  res.send(userEmail[0]);
});

resetPasswordRoute.post("/", async (req, res) => {
  const payload = req.body.password;
  try {
    const data = await registerModel.findOne(
      { email: userEmail[0] },
      { _id: 0, email: 1, userName: 1, registerId: 1 }
    );
    if (!data) {
      return res.status(404).send("User not found");
    }
    bcrypt.hash(payload, 10, async (err, hash) => {
      if (err) {
        return res.status(500).send("Error while updating password");
      }
      await registerModel.findOneAndUpdate(
        { email: userEmail[0] },
        { ...data.toObject(), password: hash }
      );
      res.send("Password updated");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred");
  }
});

export default resetPasswordRoute;
