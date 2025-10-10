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

app.get("/", (_, res) => {
  const brandGrowing = loadJSON("landing-page/brandGrowing.json");
  const services = loadJSON("landing-page/services.json");
  const caseStudies = loadJSON("landing-page/caseStudies.json");
  const results = loadJSON("landing-page/results.json");
  const testimonials = loadJSON("landing-page/testimonials.json");
  const developmentProcess = loadJSON("landing-page/developmentProcess.json");
  const faqs = loadJSON("misc/faqs.json");
  const recentArticles = loadJSON("landing-page/recentArticles.json");
  const trustpilot = loadJSON("misc/trustpilot.json");

  res.render("pages/landing-page", {
    caseStudies,
    services,
    results,
    testimonials,
    brandGrowing,
    developmentProcess,
    recentArticles,
    faqs,
    trustpilot,
  });
});

app.get("/privacy-policy", (_, res) => {
  const privacyPolicy = loadJSON("privacy-policy/privacyPolicy.json");

  res.render("pages/privacy-policy", { privacyPolicy });
});

app.get("/privacy-policy", (_, res) => {
  const privacyPolicy = loadJSON("privacy-policy/privacyPolicy.json");

  res.render("pages/privacy-policy", { privacyPolicy });
});

app.get("/refund-policy", (_, res) => {
  const refundPolicy = loadJSON("refund-policy/refundPolicy.json");

  res.render("pages/refund-policy", { refundPolicy });
});

app.get("/contact", (_, res) => {
  const faqs = loadJSON("misc/faqs.json");

  res.render("pages/contact", { faqs });
});

app.listen(3000, () => {
  console.log(`Server Started... (Express)`);
});
