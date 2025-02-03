import express from "express";

import dbConnect from "../../../db/dbConnect.js";
import reviewModel from "../../../db/models/review.model.mjs";

const reviews = express.Router();

// post
reviews.get("/reviews", async (req, res) => {
  try {
    await dbConnect();
    const data = await reviewModel.find({});

    data.length < 1
      ? res.status(400).send({ message: "No reviews found", data: null })
      : res.status(200).send({ message: "Reviews found", data: data });
  } catch (error) {
    return res.status(500).send({ message: error.message, data: null });
  }
});

export default reviews;
