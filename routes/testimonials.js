const { express, loadJSON } = require("../dependencies"); // Import necessary module and helper

// Initialize Express router
const router = express.Router();

// Import Testimonials data
const data = loadJSON("testimonials/data.json");
const trustpilot = loadJSON("misc/trustpilot.json");

// Route to display Testimonials Page
router.get("/testimonials", (_, res) => {
  // Rendering Testimonials Page
  res.render("pages/testimonials", { ...data, trustpilot });
});

module.exports = router;
