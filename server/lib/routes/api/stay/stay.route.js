import express from "express";
import fs from "fs";

// DB
import dbConnect from "../../../db/dbConnect.js";
import stayModel from "../../../db/models/stay.model.mjs";

// middleware
import auth from "../../../middleware/auth.middleware.js";
import useMulter from "../../../middleware/multerConfig.js";

const stay = express.Router();

const upload = useMulter("stays");

// Get Stay By ID
stay.get("/ophold/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await dbConnect();
    const data = await stayModel.findById(id);
    return data
      ? res.status(200).send({ message: "stay found", data: data })
      : res.status(400).send({ message: "stay not found", data: null });
  } catch (error) {
    return res.status(400).send({ message: error.message, data: null });
  }
});

// Post / Create stay
stay.post("/stay", auth, upload.single("file"), async (req, res) => {
  const { title, infoTitle, description, numberOfPersons, price, includes } = req.body;

  if (!title || !infoTitle || !description || !numberOfPersons || !price || !includes) {
    return res.status(400).send({ message: "Please incldue all fields" });
  }

  try {
    const newStay = new stayModel({
      title,
      infoTitle,
      description,
      price,
      numberOfPersons,
      includes,
      pictureUrl: process.env.SERVER_HOST + "/stays/" + (req.file?.filename ?? "default.jpg"),
      created: { id: req.user.id, date: new Date() },
    });

    await dbConnect();
    const result = await newStay.save();
    return res.status(200).send({ message: "Stay created", data: result });
  } catch (error) {
    if (req.file?.filename !== "default.jpg") fs.unlinkSync(`public/stays/${req.file.filename}`);

    return res.status(400).send({ message: "somethin went wrong", data: null });
  }
});

// Update Stay
stay.put("/stay", auth, upload.single("file"), async (req, res) => {
  const { id, title, infoTitle, description, numberOfPersons, price, includes } = req.body;

  try {
    await dbConnect();

    const stay = await stayModel.findById(id);
    if (!stay) return res.status(404).send({ message: "Stay not found" });

    const oldImage = stay.pictureUrl.split("/").pop();

    const updatedStay = await stayModel.findByIdAndUpdate(
      id,
      {
        title,
        infoTitle,
        description,
        price,
        numberOfPersons,
        includes,
        pictureUrl: req.file
          ? process.env.SERVER_HOST + "/stays/" + req.file.filename
          : stay.pictureUrl,
        updated: [...stay.updated, { id: req.user.id, date: new Date() }],
      },
      { new: true }
    );

    if (req.file) {
      if (oldImage !== "default.jpg") fs.unlinkSync(`public/stays/${oldImage}`);
    }

    return res.status(200).send({ message: "Stay updated", data: updatedStay });
  } catch (error) {
    return res.status(400).send({ message: error.message, data: null });
  }
});

// Delete User
stay.delete("/stay/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    await dbConnect();

    const deletedStay = await stayModel.findByIdAndDelete(id);
    if (!deletedStay) return res.status(404).send({ message: "Stay not found" });

    const oldImage = deletedStay.pictureUrl.split("/").pop();
    if (oldImage !== "default.jpg") {
      fs.unlinkSync(`public/stays/${oldImage}`);
    }

    return res.status(200).send({ message: "Stay and image deleted" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

export default stay;
