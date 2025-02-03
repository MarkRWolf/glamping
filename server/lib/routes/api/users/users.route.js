import express from "express";
import userModel from "../../../db/models/user.model.mjs";
import dbConnect from "../../../db/dbConnect.js";
import auth from "../../../middleware/auth.middleware.js";

const users = express.Router();

// Get
users.get("/users", auth, async (req, res) => {
  await dbConnect();

  try {
    const data = await userModel.find({});
    data.length < 1
      ? res.status(400).send({ message: "No users found", data: [] })
      : res.status(200).send({ message: "Users found", data: data });
  } catch (error) {
    return res.status(500).send({ message: error.message, data: [] });
  }
});

export default users;
