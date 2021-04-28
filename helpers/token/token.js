const { JWT_SECRET_KEY } = require("../../config");
const Jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const { _id, name, email } = user;
  const token = Jwt.sign({ _id, name, email }, JWT_SECRET_KEY);

  return token;
};

module.exports = generateToken;
