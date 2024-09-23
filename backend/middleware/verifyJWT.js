const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    // Attach user ID to request object
    req.user = { userId: decoded.userId };
    // Pass to the next middleware
    next();
  });
};

module.exports = verifyJWT;
