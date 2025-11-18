const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/production-service-in-canada", (_, res) => {
  const data = loadJSON("production-service/data.json");

  res.render("pages/production-service", { data });
});

module.exports = router;
