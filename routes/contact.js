const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/contact", (_, res) => {
  const faqs = loadJSON("contact/faqs.json");

  res.render("pages/contact", { faqs });
});

module.exports = router;
