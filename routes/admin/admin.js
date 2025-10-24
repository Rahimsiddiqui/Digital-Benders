const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");

router.get("/", (_, res) => {
  res.redirect("/admin/dashboard");
});

router.get("/dashboard", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Forbidden");
  }

  res.render("pages/admin/admin-dashboard", {
    username: req.user?.username || "Admin",
  });
});

module.exports = router;
