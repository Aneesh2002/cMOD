import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  wallet: { type: String, required: true, unique: true },
  roles: { type: [String], default: ["consumer"] },
  nonce: { type: String, default: () => Math.floor(Math.random() * 1000000).toString() },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
