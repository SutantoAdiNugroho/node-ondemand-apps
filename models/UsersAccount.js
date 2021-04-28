const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer = "customer";

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
    default: customer,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const UsersModel = mongoose.model("users_accts", usersAcctSchema);

module.exports = UsersModel;
