const { express, app, path, ejsMate, fs } = require(`./dependecies`);

app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);

function loadJSON(file) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", file), "utf-8")
  );
}

app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

app.use(express.static(path.join(__dirname, `public`)));

app.engine(`ejs`, ejsMate);

app.get("/", (req, res) => {
  const brandGrowing = loadJSON("landing-page/brandGrowing.json");
  const services = loadJSON("landing-page/services.json");
  const caseStudies = loadJSON("landing-page/caseStudies.json");
  const results = loadJSON("landing-page/results.json");
  const testimonials = loadJSON("landing-page/testimonials.json");
  const developmentProcess = loadJSON("landing-page/developmentProcess.json");
  const recentArticles = loadJSON("landing-page/recentArticles.json");
  const faqs = loadJSON("landing-page/faqs.json");

  res.render("pages/landing-page", {
    caseStudies,
    services,
    results,
    testimonials,
    brandGrowing,
    developmentProcess,
    recentArticles,
    faqs,
  });
});

app.listen(3000, (req, res) => {
  console.log(`Server Started... (Express)`);
});
