const mailer = require("../middleware/sendMail");

const sendMail = async (email) => {
  const response = await mailer.sendMail(email);
  if (!response.sent) {
    return { message: "failure", sent: false };
  }
  return {
    email: email,
    message: "Sent Successfully",
    sent: true,
    otp: response.otp,
  };
};

module.exports = {
  sendMail,
};
