const { express, loadJSON } = require(`../dependencies`); // Import necessary modules, helpers

// Initialize Express router
const router = express.Router();

// Import Seo Analysis data
const data = loadJSON("seo-analysis/data.json");

router.get("/seo-analysis", (_, res) => {
  // Rendering Seo Analysis Page
  res.render("pages/seo-analysis", {
    ...data,
  });
});

module.exports = router;
