const { express, app, path, ejsMate } = require(`./dependecies`);

app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);

app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

app.use(express.static(path.join(__dirname, `public`)));

app.engine(`ejs`, ejsMate);

app.get(`/`, (req, res) => {
  res.render(`pages/landing-page`);
});

app.listen(3000, (req, res) => {
  console.log(`Server Started... (Express)`);
});
