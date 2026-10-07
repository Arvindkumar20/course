import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createTask, deleteTask, getAlltaskbyOwner,updateTask } from "../controllers/task.controller.js";
const router=express.Router();
router.post("/", authenticate, createTask);
router.delete("/:taskId", authenticate, deleteTask);
router.get("/", authenticate, getAlltaskbyOwner);
router.put("/:taskId",authenticate,updateTask);
export const taskRouter=router;