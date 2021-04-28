const router = require("express").Router();
const controller = require("./controller");

const {
  authCustMiddleware,
  authDrvMiddleware,
  authAllMiddleware,
} = require("../../../middleware");

//entire role can use
router.get("/cd/oneorder/:id", authAllMiddleware, controller.getOneMyOrders);

//customers
router.get(
  "/cust/allorders/:id",
  authCustMiddleware,
  controller.custGetAllMyOrders
);
router.post(
  "/cust/makerequest",
  authCustMiddleware,
  controller.custCreateRequest
);

//drivers
router.get("/drv/neworders", authDrvMiddleware, controller.drvGetAllNewOrders);
router.get(
  "/drv/allorders/:id",
  authDrvMiddleware,
  controller.drvGetAllMyOrders
);
router.put("/drv/pickup/:id", authDrvMiddleware, controller.drvPickupOrder);

module.exports = router;
