const { express, loadJSON } = require("../dependencies");
const router = express.Router();

router.get("/portfolio", (_, res) => {
  const data = loadJSON("portfolio/data.json");

  res.render("pages/portfolio", { data });
});

module.exports = router;
