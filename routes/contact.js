const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/contact", (_, res) => {
  const data = loadJSON("contact/data.json");

  res.render("pages/contact", { data });
});

module.exports = router;
