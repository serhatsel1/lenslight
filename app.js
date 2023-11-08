import express from "express";

import dotenv from "dotenv";

import conn from "./db.js";

import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";

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

app.use("/", pageRoute);
app.use("/photo",photoRoute);


/* app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
}); */

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
