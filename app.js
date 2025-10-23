require("dotenv").config();
const {
  express,
  app,
  path,
  ejsMate,
  jwt,
  bcrypt,
  User,
} = require(`./dependencies`);
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// ENV
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// ===== DATABASE CONNECTION =====
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Successfully Connected."))
  .catch((err) => console.error("MongoDB Connection Error: ", err));

// ===== APP SETUP =====
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===== MIDDLEWARE =====
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

// ===== LOGIN ROUTE =====
app.post("/login", async (req, res) => {
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

    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ===== VERIFY TOKEN MIDDLEWARE =====
function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found in cookies.");
    return res.status(403).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    res.clearCookie("token");
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// ===== ROUTES =====
const landingPageRoute = require("./routes/landing-page");
const policiesRoutes = require("./routes/policies");
const contactRoute = require("./routes/contact");
const seoAnalysisRoute = require("./routes/seo-analysis");
const authRoutes = require("./routes/admin/auth");
const adminRoutes = require("./routes/admin/admin");

app.use("/", landingPageRoute);
app.use("/", policiesRoutes);
app.use("/", contactRoute);
app.use("/", seoAnalysisRoute);

app.use("/admin", authRoutes);
app.use("/admin", adminRoutes);

// ===== ADMIN ROUTES =====
app.get("/admin/login", (_, res) => {
  res.render("pages/admin/admin-login");
});

app.get("/admin", verifyToken, (req, res) => {
  res.render("pages/admin/admin-dashboard", {
    username: req.user?.username || "Admin",
  });
});

// ===== ADMIN LOGOUT =====
app.post("/admin/logout", (_, res) => {
  res.clearCookie("token", { path: "/" });
  res.redirect("/");
});

// ===== SERVER START =====
app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`));
