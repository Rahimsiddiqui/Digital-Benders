const { express, jwt, bcrypt, User } = require(`../../dependencies`);
const router = express.Router();
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { message: "Too many login attempts. Try again later." },
});

// ===== Admin Login Page =====
router.get("/login", (_, res) => {
  res.render("pages/admin/admin-login");
});

// ===== Handle Admin Login =====
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid input type" });
    }

    const user = await User.findOne({ username: username.trim() });
    if (!user) return res.status(401).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
