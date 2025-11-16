const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/production-service-in-canada", (_, res) => {
  const faqs = loadJSON("production-service-in-canada/faqs.json");

  res.render("pages/production-service-in-canada", { faqs });
});

module.exports = router;
