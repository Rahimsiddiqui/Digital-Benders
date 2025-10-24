const { jwt } = require(`../dependencies`);

// ENV
const JWT_SECRET = process.env.JWT_SECRET;

// ===== VERIFY TOKEN MIDDLEWARE =====
module.exports = function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found in cookies.");
    return res.status(403).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    res.clearCookie("token");
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
