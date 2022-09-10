const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    //json webtoken code
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(decoded);
      }
    });
  });
};

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });
  }
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });
  }
  //gives you the token
  const token = req.headers.authorization.trim().split(" ")[1];

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });
  }

  //decoded is an object which has all the information of user
  req.user = decoded.user;

  return next();
};

module.exports = authenticate;
