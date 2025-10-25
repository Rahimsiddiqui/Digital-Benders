require("dotenv").config();

const { mongoose, express, path, helmet, ejsMate } = require(`./dependencies`);

const app = express();

const cookieParser = require("cookie-parser");

// ENV
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const isProduction = process.env.NODE_ENV === "production";

// MISC MIDDLEWARE

// if (isProduction) {
//   console.log = () => {};
// }

app.set("trust proxy", 1);

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

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
          "https://embed.tawk.to",
          "https://www.youtube.com",
          "https://www.google.com",
          "https://www.gstatic.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
          "https://embed.tawk.to",
        ],
        fontSrc: [
          "'self'",
          "data:",
          "https://fonts.gstatic.com",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
          "https://embed.tawk.to",
          "https://*.tawk.to",
        ],

        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://*",
          "https://embed.tawk.to",
        ],
        mediaSrc: ["'self'", "https://*", "blob:"],
        connectSrc: [
          "'self'",
          "https://*",
          "wss://*",
          "https://embed.tawk.to",
          "https://*.tawk.to",
          "wss://*.tawk.to",
          "https://youtube.com",
          "https://*.youtube.com",
          "https://*.google.com",
        ],
        frameSrc: [
          "'self'",
          "https://www.youtube.com",
          "https://player.vimeo.com",
          "https://embed.tawk.to",
        ],
      },
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===== MIDDLEWARE =====
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

app.use("/admin", (_, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private, max-age=0"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
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
  res.clearCookie("token", {
    path: "/",
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
  });

  return res.redirect("/admin/login");
});

// ===== ERROR HANDLING =====
app.use((_, res) => {
  res.status(404).send("404 | Page Not Found");
});

app.use((err, req, res, next) => {
  console.error("Uncaught Error: ", err);
  res.status(500).send("500 | Internal Server Error");
});

// ===== SERVER START =====
app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`));
