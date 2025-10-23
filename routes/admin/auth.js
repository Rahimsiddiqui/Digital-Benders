const { express, jwt, bcrypt, User } = require(`../../dependencies`);
const router = express.Router();

// ===== Admin Login Page =====
router.get("/login", (_, res) => {
  res.render("pages/admin/admin-login");
});

// ===== Handle Admin Login =====
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const admin = await User.findOne({ username });
    if (!admin) return res.status(401).send("User not found");

    // Compare hashed password
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) return res.status(401).send("Invalid password");

    // Generate token
    const token = jwt.sign(
      { username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true if using HTTPS
      sameSite: "lax",
    });

    // ✅ Redirect to actual admin dashboard route
    res.redirect("/admin");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
