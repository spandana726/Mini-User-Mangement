import express from "express";
import {
  getAllUsers,
  activateUser,
  deactivateUser
} from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", authMiddleware, getAllUsers);
router.patch("/users/:id/activate", authMiddleware, activateUser);
router.patch("/users/:id/deactivate", authMiddleware, deactivateUser);

export default router;
