const Razorpay = require("razorpay");
const crypto = require("crypto");
const PaymentModel = require("../Models/Payment");
const OrderModel = require("../Models/Order");
const OrderController = require("./OrderController");
const UserController = require("./UserController");

const PaymentOrder = async (req, res) => {
  const { amount } = req.body;
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const PaymentSuccessHandler = async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      email,
      ordered_by,
      amount,
      itemsPurchased,
    } = req.body;
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    const newPayment = PaymentModel({
      email: email,
      amount: amount / 100,
      paymentBy: ordered_by,
      razorpayDetails: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
      success: true,
    });
    await newPayment.save();
    const createdOrder = await OrderController.createOrder(
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      email,
      ordered_by,
      amount,
      itemsPurchased
    );
    const savedUserOrder = await UserController.saveUserOrder(
      email,
      createdOrder
    );
    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      order: createdOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
module.exports = {
  PaymentOrder,
  PaymentSuccessHandler,
};
