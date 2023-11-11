const jwt = require("jsonwebtoken");
const user = require("./Models/User");
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (token == null) {
    return res.status(401).json("You are not authenticated ");
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      return res.status(403).send("Token is not valid! ");
    }
    req.userId = user._id;
    next();
  });
};
module.exports = verifyToken;
