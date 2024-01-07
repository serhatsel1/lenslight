import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
      } else {
        const user = await User.findById(decodedToken.userId);
        res.deneme = "hakan adam bacaksız"
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          console.log("not found TOKEN", err.message);
          res.redirect("/login");
        } else {
          next();
        }
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(404).json({
      succeded: false,
      error: "Not authorized",
    });
  }
};

export { authenticateToken, checkUser };


