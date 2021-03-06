const connection = require("./connection");
const { HOST_DB, PORT, JWT_SECRET_KEY, NODE_ENV } = require("./environment");

console.log(NODE_ENV);
if (NODE_ENV === "development") {
  const dotenv = require("dotenv");
  const envFound = dotenv.config();

  if (envFound.error) {
    throw new Error("Couldn't find .env file  ⚠️");
  }
}

module.exports = {
  //Database connection status
  connectDB: connection,
  //Environment value
  HOST_DB: HOST_DB,
  PORT: PORT,
  JWT_SECRET_KEY: JWT_SECRET_KEY,
};
