const mongoose = require("mongoose");
const dbConfig = require("./config");
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
