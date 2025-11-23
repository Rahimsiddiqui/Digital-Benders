const { express, loadJSON } = require(`../dependencies`); // Import necessary module and helper

// Initialize Express router
const router = express.Router();

// Import Contact data
const data = loadJSON("contact/data.json");

// Route to display the main contact page
router.get("/contact", (_, res) => {
  res.render("pages/contact", { ...data });
});

module.exports = router;
