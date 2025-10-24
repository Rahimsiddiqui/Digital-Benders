const { express, loadJSON } = require(`../../dependencies`);
const router = express.Router();

router.get("/contact", (_, res) => {
  const faqs = loadJSON("contact/faqs.json");

  res.render("pages/user/contact", { faqs });
});

module.exports = router;
