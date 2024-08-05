import mongoose from "mongoose";

export const connect = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error(error);
  }
};
