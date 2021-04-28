const mongoose = require("mongoose");
const { HOST_DB } = require("./environment");

mongoose
  .connect(HOST_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Can't connect to database with error : ", error);
  });

module.exports = mongoose.connection;
