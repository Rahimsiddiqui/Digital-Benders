const { express, loadJSON } = require(`../dependencies`); // Import necessary module and helper

// Initialize Express router
const router = express.Router();

// Import Policies data
const data = loadJSON("policies/data.json");

// Route to display Privacy Policy Page
router.get("/privacy-policy", (_, res) => {
  // Fetching Privacy Policy from data
  const privacyPolicies = data.privacyPolicies;

  // Rendering Privacy Policy Page
  res.render("pages/privacy-policy", { privacyPolicies });
});

// Route to display Refund Policy Page
router.get("/refund-policy", (_, res) => {
  // Fetching Refund Policy from data
  const refundPolicies = data.refundPolicies;

  // Rendering Refund Policy Page
  res.render("pages/refund-policy", { refundPolicies });
});

module.exports = router;
