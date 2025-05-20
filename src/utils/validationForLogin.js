const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { emailId, password } = req.body;
  if (!emailId) {
    throw new Error("Enter a valid email");
  }
  if (!password) {
    throw new Error("Enter a Password");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Please Enter valid Email");
  }

  const user = await User.findOne({ emailId: emailId });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (isValidPassword) {
    return;
  } else {
    throw new Error("Password not valid ");
  }
};

module.exports = { login };
