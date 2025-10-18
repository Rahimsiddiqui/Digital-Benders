const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/seo-analysis", (_, res) => {
  const faqs = loadJSON("misc/faqs.json");
  const brandGrowing = loadJSON("seo-analysis/brandGrowing.json");

  res.render("pages/seo-analysis", { faqs, brandGrowing });
});

module.exports = router;
