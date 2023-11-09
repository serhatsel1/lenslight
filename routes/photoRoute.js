import express from "express";

import * as photoController from "../controllers/photoController.js";

const router = express.Router();

router
  .post("/", photoController.creatPhoto)
  .get("/", photoController.getAllPhotos)
  .get("/:id", photoController.getAPhoto);

export default router;
