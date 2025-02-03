import express from "express";

import dbConnect from "../../../db/dbConnect.js";
import activityModel from "../../../db/models/activity.model.mjs";

const activities = express.Router();

// post
activities.get("/activities", async (req, res) => {
  try {
    await dbConnect();
    const data = await activityModel.find({});
    data.length < 1
      ? res.status(400).send({ message: "No activities found", data: null })
      : res.status(200).send({ message: "Activities found", data: data });
  } catch (error) {
    return res.status(500).send({ message: error.message, data: null });
  }
});

export default activities;
