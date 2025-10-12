const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/privacy-policy", (_, res) => {
  const privacyPolicy = loadJSON("privacy-policy/privacyPolicy.json");
  res.render("pages/privacy-policy", { privacyPolicy });
});

router.get("/refund-policy", (_, res) => {
  const refundPolicy = loadJSON("refund-policy/refundPolicy.json");
  res.render("pages/refund-policy", { refundPolicy });
});

module.exports = router;
