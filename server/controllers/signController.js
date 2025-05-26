const userInfoSchema = require("../models/userInfo");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../service/token");

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
    const data = {
      id: userData._id,
      name: userData.name,
      email: userData.email,
    };

    const token = generateToken(data)
    res.json({ userData, usersData, token });

  }
};

module.exports = {
  userSignUp,
  userLogin,
};
