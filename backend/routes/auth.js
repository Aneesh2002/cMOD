import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";

const router = express.Router();

// --- Step 1: Signup / Get Nonce ---
router.post("/signup", async (req, res) => {
  const { username, wallet } = req.body;
  if (!username || !wallet) return res.status(400).json({ message: "Missing fields" });

  let user = await User.findOne({ wallet });
  if (!user) {
    user = new User({ username, wallet });
    await user.save();
  }
  res.json({ nonce: user.nonce });
});

// --- Step 2: Verify Signature & Login ---
router.post("/login", async (req, res) => {
  const { wallet, signature } = req.body;
  if (!wallet || !signature) return res.status(400).json({ message: "Missing fields" });

  const user = await User.findOne({ wallet });
  if (!user) return res.status(404).json({ message: "User not found" });

  const message = `Sign this nonce to login: ${user.nonce}`;
  const recovered = ethers.verifyMessage(message, signature);

  if (recovered.toLowerCase() !== wallet.toLowerCase())
    return res.status(401).json({ message: "Invalid signature" });

  // Reset nonce after successful login
  user.nonce = Math.floor(Math.random() * 1000000).toString();
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, username: user.username, roles: user.roles, wallet: user.wallet });
});

export default router;
