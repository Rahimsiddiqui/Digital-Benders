const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/seo-analysis", (_, res) => {
  const data = loadJSON("seo-analysis/data.json");

  res.render("pages/seo-analysis", { data });
});

module.exports = router;
