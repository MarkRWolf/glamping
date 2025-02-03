import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../../../../db/models/user.model.mjs";
import dbConnect from "../../../../db/dbConnect.js";
const tokenRoute = express.Router();

tokenRoute.post("/auth/token", async (req, res) => {
  const token = req.cookies?.glampingToken;
  if (!token) return res.status(400).send({ message: "Something went wrong", data: null });

  try {
    await dbConnect();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).lean();
    if (!user) return res.status(400).send({ message: "User not found", data: null });
    if (user.role !== "admin")
      return res.status(403).send({ message: "You are not authorized", data: null });
    return res.status(200).send({ message: "Successfully authenticated", data: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, data: null });
  }
});

export default tokenRoute;
