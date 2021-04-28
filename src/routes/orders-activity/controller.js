const { OrderedModel } = require("../../../models");
const objectId = require("mongodb").ObjectID;

const objOrderSts = {
  request: "00",
  beingPickedUp: "01",
  delivering: "02",
  delayed: "03",
  finished: "90",
};
let objErr = {};

module.exports = {
  //For customers
  custGetAllMyOrders: async (req, res) => {
    try {
      const resultOrder = await OrderedModel.find({
        makerOrderId: objectId(req.params.id),
      })
        .populate("makerOrderId", "_id name phoneNumber")
        .populate("pickupOrderId", "_id name phoneNumber");

      res.status(200).json({
        status: 200,
        message: `Succesfully show all orders with customer id ${req.params.id}`,
        data: resultOrder,
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
  custCreateRequest: async (req, res) => {
    try {
      const resultOrder = await OrderedModel.create(req.body);

      const { _id, orderedType, orderSts } = resultOrder;

      res.status(200).json({
        status: 200,
        message: "Succesfully create request",
        data: {
          idOrder: _id,
          orderType: orderedType,
          orderStatus: orderSts,
        },
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },

  //For drivers
  drvGetAllNewOrders: async (req, res) => {
    try {
      const resultOrder = await OrderedModel.find({
        orderSts: objOrderSts.request,
      })
        .populate("makerOrderId", "_id name phoneNumber")
        .populate("pickupOrderId", "_id name phoneNumber");

      res.status(200).json({
        status: 200,
        message: "Succesfully display all new orders",
        data: resultOrder,
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
  drvPickupOrder: async (req, res) => {
    try {
      console.log(req.body);
      const resultOrder = await OrderedModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            pickupOrderId: objectId(req.body.driverId),
            orderSts: req.body.orderSts,
          },
        },
        { runValidators: true }
      );

      res.status(200).json({
        message: `Order data succesfully update with id ${req.params.id}`,
        data: resultOrder,
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
};

const handleError = (req, res, objErr) => {
  let timestamp = new Date();

  res
    .status(objErr.status)
    .json({
      timestamp: timestamp,
      status: objErr.status,
      message: objErr.message,
      path: req.originalUrl,
    })
    .end();
};
