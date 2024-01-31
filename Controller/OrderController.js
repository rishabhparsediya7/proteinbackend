const OrderModel = require("../Models/Order");

const createOrder = async (
  razorpayPaymentId,
  razorpayOrderId,
  razorpaySignature,
  email,
  ordered_by,
  a,
  itemsPurchased
) => {
  const newOrder = OrderModel({
    itemPurchased: itemsPurchased,
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature,
    amount: a / 100,
    email: email,
    ordered_by: ordered_by,
    success: true,
  });
  const savedOrder = await newOrder.save();
  return savedOrder;
};
const getALLOrderForUser = async (req, res) => {
  const { email } = req.body;
  try {
    const orders = await OrderModel.find({ email: email });
    if (orders) {
      res.status(200).json({ orders: orders });
    } else {
      res.status(404).json({ message: "No orders" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "It's not you. It's us" });
  }
};
module.exports = {
  createOrder,
  getALLOrderForUser,
};
