const mongoose = require("mongoose");
const OrderSchema = require("./Order");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  orders: { type: Object, required: false },
});

module.exports = mongoose.model("Protein_User", UserSchema);
