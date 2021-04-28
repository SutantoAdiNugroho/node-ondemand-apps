const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driver = "driver";

const usersAcctSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d/.test(v);
      },
      message: (props) => `${props.value} is not valid phone number`,
    },
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: driver,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const UsersModel = mongoose.model("drivers_accts", usersAcctSchema);

module.exports = UsersModel;
