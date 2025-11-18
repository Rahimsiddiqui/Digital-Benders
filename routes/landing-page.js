const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/", (_, res) => {
  const data = loadJSON("landing-page/data.json");
  const trustpilot = loadJSON("misc/trustpilot.json");

  res.render("pages/landing-page", {
    data,
    trustpilot,
  });
});

module.exports = router;
