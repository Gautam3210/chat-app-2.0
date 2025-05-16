const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/chatUsers")
  .then((res) => console.log("db connected"));
