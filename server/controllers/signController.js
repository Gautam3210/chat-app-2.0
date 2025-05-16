const userInfoSchema = require("../models/userInfo");

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  const userData = new userInfoSchema({
    name,
    email,
    password,
  });
  const data = await userData.save();
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const userData = await userInfoSchema.findOne({ email, password });
  const usersData = await userInfoSchema.find({});
  if (!userData) {
    console.log("user not present");
  } else {
    res.json({userData, usersData})
  }
};

module.exports = {
  userSignUp,
  userLogin,
};
