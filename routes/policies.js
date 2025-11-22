const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

const data = loadJSON("policies/data.json");

router.get("/privacy-policy", (_, res) => {
  const privacyPolicies = data.privacyPolicies;

  res.render("pages/privacy-policy", { privacyPolicies });
});

router.get("/refund-policy", (_, res) => {
  const refundPolicies = data.refundPolicies;

  res.render("pages/refund-policy", { refundPolicies });
});

module.exports = router;
