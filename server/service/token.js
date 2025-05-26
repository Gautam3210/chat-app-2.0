const jwt = require("jsonwebtoken");
const jwtSecretKey = "gatuam@malviya";

const generateToken = (data) => {
  const token = jwt.sign(data, jwtSecretKey);
  return token;
};

const verifyToken = (token) => {
  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) return res.sendStatus(403);
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
