const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/production-service-in-canada", (_, res) => {
  const data = loadJSON("production-service/data.json");
  const faqs = loadJSON("production-service/faqs.json");

  res.render("pages/production-service", { data, faqs });
});

module.exports = router;
