const mongoose = require("mongoose");
const PaymentDetailsSchema = mongoose.Schema({
  email: { type: String, required: true },
  paymentBy: { type: String, required: true },
  amount: { type: String, required: true },
  razorpayDetails: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  success: Boolean,
});

module.exports = mongoose.model("Payment", PaymentDetailsSchema);
