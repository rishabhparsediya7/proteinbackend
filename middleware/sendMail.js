const nodemailer = require("nodemailer");

async function generateOTP() {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

async function sendMail(email) {
  const otp = await generateOTP();
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.TRANSPORT_EMAIL,
      pass: process.env.TRANSPORT_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.TRANSPORT_EMAIL,
    to: email,
    subject: "OTP for Verification",
    text: `Your OTP is: ${otp}. Please use this OTP to proceed.`,
  };
  let res = {
    sent: true,
    otp: otp,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error.message);
      res["sent"] = false;
    }
  });
  return res;
}
module.exports = {
  sendMail,
  generateOTP,
};
