const { express, loadJSON } = require("../dependencies");

const router = express.Router();

const CaseStudy = require("../models/CaseStudy");

const portfolioData = loadJSON("portfolio/data.json");
const contactSectionInputs = portfolioData.contactSectionInputs;

// Case Studies page
router.get("/portfolio", async (_, res) => {
  try {
    const caseStudies = await CaseStudy.find({}).lean();

    res.render("pages/portfolio/portfolio", {
      caseStudies,
      contactSectionInputs,
    });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).render("pages/500-error");
  }
});

// Single Case Study page
router.get("/casestudy/:slug", async (req, res) => {
  try {
    const allStudies = await CaseStudy.find({}).lean();

    const index = allStudies.findIndex((s) => s.slug === req.params.slug);

    if (index === -1) {
      return res.status(404).render("pages/404-error");
    }

    const caseStudy = allStudies[index];

    const nextCaseStudy = allStudies[index + 1]
      ? allStudies[index + 1]
      : allStudies[0];

    res.render("pages/portfolio/post", {
      caseStudy,
      nextCaseStudy,
      contactSectionInputs,
    });
  } catch (err) {
    console.error("Error Occurred:", err);
    res.status(500).render("pages/500-error");
  }
});

module.exports = router;
