const { jwt } = require(`../dependencies`);

// ENV
const JWT_SECRET = process.env.JWT_SECRET;

// ===== VERIFY TOKEN MIDDLEWARE =====
module.exports = function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.redirect("/admin/login");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.clearCookie("token", {
      path: "/",
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
    });
    return res.redirect("/admin/login");
  }
};
