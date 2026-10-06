import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(400).json({
        message: "please login to access this feature",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "you are not autherized your token invalid",
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "you are not autherized user not exist with this id",
      });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    throw new Error({
      message: "authenticatin failed",
      error,
    });
  }
};
