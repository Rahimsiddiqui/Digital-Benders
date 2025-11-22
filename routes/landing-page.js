const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

const data = loadJSON("landing-page/data.json");
const trustpilot = loadJSON("misc/trustpilot.json");

const CaseStudy = require("../models/CaseStudy");
const Blog = require("../models/Blog");

router.get("/", async (_, res) => {
  try {
    const [caseStudies, blogs] = await Promise.all([
      CaseStudy.find({}).lean(),
      Blog.find({}).sort({ date: -1 }).lean(),
    ]);

    res.render("pages/landing-page", {
      ...data,
      blogs,
      trustpilot,
      caseStudies,
    });
  } catch (err) {
    console.error("Landing Page Error: ", err);
    res.status(500).render("pages/500-error");
  }
});

module.exports = router;
