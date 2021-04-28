const { JWT_SECRET_KEY } = require("../../config");
const Jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const { name, email } = user;
  const token = Jwt.sign({ name, email }, JWT_SECRET_KEY);

  return token;
};

module.exports = generateToken;
