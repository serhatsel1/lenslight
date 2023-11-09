import User from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { json } from "express";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      succeded: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        err: "Kullanıcı bulunanamdı",
      });
    }
    if (same) {
      res.status(200).json({
        user,
        token: createToken(user._id),
      });
    } else {
      res.status(401).json({
        succeded: false,
        error: "şifre!!",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export { createUser, loginUser };
