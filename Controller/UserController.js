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
const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const savedUser = await UserModel.findOne({ _id: userId });
    if (!savedUser) {
      return res
        .status(400)
        .json({ message: "User not found!", userId: userId });
    }
    res.status(200).json({ message: "success", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userId, name, address, country, state, city, zipcode } = req.body;
  try {
    const savedUser = await UserModel.findOne({ _id: userId });
    const orders = savedUser.orders.map((order) => order.amount);
    console.log(orders);
    const totalSpends = orders.reduce((amount, acc) => parseInt(amount) + acc);
    console.log(totalSpends);
    const user = await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          name: name,
          address: address,
          country: country,
          state: state,
          city: city,
          zipcode: zipcode,
          totalSpends: totalSpends,
        },
      }
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found!", userId: userId });
    }
    res.status(200).json({ message: "success", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  saveUserOrder,
  getUserOrder,
  getUser,
  updateUser,
};
