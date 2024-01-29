const jwt = require("jwt");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (decodedToken) {
      req.userData = { id: decodedToken.id, email: decodedToken.email };
      next();
    }
  } catch (e) {
    return next(e);
  }
};
