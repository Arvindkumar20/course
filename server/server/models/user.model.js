import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "user email is required "],
      unique: [true],
    },
    password: {
      type: String,
      required: true,
      maxLength: [8, `password must be 8 charators`],
      select: false,
    },
    role:{
      enum:["user","admin","super-admin"],
    }
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("users", userSchema);
