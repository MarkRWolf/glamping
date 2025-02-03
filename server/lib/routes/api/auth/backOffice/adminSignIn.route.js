import express from "express";
import dbConnect from "../../../../db/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../../../db/models/user.model.mjs";

const adminSignIn = express.Router();

adminSignIn.post("/auth/adminSignIn", async (req, res) => {
  const { email, password } = req.body;
  try {
    await dbConnect();

    // Find user
    const user = await userModel.findOne({ email }).lean();
    if (!user) return res.status(400).send({ message: "User not found" });
    // Check password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) return res.status(400).send({ message: "Invalid password" });

    // RETURN IF NOT ADMIN
    if (user.role !== "admin") return res.status(400).send({ message: "User not authorized" });
    // CONTINUE

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("glampingToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).send({ message: "Successfully signed in" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default adminSignIn;
