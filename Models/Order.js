const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
  itemPurchased: { type: Array, required: true },
  orderId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  signature: { type: String, required: true },
  ordered_by: { type: String, required: true },
  email: { type: String, required: true },
  success: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("order", OrderSchema);
