import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import conn from "./db.js";

import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import {checkUser} from "./middlewares/authMiddleware.js"
dotenv.config();

// connection to do db
conn();

const app = express();
const port = process.env.PORT;

//? ejs template engine

app.set("view engine", "ejs");
app.set("views", "views");

//?static files middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("*", checkUser);
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);

/* app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");d
}); */

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
