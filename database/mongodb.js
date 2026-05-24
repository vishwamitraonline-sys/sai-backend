import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI;

    if (!URI) {
      throw new Error("MONGO_URI not found in .env");
    }

    await mongoose.connect(URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;