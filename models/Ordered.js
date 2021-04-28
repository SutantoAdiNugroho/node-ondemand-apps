const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objOrderTyp = {
  ride: "ride",
  food: "food",
};

const objOrderSts = {
  request: "00",
  beingPickedUp: "01",
  delivering: "02",
  delayed: "03",
  finished: "90",
};

const usersAcctSchema = new Schema({
  orderedType: {
    type: String,
    required: true,
    enum: [objOrderTyp.ride, objOrderTyp.food],
  },
  orderedLocation: {
    latitude: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    longitude: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  orderedDestination: {
    latitude: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    longitude: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  makerOrderId: {
    type: Schema.Types.ObjectId,
    ref: "users_accts",
    required: true,
  },
  pickupOrderId: {
    type: Schema.Types.ObjectId,
    ref: "drivers_accts",
    default: null,
  },
  orderSts: {
    type: String,
    required: true,
    enum: [
      objOrderSts.request,
      objOrderSts.beingPickedUp,
      objOrderSts.delivering,
      objOrderSts.delayed,
      objOrderSts.finished,
    ],
    default: objOrderSts.request,
  },
  remark: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const UsersModel = mongoose.model("orders_accts", usersAcctSchema);

module.exports = UsersModel;
