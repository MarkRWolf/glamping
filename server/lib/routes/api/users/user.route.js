import express from "express";
import dbConnect from "../../../db/dbConnect.js";
import userModel from "../../../db/models/user.model.mjs";
import bcrypt from "bcrypt";
import fs from "fs";

const user = express.Router();

import auth from "../../../middleware/auth.middleware.js";
import useMulter from "../../../middleware/multerConfig.js";

const upload = useMulter("users");

// Get User By ID
user.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  await dbConnect();

  try {
    const data = await userModel.findById(id).select("-hashedPassword");
    return data
      ? res.status(200).send({ message: "User found", data: data })
      : res.status(400).send({ message: "User not found", data: null });
  } catch (error) {
    return res.status(400).send({ message: error.message, data: null });
  }
});

// Post / Create User
user.post("/user", upload.single("file"), async (req, res) => {
  const { name, email, password } = req.body;
  const { file } = req;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    name,
    email,
    hashedPassword,
    pictureUrl: process.env.SERVER_HOST + "/users/" + (file?.filename ?? "default.png"),
  });
  try {
    await dbConnect();
    console.log("hit");
    const result = await newUser.save(newUser);
    const user = result.toObject();
    delete user.hashedPassword;
    return res.status(200).send({ message: "User created", data: user });
  } catch (error) {
    return res.status(400).send({ message: "What did you do", data: null });
  }
});

// Update User
user.put("/user", auth, upload.single("file"), async (req, res) => {
  const { id, email, password, name } = req.body;
  const file = req.file;

  try {
    await dbConnect();

    const user = await userModel.findOne({ _id: id, email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (password && !(await bcrypt.compare(password, user.hashedPassword))) {
      return res.status(400).send({ message: "Invalid password" });
    }
    if (file) {
      const oldImage = user.pictureUrl.split("/").pop();
      if (oldImage !== "default.png") {
        fs.unlinkSync(`public/users/${oldImage}`);
      }
    }

    const updatedData = {
      ...(name && { name }),
      ...(file && { pictureUrl: process.env.SERVER_HOST + "/users/" + file.filename }),
    };

    const updatedUser = await userModel
      .findByIdAndUpdate(id, updatedData, { new: true })
      .select("-hashedPassword");

    return res.status(200).send({ message: "User updated", data: updatedUser });
  } catch (error) {
    return res.status(400).send({ message: error.message, data: null });
  }
});

// Delete User
user.delete("/user/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    await dbConnect();

    const user = await userModel.findOne({ _id: id, email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!(await bcrypt.compare(password, user.hashedPassword))) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const oldImage = user.pictureUrl.split("/").pop();
    if (oldImage !== "default.png") {
      fs.unlinkSync(`public/users/${oldImage}`);
    }

    await userModel.findByIdAndDelete(id);
    return res.status(200).send({ message: "User and image deleted" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

export default user;
