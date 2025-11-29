const {
  express,
  loadJSON,

  CaseStudy,
} = require("../dependencies"); // Import necessary module, helper, and Mongoose model

// Initialize Express router
const router = express.Router();

// Import Portfolio data
const data = loadJSON("portfolio/data.json");

// Fetching Contact Section Inputs from data
const contactSectionInputs = data.contactSectionInputs;

// Route to display the Portolio Page
router.get("/portfolio", async (_, res) => {
  try {
    // Fetching Case Studies from Model
    const caseStudies = await CaseStudy.find({}).lean();

    // Rendering Portfolio Page
    res.render("pages/portfolio/portfolio", {
      caseStudies,
      contactSectionInputs,
    });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).render("pages/error", {
      title: "Internal Server Error",
      code: 500,
      message: "Internal Server Error, Try Later.",
    });
  }
});

// Route to display a single Case Study Page
router.get("/casestudy/:slug", async (req, res) => {
  try {
    // Fetching Case Studies form Model
    const allStudies = await CaseStudy.find({}).lean();

    // Getting index for each Study
    const index = allStudies.findIndex((s) => s.slug === req.params.slug);

    if (index === -1) {
      return res.status(404).render("pages/error", {
        title: "Page Not Found",
        code: 404,
        message: "This page could not be found.",
      });
    }

    // Next Case Study logic
    const caseStudy = allStudies[index];

    const nextCaseStudy = allStudies[index + 1]
      ? allStudies[index + 1]
      : allStudies[0];

    // Rendering single Case Study Page
    res.render("pages/portfolio/post", {
      caseStudy,
      nextCaseStudy,
      contactSectionInputs,
    });
  } catch (err) {
    console.error("Error Occurred:", err);
    res.status(500).render("pages/error", {
      title: "Internal Server Error",
      code: 500,
      message: "Internal Server Error, Try Later.",
    });
  }
});

module.exports = router;
