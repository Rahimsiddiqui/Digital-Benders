require("dotenv").config();

const { express, path, helmet, ejsMate, loadJSON } = require(`./dependencies`);

const app = express();
const cookieParser = require("cookie-parser");

// ENV
const PORT = process.env.PORT;

// const isProduction = process.env.NODE_ENV === "production";

// MISC MIDDLEWARE

// if (isProduction) {
//   console.log = () => {};
// }

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
const productionServiceInCanada = require("./routes/production-service");

app.use("/", [
  landingPageRoute,
  policiesRoutes,
  contactRoute,
  seoAnalysisRoute,
  blogsRoute,
  productionServiceInCanada,
]);

// ===== ERROR HANDLING =====
app.use((_, res) => {
  res.status(404).send("404 | Page Not Found");
});

// app.use((err, req, res, next) => {
//   console.error("Uncaught Error: ", err);
//   res.status(500).send("500 | Internal Server Error");
// });

// ===== SERVER START =====
app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`));
