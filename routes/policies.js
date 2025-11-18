const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

const data = loadJSON("policies/data.json");

router.get("/privacy-policy", (_, res) => {
  res.render("pages/privacy-policy", { data });
});

router.get("/refund-policy", (_, res) => {
  res.render("pages/refund-policy", { data });
});

module.exports = router;
