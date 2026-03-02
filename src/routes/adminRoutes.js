import express from "express";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();



router.get("/statistics", adminController.getDashboardStats);

export default router;
