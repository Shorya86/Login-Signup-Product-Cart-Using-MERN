const jwt = require("jsonwebtoken");

const ensureAuth = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is required",
    });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded; // store decoded token info for later use
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is invalid or expired",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Forbidden, admin access required",
    });
  }
};

module.exports = { ensureAuth, isAdmin };
