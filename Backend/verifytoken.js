const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;
  console.log("asd " + token);
  if (token == null) {
    return res.send("You are not authenticated ");
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      return res.status(401).send("Token is not valid! ");
    }
    req.userId = user._id;
    next();
  });
};
module.exports = verifyToken;
