const { express, loadJSON, formatDate } = require(`../dependencies`);
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

    const formattedBlogs = blogs.map((b) => ({
      ...b,
      date: formatDate(b.date),
    }));

    res.render("pages/landing-page", {
      ...data,
      blogs: formattedBlogs,
      trustpilot,
      caseStudies,
    });
  } catch (err) {
    console.error("Landing Page Error: ", err);
    res.status(500).render("pages/500-error");
  }
});

module.exports = router;
