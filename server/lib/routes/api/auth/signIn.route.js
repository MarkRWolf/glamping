import express from "express";
import userModel from "../../../db/models/user.model.mjs";
import dbConnect from "../../../db/dbConnect.js";
import bcrypt from "bcrypt";

const signIn = express.Router();

// Post
signIn.post("/auth/signIn", async (req, res) => {
  const { email, password } = req.body;
  try {
    await dbConnect();
    const user = await userModel
      .findOne({
        email,
      })
      .lean();
    if (!user) return res.status(400).send({ message: "User not found", data: null });

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) return res.status(400).send({ message: "Invalid password", data: null });

    delete user.hashedPassword;
    return res.status(200).send({ message: "Successfully signed in", data: user });
  } catch (error) {
    return res.status(500).send({ message: error.message, data: null });
  }
});

export default signIn;
