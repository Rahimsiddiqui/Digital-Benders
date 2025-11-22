const { express, loadJSON, getCaseStudies } = require(`../dependencies`);
const router = express.Router();

const data = loadJSON("landing-page/data.json");

const blogs = loadJSON("blogs/blogs.json");
const trustpilot = loadJSON("misc/trustpilot.json");

router.get("/", (_, res) => {
  const { caseStudies } = getCaseStudies();

  res.render("pages/landing-page", {
    ...data,
    blogs,
    trustpilot,
    caseStudies,
  });
});

module.exports = router;
