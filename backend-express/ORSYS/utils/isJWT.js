const jwt = require("jsonwebtoken");

const SECRET = "secretKey";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  jwt.verify(token, SECRET, function(err, decoded) {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }

    req.user = decoded;

    next();
  });
}

module.exports = verifyToken;
