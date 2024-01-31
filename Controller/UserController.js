const UserModel = require("../Models/User");
const saveUserOrder = async (email, createdOrder) => {
  try {
    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      const orders = existUser.orders;
      if (orders) {
        existUser.orders.push(createdOrder);
        const updatedUser = await existUser.save();
        return updatedUser;
      } else {
        console.log("can not save order in users model");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserOrder = async (req, res) => {
  const { email } = req.body;
  try {
    const userOrders = await UserModel.findOne({ email: email });
    if (userOrders) {
      res.status(200).json({ orders: userOrders.orders });
    } else {
      res.status(404).json({ message: "No orders" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "It's not you. It's us" });
  }
};
module.exports = {
  saveUserOrder,
  getUserOrder,
};
