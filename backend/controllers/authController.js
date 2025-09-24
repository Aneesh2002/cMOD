import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register
export const registerUser = async (req, res) => {
  try {
    const { role, name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ role, name, email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ error: "Invalid email/role" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secretKey", { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.json({ message: "Login successful", role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
