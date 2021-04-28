const router = require("express").Router();
const controller = require("./controller");

router.post("/user/register", controller.userRegister);
router.post("/user/login", controller.userLogin);
router.post("/driver/register", controller.driverRegister);
router.post("/driver/login", controller.driverLogin);

module.exports = router;
