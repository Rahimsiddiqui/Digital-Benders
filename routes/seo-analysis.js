const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/seo-analysis", (_, res) => {
  const data = loadJSON("seo-analysis/data.json");

  const seoAnalysisInputs = data.seoAnalysisInputs;
  const contactSectionInputs = data.contactSectionInputs;
  const brandGrowing = data.brandGrowing;
  const scoringCards = data.scoringCards;

  res.render("pages/seo-analysis", {
    seoAnalysisInputs,
    contactSectionInputs,
    brandGrowing,
    scoringCards,
  });
});

module.exports = router;
