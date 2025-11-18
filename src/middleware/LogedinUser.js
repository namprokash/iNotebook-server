const jwt = require("jsonwebtoken");
const jwtSecretKey = "thisisasecretkey";

// == Checking user logedin or not ============

const logedinUser = (req, res, next) => {
  const jwtToken = req.cookies.token;

  if (!jwtToken) {
    return res.status(401).send("Authentication faild!");
  }
  try {
    const data = jwt.verify(jwtToken, jwtSecretKey);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Authentication faild! error");
  }
};

module.exports = logedinUser;
