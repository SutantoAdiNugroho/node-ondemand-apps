const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to coinmarketcap api",
  });
});

module.exports = router;
