const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.params.id = decoded.social_secu_number;
    return next();
  });

  // Add a final return statement after the jwt.verify() callback
  return undefined;
};

module.exports = verifyJWT;
