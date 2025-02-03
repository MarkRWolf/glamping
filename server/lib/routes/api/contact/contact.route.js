import express from "express";
import fs from "fs";

// DB
import dbConnect from "../../../db/dbConnect.js";
import contactModel from "../../../db/models/contact.model.mjs";

// middleware
import auth from "../../../middleware/auth.middleware.js";
import useMulter from "../../../middleware/multerConfig.js";

const contact = express.Router();

const upload = useMulter("contacts");

// Post / Create Contact
contact.post("/contact", upload.single("file"), async (req, res) => {
  const { name, email, message, subject } = req.body;

  try {
    const newContact = new contactModel({
      name,
      email,
      message,
      subject,
    });
    await dbConnect();

    const result = await newContact.save();
    return res.status(200).send({ message: "Contact created", data: result });
  } catch (error) {
    return res.status(400).send({ message: "something went wrong", data: null });
  }
});

// Delete Contact
contact.delete("/contact/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await dbConnect();

    const deletedContact = await contactModel.findByIdAndDelete(id);
    if (!deletedContact) return res.status(404).send({ message: "Contact not found" });

    return res.status(200).send({ message: "Contact and image deleted", data: deletedContact });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

export default contact;
