const { express, loadJSON } = require(`../../dependencies`);
const router = express.Router();

router.get("/", (_, res) => {
  const brandGrowing = loadJSON("landing-page/brandGrowing.json");
  const services = loadJSON("landing-page/services.json");
  const caseStudies = loadJSON("landing-page/caseStudies.json");
  const results = loadJSON("landing-page/results.json");
  const testimonials = loadJSON("landing-page/testimonials.json");
  const developmentProcess = loadJSON("landing-page/developmentProcess.json");
  const faqs = loadJSON("landing-page/faqs.json");
  const recentArticles = loadJSON("landing-page/recentArticles.json");
  const trustpilot = loadJSON("misc/trustpilot.json");

  res.render("pages/user/landing-page", {
    caseStudies,
    services,
    results,
    testimonials,
    brandGrowing,
    developmentProcess,
    recentArticles,
    faqs,
    trustpilot,
  });
});

module.exports = router;
