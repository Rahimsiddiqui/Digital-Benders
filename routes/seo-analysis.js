const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/seo-analysis", (_, res) => {
  const faqs = loadJSON("misc/faqs.json");
  res.render("pages/seo-analysis", { faqs });
});

module.exports = router;
