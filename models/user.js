import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed

  dailyCount: { type: Number, default: 0 },
  lastReset: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);