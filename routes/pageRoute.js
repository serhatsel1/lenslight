import express from "express";
import * as pageController from "../controllers/pageController.js";


const router = express.Router();

router.get("/", pageController.getIndexPage);
router.get("/about", pageController.getAboutPage);

export default router;
/* 
import express from "express";

import { getAboutPage,getIndexPage } from "../controllers/pageController.js";

const router = express.Router();

router.get("/", getIndexPage);
router.get("/about", getAboutPage);


export default router;
 */
