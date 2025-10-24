const { express, loadJSON } = require(`../../dependencies`);
const router = express.Router();

router.get("/seo-analysis", (_, res) => {
  const brandGrowing = loadJSON("seo-analysis/brandGrowing.json");
  const scoringCards = loadJSON("seo-analysis/scoringCards.json");

  res.render("pages/user/seo-analysis", { brandGrowing, scoringCards });
});

module.exports = router;
