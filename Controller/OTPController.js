const Otp = require("../Models/otp");
const nodemailer = require("nodemailer");

const sendMail = async (email) => {
  const otp = Math.floor(Math.random() * 10000);
  console.log(otp);
  const transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "orval52@ethereal.email",
      pass: "w126aq9nhyMt2Zqkbc",
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  const mailOptions = {
    from: "orval52@ethereal.email",
    to: email,
    subject: "OTP Verification for Shop",
    text: `Your OTP is: ${otp}`,
  };
  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    return { message: "failure", sent: false };
  }
  return {
    email: email,
    response: info,
    message: "Sent Successfully",
    sent: true,
    otp: otp,
  };
};

const getOTP = async (email) => {
  const response = await sendMail(email);
  console.log(response);
  return response;
};

module.exports = {
  getOTP,
};
