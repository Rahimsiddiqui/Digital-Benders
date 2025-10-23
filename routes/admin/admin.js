const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/dashboard", auth, (req, res) => {
  res.render("/pages/admin/admin-dashboard", { username: req.user.username });
});

module.exports = router;
