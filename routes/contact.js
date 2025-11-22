const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

const data = loadJSON("contact/data.json");

router.get("/contact", (_, res) => {
  res.render("pages/contact", { ...data });
});

module.exports = router;
