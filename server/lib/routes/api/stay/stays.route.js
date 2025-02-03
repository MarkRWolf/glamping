import express from "express";
import dbConnect from "../../../db/dbConnect.js";
import stayModel from "../../../db/models/stay.model.mjs";

const stays = express.Router();

// get
stays.get("/stays", async (req, res) => {
  try {
    await dbConnect();
    const data = await stayModel.find({});
    data.length < 1
      ? res.status(400).send({ message: "No stays found", data: null })
      : res.status(200).send({ message: "Stays found", data: data });
  } catch (error) {
    return res.status(500).send({ message: error.message, data: null });
  }
});

export default stays;
