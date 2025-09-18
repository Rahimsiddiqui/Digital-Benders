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
  const brandGrowing = loadJSON("brandGrowing.json");
  const services = loadJSON("services.json");
  const caseStudies = loadJSON("caseStudies.json");
  const results = loadJSON("results.json");
  const testimonials = loadJSON("testimonials.json");
  const developmentProcess = loadJSON("developmentProcess.json");

  res.render("pages/landing-page", {
    caseStudies,
    services,
    results,
    testimonials,
    brandGrowing,
    developmentProcess,
  });
});

app.listen(3000, (req, res) => {
  console.log(`Server Started... (Express)`);
});
