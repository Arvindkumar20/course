import express from "express";
import "dotenv/config";
import { connectBD } from "./config/connectDB.js";
import { User } from "./models/user.model.js";
import { login, register, updateUser } from "./controllers/auth.controller.js";
import { authenticate } from "./middleware/auth.middleware.js";
import { createTask, deleteTask, getAlltaskbyOwner } from "./controllers/task.controller.js";
import { authRouter } from "./routes/auth.route.js";
import { taskRouter } from "./routes/task.route.js";
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
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
app.use("/api/auth",authRouter);
// task apis
app.use("/api/task",taskRouter);


app.listen(PORT, () => {
  console.log("server is running on ", `http://localhost:${PORT}`);
});
