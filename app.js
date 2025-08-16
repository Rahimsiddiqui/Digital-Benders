const {
  express,
  mongoose,
  app,
  path,
  ejs,
  ejsMate,
} = require("./Views/Dependencies/dependencies.js");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log(`Connection Open... (Mongoose)`);
  })
  .catch((e) => {
    console.log(`An Error Occurred... (${e})`);
  });

app.set(`Views`, path.join(__dirname, `Views`));
app.set(`view engine`, `ejs`);

app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

app.use(express.static(path.join(__dirname, `Public`)));

app.engine(`ejs`, ejsMate);

app.get(`/`, (req, res) => {
  res.render(`Pages/landing-page/landingPage`);
});

app.get(`/privacy-policy`, (req, res) => {
  res.render(`Pages/privacy-policy/privacyPolicy`);
});

app.get(`/refund-policy`, (req, res) => {
  res.render(`Pages/refund-policy/refundPolicy`);
});

app.get(`/become-client`, (req, res) => {
  res.render(`Pages/become-client/becomeClient`);
});

app.get(`/seo-analysis`, (req, res) => {
  res.render(`Pages/seo-analysis/seoAnalysis`);
});

app.get(`/who-we-are`, (req, res) => {
  res.render(`Pages/who-we-are/whoWeAre`);
});

app.get(`/digital-media-services-in-canada`, (req, res) => {
  res.render(`Pages/digital-media-services/digitalMediaServices`);
});

app.get(`/production-services-in-canada`, (req, res) => {
  res.render(`Pages/production-services/productionServices`);
});

app.listen(3000, (req, res) => {
  console.log(`Server Started... (Express)`);
});
