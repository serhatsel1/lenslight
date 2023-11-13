import express from "express";
import * as pageController from "../controllers/pageController.js";

const router = express.Router();

router.get("/", pageController.getIndexPage);
router.get("/about", pageController.getAboutPage);
router.get("/register", pageController.getRegisterPage);
router
  .get("/login", pageController.getLoginPage)
  .get("/logout", pageController.getLogout)
  .get("/contact", pageController.getContactPage)
  .post("/contact",pageController.sendMail)

export default router;
/* 
import express from "express";

import { getAboutPage,getIndexPage } from "../controllers/pageController.js";

const router = express.Router();

router.get("/", getIndexPage);
router.get("/about", getAboutPage);


export default router;
 */
