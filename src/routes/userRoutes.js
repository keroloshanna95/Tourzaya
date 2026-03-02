import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.patch("/change-password", userController.changePassword);

export default router;
