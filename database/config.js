require("dotenv").config();

module.exports = {
  url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@blogcluster.kadyinm.mongodb.net/`,
};
