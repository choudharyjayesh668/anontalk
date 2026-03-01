const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey"; // 🔥 SINGLE SOURCE OF TRUTH

// ================= REGISTER =================
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashed });

        res.status(201).json({ message: "User registered" });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: err.message });
    }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ✅ CREATE TOKEN (IMPORTANT)
        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: err.message });
    }
};