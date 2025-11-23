const { express, loadJSON } = require(`../dependencies`); // Import necessary module and helper

// Initialize Express router
const router = express.Router();

// Import Production Service data
const data = loadJSON("production-service/data.json");

// Route to display Production Service Page
router.get("/production-service-in-canada", (_, res) => {
  // Rendering Production Service Page
  res.render("pages/production-service", {
    ...data,
  });
});

module.exports = router;
