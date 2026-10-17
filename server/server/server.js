import express from "express";
import "dotenv/config";
import { connectBD } from "./config/connectDB.js";
import { User } from "./models/user.model.js";
import { login, register, updateUser } from "./controllers/auth.controller.js";
import { authenticate } from "./middleware/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getAlltaskbyOwner,
} from "./controllers/task.controller.js";
import { authRouter } from "./routes/auth.route.js";
import { taskRouter } from "./routes/task.route.js";
import cors from "cors";
import { RTSPRouter } from "./rtsp.controller.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
connectBD();

app.get("/health", (req, res) => {
  return res.json({
    message: "OK",
  });
});
//this api is to register or sign up
app.use("/api/auth", authRouter);
// task apis
app.use("/api/task", taskRouter);
app.use("/api/rtsp", RTSPRouter);
// Centralized errors
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ error: "Invalid camera data" });
  }

  if (error.code === 11000) {
    return res.status(409).json({ error: "Duplicate camera path" });
  }

  console.error("Request failed:", error.message);
  return res.status(500).json({ error: "Internal server error" });
});
app.listen(PORT, () => {
  console.log("server is running on ", `http://localhost:${PORT}`);
});
