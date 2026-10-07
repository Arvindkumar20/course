import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  login,
  register,
  updateUser,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", register);
router.post("/login", login);
router.put("/update-user", authenticate, updateUser);
router.delete("/delete-user/:userId", authenticate, deleteUser);
router.get("/user", authenticate, getUser);
router.get("/users", authenticate, getAllUsers);
export const authRouter = router;