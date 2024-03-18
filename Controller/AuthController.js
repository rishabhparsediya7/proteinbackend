require("dotenv").config();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OtpModel = require("../Models/otp");
const Otp = require("./OTPController");

const generateToken = (id, email) => {
  const token = jwt.sign({ id: id, email: email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const savedUser = await User.updateOne(
        { email: email }, // acts like where
        { $set: { password: hashPassword } } // value to be updated
      );
      const token = generateToken(savedUser.id, savedUser.email);
      if (savedUser) {
        res.status(200).json({
          message: "success",
          userId: savedUser.id,
          email: savedUser.email,
          access_token: token,
        });
      }
    } else {
      res.json({ message: "the email does not exists", emailExists: false });
    }
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
};

const userExists = async (req, res) => {
  const { email } = req.body;

  try {
    const existUser = User.findOne({ email: email });
    if (existUser) {
      res
        .status(200)
        .json({ message: "User exists", exists: true, email: existUser.email });
    } else {
      res.status(404).json({ message: "User does not exists", exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: "It's not you its us" });
  }
};

const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (validPassword) {
        const token = generateToken(existingUser.id, email);
        res.status(200).json({
          message: "success",
          userId: existingUser.id,
          email: email,
          access_token: token,
        });
      } else {
        res.status(400).json({
          message: "Failure",
          error: "Could not logged you in, Try again with different password",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Failure",
      error: "Could not logged you in. It's not you, it's us!",
    });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const savedOtp = await OtpModel.findOne({ email: email });
    if (savedOtp.otp == otp) {
      const user = new User({
        email: email,
      });
      const savedUser = await user.save();
      const deletedOtp = await OtpModel.deleteOne({ email: email });
      if (deletedOtp.deletedCount == 1 && savedUser) {
        console.log("Deleted OTP with email:" + email);
      }
      res.status(200).json({
        message: "verification successful!",
        verified: true,
        email: email,
        user: savedUser,
      });
    } else {
      res.status(403).json({ message: "You have entered the wrong OTP!" });
    }
  } catch (error) {
    res.status(500).json({ message: "verification successful!" });
  }
};

const getMailOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await OtpModel.findOne({ email: email });
    const response = await Otp.sendMail(email);
    if (!existingUser) {
      console.log(response);
      if (response.sent) {
        const Otp = OtpModel({
          email: email,
          otp: response.otp,
        });
        const savedOTP = await Otp.save();

        res.status(200).json({
          message: "Sent OTP Sucessfully",
          response: response,
          otpResponse: savedOTP,
        });
      } else {
        res.status(403).json({ message: "Could not sent the OTP" });
      }
    } else {
      if (response.sent) {
        const savedOTP = await OtpModel.updateOne(
          { email: email }, // acts like where
          { $set: { otp: response.otp } } // value to be updated
        );

        res.status(200).json({
          message: "Sent OTP Sucessfully",
          response: response,
          otpResponse: savedOTP,
        });
      } else {
        res.status(403).json({ message: "Could not sent the OTP" });
      }
    }
  } catch (e) {
    res.status(500).json({ message: "Failure", error: e.message });
  }
};

const getMobileOTP = async (req, res) => {
  try {
    const fromNumber = process.env.MY_NUMBER;
    const toNumber = req.body.toNumber;
    console.log(toNumber);
    console.log(fromNumber);
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.ACCOUNT_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    const response = await client.messages.create({
      from: fromNumber,
      body: "Hi there",
      to: toNumber,
    });
    res.status(200).json({ message: response });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Server Error", message: e.message });
  }
};
module.exports = {
  getMobileOTP,
  getMailOTP,
  createUser,
  getUser,
  verifyOTP,
  userExists,
};
