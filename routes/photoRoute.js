import express from "express";

import * as photoController from "../controllers/photoController.js";

const router = express.Router();

router.post("/", photoController.creatPhoto);

export default router;
