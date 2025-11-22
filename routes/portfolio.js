const { express, saveJSON, loadJSON } = require("../dependencies");
const ejs = require("ejs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const data = loadJSON("portfolio/caseStudies.json");
const caseStudies = data.caseStudies;
const contactSectionInputs = data.contactSectionInputs;

// Add slug to each case study
let changed = false;
caseStudies.forEach((study) => {
  if (!study.slug) {
    study.slug = uuidv4();
    changed = true;
  }
});

// Save JSON only once at startup
if (changed) {
  data.caseStudies = caseStudies;
  saveJSON("portfolio/caseStudies.json", data);
}

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
