import express from "express";
import fs from "fs";

// DB
import dbConnect from "../../../db/dbConnect.js";
import reviewModel from "../../../db/models/review.model.mjs";

// middleware
import auth from "../../../middleware/auth.middleware.js";
import useMulter from "../../../middleware/multerConfig.js";

const review = express.Router();

const upload = useMulter("reviews");

// Get Review By ID
review.get("/review/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await dbConnect();
    const data = await reviewModel.findById(id);
    return data
      ? res.status(200).send({ message: "Review found", data: data })
      : res.status(400).send({ message: "Review not found", data: null });
  } catch (error) {
    return res.status(400).send({ message: error.message, data: null });
  }
});

// Post / Create Review
review.post("/review", upload.single("file"), async (req, res) => {
  const { name, age, review, stay } = req.body;

  try {
    const newReview = new reviewModel({
      name,
      age,
      review,
      stay,
      approved: false,
      pictureUrl: process.env.SERVER_HOST + "/reviews/" + (req.file?.filename ?? "default.jpg"),
    });
    await dbConnect();

    const result = await newReview.save();
    return res.status(200).send({ message: "Review created", data: result });
  } catch (error) {
    if (req.file?.filename !== "default.jpg") fs.unlinkSync(`public/reviews/${req.file.filename}`);
    return res.status(400).send({ message: "something went wrong", data: null });
  }
});

// Update Review
review.put("/review", auth, upload.single("file"), async (req, res) => {
  const { id, name, age, review, stay, approved } = req.body;

  try {
    await dbConnect();
    const dbReview = await reviewModel.findById(id);
    if (!dbReview) return res.status(404).send({ message: "Review not found" });

    const oldImage = dbReview.pictureUrl.split("/").pop();

    const updatedReview = await reviewModel.findByIdAndUpdate(
      id,
      {
        name,
        age,
        review,
        stay,
        approved,
        pictureUrl: req.file
          ? process.env.SERVER_HOST + "/reviews/" + req.file.filename
          : dbReview.pictureUrl,
      },
      { new: true }
    );

    req.file && oldImage !== "default.jpg" && fs.unlinkSync(`public/reviews/${oldImage}`);

    return res.status(200).send({ message: "Review updated", data: updatedReview });
  } catch (error) {
    return res.status(400).send({ message: error.message, data: null });
  }
});

// Delete Review
review.delete("/review/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await dbConnect();

    const deletedReview = await reviewModel.findByIdAndDelete(id);
    if (!deletedReview) return res.status(404).send({ message: "Review not found" });

    deletedReview.pictureUrl.split("/").pop() !== "default.jpg" &&
      fs.unlinkSync(`public/users/${deletedReview.pictureUrl.split("/").pop()}`);

    return res.status(200).send({ message: "Review and image deleted", data: deletedReview });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

export default review;
