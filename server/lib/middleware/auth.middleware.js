import jwt from "jsonwebtoken";
import dbConnect from "../db/dbConnect.js";
import userModel from "../db/models/user.model.mjs";
const auth = async (req, res, next) => {
  const token = req.cookies?.glampingToken;
  /* const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2RhZDdhN2NhNGJkMDNjZDYyMmIzZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzE2NzU0MywiZXhwIjoxNzM5NzU5NTQzfQ.lpNX0ga84PPhCsOCMjHoHU4uhyNLUDpF32EFxBLjWB8"; */
  if (!token) return res.status(401).send({ message: "What happen" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded?.role !== "admin") return res.status(403).send({ message: "What u doing here" });

  try {
    await dbConnect();
    const user = await userModel.findById(decoded.id).select("-hashedPassword");
    if (user?.role !== "admin") return res.status(403).send({ message: "What u doin here" });
    req.user = user;
  } catch (err) {
    console.log("Error", err);
    return res.status(401).send({ message: "Not a valid Token - are you signed in?" });
  }

  return next();
};

export default auth;
