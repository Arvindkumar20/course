import express from "express";
import "dotenv/config";
import { connectBD } from "./config/connectDB.js";
import { User } from "./models/user.model.js";
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

app.get("/api/users", async (req, res) => {
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
//this api is to register or sign up
app.post("/api/auth/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name == "" || email == "" || password == "") {
      return res.status(400).json({
        message: "all fileds are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(422).json({
        message: "please enter valid email",
      });
    }

    if (password.length < 8) {
      return res.status(422).json({
        message: "enter atleats 8 charactors in password",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      return res.status(500).json({
        message: "users account not created",
      });
    }

    return res.json({
      message: "user account created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "users account not created",
      error,
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email.includes("@")) {
      return res.status(422).json({
        message: "please enter valid email",
      });
    }

    if (password.length < 8) {
      return res.status(422).json({
        message: "enter atleats 8 charactors in password",
      });
    }

    const user = await User.findOne({
      email,
    });
console.log(user)
    if (!user) {
      return res.status(404).json({
        message: "user not exist with this email",
        email,
      });
    }
    if (user.password != password) {
      return res.status(400).json({
        message: "incorrect password please enter correct password",
      });
    }

    return res.json({
      message: "user loggined successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "user not veryfied",
      error,
    });
  }
});
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

app.listen(PORT, () => {
  console.log("server is running on ", `http://localhost:${PORT}`);
});
