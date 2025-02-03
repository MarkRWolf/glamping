import express from "express";
import fs from "fs";

// DB
import dbConnect from "../../../db/dbConnect.js";
import activityModel from "../../../db/models/activity.model.mjs";

// middleware
import auth from "../../../middleware/auth.middleware.js";
import useMulter from "../../../middleware/multerConfig.js";

const activity = express.Router();

const upload = useMulter("activities");

// Get Activity By ID
activity.get("/aktiviteter/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await dbConnect();
    const data = await activityModel.findById(id);
    return data
      ? res.status(200).send({ message: "Activity found", data: data })
      : res.status(400).send({ message: "Activity not found", data: null });
  } catch (error) {
    return res.status(400).send({ message: error.message, data: null });
  }
});

// Post / Create Activity
activity.post("/activity", auth, upload.single("file"), async (req, res) => {
  const { title, description, date, time } = req.body;
  if (!title || !description || !date || !time) {
    return res.status(400).send({ message: "Please include all fields" });
  }

  try {
    const newActivity = new activityModel({
      title,
      description,
      date,
      time,
      pictureUrl: process.env.SERVER_HOST + "/activities/" + (req.file?.filename ?? "default.jpg"),
    });
    await dbConnect();

    const result = await newActivity.save();
    return res.status(200).send({ message: "Activity created", data: result });
  } catch (error) {
    if (req.file?.filename !== "default.jpg")
      fs.unlinkSync(`public/activities/${req.file.filename}`);
    return res.status(400).send({ message: "something went wrong", data: null });
  }
});

// Update Activity
activity.put("/activity", auth, upload.single("file"), async (req, res) => {
  const { id, title, description, date, time } = req.body;

  try {
    await dbConnect();
    const activity = await activityModel.findById(id);
    if (!activity) {
      return res.status(404).send({ message: "Activity not found" });
    }

    const oldImage = activity.pictureUrl.split("/").pop();

    const updatedActivity = await activityModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        time,
        pictureUrl: req.file
          ? process.env.SERVER_HOST + "/activities/" + req.file.filename
          : activity.pictureUrl,
      },
      { new: true }
    );

    req.file && oldImage !== "default.jpg" && fs.unlinkSync(`public/activities/${oldImage}`);

    return res.status(200).send({ message: "Activity updated", data: updatedActivity });
  } catch (error) {
    return res.status(400).send({ message: error.message, data: null });
  }
});

// Delete Activity
activity.delete("/activity/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await dbConnect();

    const deletedActivity = await activityModel.findByIdAndDelete(id);
    if (!deletedActivity) return res.status(404).send({ message: "Activity not found" });

    deletedActivity.pictureUrl.split("/").pop() !== "default.jpg" &&
      fs.unlinkSync(`public/users/${oldImage}`);

    return res.status(200).send({ message: "Activity and image deleted", data: deletedActivity });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

export default activity;
