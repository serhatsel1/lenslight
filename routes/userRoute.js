import express from "express";

import * as userController from "../controllers/userController.js";

import * as authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router
.post("/register",userController.createUser)
.post("/login",userController.loginUser)
.get("/dashboard", authMiddleware.authenticateToken, userController.getDashboardPage)

export default router;
