import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signIn", authController.signIn);
router.post("/logout", authController.logout);

router.get("/authCheck", authController.protect, authController.authCheck);

export default router;
