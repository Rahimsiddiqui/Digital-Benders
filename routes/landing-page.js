const {
  express,
  loadJSON,
  formatDate,

  Blog,
  CaseStudy,
} = require(`../dependencies`); // Import necessary modules, helpers, and Mongoose models

// Initialize Express router
const router = express.Router();

// Importing Landing Page data and Trustpilot
const data = loadJSON("landing-page/data.json");
const trustpilot = loadJSON("misc/trustpilot.json");

// Route to display the landing page
router.get("/", async (_, res) => {
  try {
    // Fetch Case Studies and latest Blogs simultaneously from the DB
    const [caseStudies, latestBlogs] = await Promise.all([
      CaseStudy.find({}).limit(7).lean(),
      Blog.find({}).sort({ date: -1 }).limit(8).lean(),
    ]);

    // Map over fetched blogs and apply date formatting helper
    const formattedBlogs = latestBlogs.map((b) => ({
      ...b,
      date: formatDate(b.date),
    }));

    // Rendering Landing Page
    res.render("pages/landing-page", {
      ...data,
      blogs: formattedBlogs,
      trustpilot,
      caseStudies,
    });
  } catch (err) {
    console.error("Landing Page Error: ", err);
    res.status(500).render("pages/error", {
      title: "Internal Server Error",
      code: 500,
      message: "Internal Server Error, Try Later.",
    });
  }
});

module.exports = router;
