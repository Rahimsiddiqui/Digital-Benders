require("dotenv").config();
const { express, app, path, ejsMate } = require(`./dependencies`);

// ENV
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Mongoose
const mongoose = require(`mongoose`);

// Connecting to Mongoose
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Successfully Connected."))
  .catch((err) => console.error(err));

// setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

// routers
const landingPageRoute = require("./routes/landing-page");
const policiesRoutes = require("./routes/policies");
const contactRoute = require("./routes/contact");
const seoAnalysisRoute = require("./routes/seo-analysis");

app.use("/", landingPageRoute);
app.use("/", policiesRoutes);
app.use("/", contactRoute);
app.use("/", seoAnalysisRoute);

app.listen(PORT, () => {
  console.log(`Server Started On Port: ${PORT}!`);
});
