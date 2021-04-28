const express = require("express");
const bodyParser = require("body-parser");
const { PORT, connectDB } = require("./config");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//list of main routes
app.use("/", require("./src/routes"));
app.use("/api/auth", require("./src/routes/users-auth"));

//not found
app.use("*", require("./src/routes/404-notfound"));

if (connectDB) {
  app.listen(PORT, () => {
    console.log(`This app running on port ${PORT}`);
  });
}
