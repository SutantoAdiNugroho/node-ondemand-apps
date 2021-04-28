const router = require("express").Router();
const controller = require("./controller");

//entire role can use
router.get("/cd/oneorder/:id", controller.getOneMyOrders);

//customers
router.get("/cust/allorders/:id", controller.custGetAllMyOrders);
router.post("/cust/makerequest", controller.custCreateRequest);

//drivers
router.get("/drv/neworders", controller.drvGetAllNewOrders);
router.get("/drv/allorders/:id", controller.drvGetAllMyOrders);
router.put("/drv/pickup/:id", controller.drvPickupOrder);

module.exports = router;
