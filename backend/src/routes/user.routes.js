import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getCurrentUser,
  updateProfile,
  changePassword
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);

router.put("/me", authMiddleware, updateProfile);

router.put("/change-password", authMiddleware, changePassword);

export default router;
