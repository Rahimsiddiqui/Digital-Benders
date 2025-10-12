const { express, app, path, ejsMate } = require(`./dependencies`);

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

app.listen(3000, () => {
  console.log(`Server Started... (Express)`);
});
