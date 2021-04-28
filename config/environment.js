require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  HOST_DB: process.env.HOST_DB,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
