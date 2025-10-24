const { jwt } = require(`../dependencies`);

module.exports = function (req, res, next) {
  const token = req.cookies.token; // cookie-parser reads cookies

  if (!token) {
    return res.redirect("/admin/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    res.clearCookie("token");
    return res.redirect("/admin/login");
  }
};
