import express from "express";

const hello = express.Router();

hello.get("/hello", async (req, res) => {
  res.status(200).send({ data: "Hello" });
});

export default hello;
