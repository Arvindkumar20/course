import mongoose from "mongoose";

export const connectBD = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
