import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const generate = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    if (!token) {
      throw new Error("token not genrated");
    }
    return token;
  } catch (error) {
    console.log(error);
    throw new Error({ message: "token not genrated", error });
  }
};

export const register = async (req, res) => {
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

    const token = await generate({ userId: user._id });
    if (!token) {
      return res.json({
        message: "token not generated",
      });
    }
    return res.status(201).json({
      message: "user account created successfully",
      user: { ...user._doc, token },
    });
  } catch (error) {
    return res.status(500).json({
      message: "users account not created",
      error,
    });
  }
};

export const login = async (req, res) => {
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
    }).select("+password");
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
    user.password = "";

    const token = await generate({ userId: user._id });
    console.log(token);
    if (!token || token == null || token == " ") {
      return res.status(500).json({
        message: "token not genrated",
      });
    }
    return res.status(200).json({
      message: "user loggined successfully",
      user: { ...user._doc, token },
    });
  } catch (error) {
    return res.status(500).json({
      message: "user not veryfied",
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.userId;
  const { email, name } = req.body;

  if (!email.includes("@")) {
    return res.status(422).json({
      message: "please enter valid email",
    });
  }
  if (name && name == "") {
    return res.status(400).json({
      message: "please enter your name",
    });
  }
  try {
    const user = await User.findByIdAndUpdate(userId, {
      name,
      email,
    });

    if (!user || user == null) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "user updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "user not updated",
      error,
    });
  }
};
