const router = require("express").Router();
const controller = require("./controller");

//customers
router.post("/cust/makerequest", controller.custCreateRequest);
router.get("/cust/allorders/:id", controller.custGetAllMyOrders);

//drivers
router.get("/drv/neworders", controller.drvGetAllNewOrders);
router.post("/drv/pickup/:id", controller.drvPickupOrder);

module.exports = router;
