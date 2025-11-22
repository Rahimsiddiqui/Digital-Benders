const { express, getCaseStudies } = require("../dependencies");

const router = express.Router();

const { caseStudies, contactSectionInputs } = getCaseStudies();

// Case Studies page
router.get("/portfolio", (_, res) => {
  res.render("pages/portfolio/portfolio", {
    caseStudies,
    contactSectionInputs,
  });
});

// Single Case Study page
router.get("/casestudy/:slug", (req, res) => {
  const index = caseStudies.findIndex((s) => s.slug === req.params.slug);

  if (index === -1) {
    return res.status(404).render("pages/404-error");
  }

  const caseStudy = caseStudies[index];

  const nextCaseStudy = caseStudies[index + 1]
    ? caseStudies[index + 1]
    : caseStudies[0];

  res.render("pages/portfolio/post", {
    caseStudy,
    nextCaseStudy,
    contactSectionInputs,
  });
});

module.exports = router;
