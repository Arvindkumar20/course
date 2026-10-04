import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import { User } from "./user.model.js";
const app = express();
const port = process.env.PORT;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongo db connected");
  } catch (error) {
    console.log(error);
  }
};
connectMongoDb();
// app.use(express.urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors());

// app.get()

const users = [
  {
    name: "Arvind",
    email: "arvind@gmail.com",
  },
  {
    name: "raj",
    email: "raj@gmail.com",
  },
];

app.post("/api/user", async (req, res) => {
  const body = req.body;
  console.log(req);
  console.log(body);
  try {
    const user = await User.create(body);
    if (!user) {
      return res.json({
        message: "user not create",
        status: false,
        statusCode: 400,
      });
    }
    return res.json({
      message: "user saved successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json(error);
    console.log(error);
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    if (users.length <= 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.json({
      users,
      message: "user fetched successfully",
    });
  } catch (error) {
    return res.json(error);
  }
});

app.get("/api/user", async (req, res) => {
  let user;

  try {
    user = await User.find();
    console.log(user);
  } catch (error) {
    console.log(error);
  }

  return res.json({
    user,
    message: "user fetched successfully",
  });
});

app.get("/health", (req, res) => {
  return res.json({
    message: "Ok",
  });
});

app.get("/contact", (req, res) => {
  return res.send(`
        <h1>Welcome to contact page</h1>
        `);
});

app.post("/", (req, res) => {});
// app.put()
// app.delete()
// app.patch()
// name,email,pass,
app.listen(port, () => {
  console.log(
    "server is running on port ",
    port,
    `Visit : http://localhost:${port}`,
  );
});
