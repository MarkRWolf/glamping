import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import users from "./routes/api/users/users.route.js";
import user from "./routes/api/users/user.route.js";
import signIn from "./routes/api/auth/signIn.route.js";
import adminSignIn from "./routes/api/auth/backOffice/adminSignIn.route.js";
import tokenRoute from "./routes/api/auth/backOffice/token.route.js";
import activities from "./routes/api/activity/activities.route.js";
import activity from "./routes/api/activity/activity.route.js";
import stay from "./routes/api/stay/stay.route.js";
import stays from "./routes/api/stay/stays.route.js";
import reviews from "./routes/api/reviews/reviews.route.js";
import review from "./routes/api/reviews/review.route.js";
import contacts from "./routes/api/contact/contacts.route.js";
import contact from "./routes/api/contact/contact.route.js";
import hello from "./routes/api/hello/hello.route.js";

const server = {};
const expressServer = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));
expressServer.use(
  cors({
    origin: "https://markrwolf.github.io",
    credentials: true,
  })
);
expressServer.use(cookieParser());
expressServer.use(express.static("public"));
expressServer.use(express.static(path.join(__dirname, "client/dist")));

/* server routes */
expressServer.use("/api", users);
expressServer.use("/api", user);
expressServer.use("/api", signIn);
expressServer.use("/api", tokenRoute);
expressServer.use("/api", adminSignIn);
expressServer.use("/api", activities);
expressServer.use("/api", activity);
expressServer.use("/api", stays);
expressServer.use("/api", stay);
expressServer.use("/api", reviews);
expressServer.use("/api", review);
expressServer.use("/api", contacts);
expressServer.use("/api", contact);
expressServer.use("/api", hello);

// server doesn't currently serve the client folder
/* expressServer.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
}); */

server.run = () => {
  const port = process.env.PORT || process.env.SERVER_PORT || 3042;
  console.log("\n\n---------------------");
  console.log("Server Started", process.env.NODE_ENV, port);
  console.log("\n\n---------------------");

  expressServer.listen(port, () => console.log(`Running on port: ${port}`));
  expressServer.listen(process.env.SERVER_PORT, () =>
    console.log(`Running : ${process.env.SERVER_PORT}`)
  );
};

export default server;
