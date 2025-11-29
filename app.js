require("dotenv").config();

const { express, path, helmet, ejsMate, loadJSON } = require(`./dependencies`);

const app = express();

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// ENV
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// const isProduction = process.env.NODE_ENV === "production";

// MISC MIDDLEWARE

// if (isProduction) {
//   console.log = () => {};
// }

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("MongoDB Error: ", err));

// LOAD FOOTER & NAVBAR JSON
const footerData = loadJSON("footer/data.json");
const navbarData = loadJSON("navbar/data.json");

// SITE-WIDE DATA
app.locals.footerData = footerData;
app.locals.navbarData = navbarData;

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
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
          "https://embed.tawk.to",
          "https://va.tawk.to",
          "https://static-v.tawk.to",
          "https://www.youtube.com",
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
          "https://embed.tawk.to",
        ],

        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://*",
          "https://embed.tawk.to",
          "https://va.tawk.to",
        ],

        mediaSrc: ["'self'", "blob:", "https://*"],

        connectSrc: [
          "'self'",
          "https://embed.tawk.to",
          "https://va.tawk.to",
          "https://vch.tawk.to",
          "https://static-v.tawk.to",
          "wss://*.tawk.to",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
          "https://*.youtube.com",
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

app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== MIDDLEWARE =====
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

// ===== ROUTES =====
const landingPageRoute = require("./routes/landing-page");
const policiesRoutes = require("./routes/policies");
const contactRoute = require("./routes/contact");
const seoAnalysisRoute = require("./routes/seo-analysis");
const blogsRoute = require("./routes/blogs");
const productionService = require("./routes/production-service");
const portfolioRoute = require("./routes/portfolio");
const testimonialsRoute = require("./routes/testimonials");

app.use("/", [
  landingPageRoute,
  policiesRoutes,
  contactRoute,
  seoAnalysisRoute,
  blogsRoute,
  productionService,
  portfolioRoute,
  testimonialsRoute,
]);

// ===== ERROR HANDLING =====
app.use((_, res) => {
  res.status(404).render("pages/error", {
    title: "Page Not Found",
    code: 404,
    message: "This page could not be found.",
  });
});

app.use((err, req, res, next) => {
  console.error("Uncaught Error: ", err);
  res.status(500).render("pages/error", {
    title: "Internal Server Error",
    code: 500,
    message: "Internal Server Error, Try Later.",
  });
});

// ===== SERVER START =====
app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`));
