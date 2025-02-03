import express from "express";
import dbConnect from "../../../db/dbConnect.js";
import contactModel from "../../../db/models/contact.model.mjs";

const contacts = express.Router();

// Get
contacts.get("/contacts", async (req, res) => {
  try {
    await dbConnect();
    const data = await contactModel.find({});
    data.length < 1
      ? res.status(400).send({ message: "No contacts found", data: [] })
      : res.status(200).send({ message: "Contacts found", data: data });
  } catch (error) {
    return res.status(500).send({ message: error.message, data: [] });
  }
});

export default contacts;
