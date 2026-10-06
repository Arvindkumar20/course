import express from "express";
import "dotenv/config";
import { connectBD } from "./config/connectDB.js";
import { User } from "./models/user.model.js";
import { login, register, updateUser } from "./controllers/auth.controller.js";
import { authenticate } from "./middleware/auth.middleware.js";
import { createTask, deleteTask, getAlltaskbyOwner } from "./controllers/task.controller.js";
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

app.get("/api/users", authenticate, async (req, res) => {
  try {
    const users = await User.find();
    if (users.length <= 0) {
      return res.status(404).json({
        message: "users data not found",
      });
    }

    return res.json({
      message: "users data fetched successfully",
      users,
      totalUsers: users.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "users data not found",
      error,
    });
  }
});

app.get("/api/user", authenticate, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user data not found",
      });
    }

    return res.json({
      message: "users data fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "users data not found",
      error,
    });
  }
});
//this api is to register or sign up
app.post("/api/auth/sign-up", register);
app.post("/api/auth/login", login);
app.put("/api/auth/update-user", authenticate, updateUser);
app.delete("/api/delete-user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        message: "user data not found",
      });
    }

    return res.json({
      message: "user deleted successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "user  not deleted",
      error,
    });
  }
});

// task apis

app.post("/api/task", authenticate, createTask);
app.delete("/api/task/:taskId", authenticate, deleteTask);
app.get("/api/task/", authenticate, getAlltaskbyOwner);

app.listen(PORT, () => {
  console.log("server is running on ", `http://localhost:${PORT}`);
});
