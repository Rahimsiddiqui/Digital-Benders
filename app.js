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

// ===== ROUTES =====
const landingPageRoute = require("./routes/user/landing-page");
const policiesRoutes = require("./routes/user/policies");
const contactRoute = require("./routes/user/contact");
const seoAnalysisRoute = require("./routes/user/seo-analysis");
const authRoutes = require("./routes/admin/auth");
const adminRoutes = require("./routes/admin/admin");

app.use("/", landingPageRoute);
app.use("/", policiesRoutes);
app.use("/", contactRoute);
app.use("/", seoAnalysisRoute);

app.use("/admin", authRoutes);
app.use("/admin", adminRoutes);

// ===== ADMIN LOGOUT =====
app.post("/admin/logout", (_, res) => {
  res.clearCookie("token", { path: "/" });
  res.redirect("/");
});

// ===== SERVER START =====
app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`));
