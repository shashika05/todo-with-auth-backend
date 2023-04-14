const jwt = require("jsonwebtoken");

const validate = (req, res) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, "RANDOM_TOKEN");
    res.send(verified);
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

module.exports = validate;
