import express from "express";

import * as userController from "../controllers/userController.js";

import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .post("/register", userController.createUser)
  .post("/login", userController.loginUser)
  .get(
    "/dashboard",
    authMiddleware.authenticateToken,
    userController.getDashboardPage
  )
  .get("/", authMiddleware.authenticateToken, userController.getAllUsers)
  .get("/:id", authMiddleware.authenticateToken, userController.getAUser)
  .put("/:id/follow",authMiddleware.authenticateToken,userController.follow)
  .put("/:id/unfollow",authMiddleware.authenticateToken,userController.unfollow)
export default router;
