const express = require("express");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { validation } = require("../utils/validation");
const { login } = require("../utils/validationForLogin");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    // validation of data
    validation(req);

    // Encrypt The Password
    const passwordHash = await bcrypt.hash(password, 10);

    // created a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    if (!validator.isEmail(emailId)) {
      throw new Error("Wrong Email format");
    }
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      httpOnly: true, // ✅ Prevents JavaScript access (for security)
      secure: true, // ✅ Ensures cookie only sent over HTTPS
      sameSite: "None", // ✅ Required when frontend & backend are on different origins
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added Successful !", data: savedUser });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send("Email already exist");
    } else {
      res.status(400).send("Error : " + err.message);
    }
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId } = req.body;
  const user = await User.findOne({ emailId: emailId });
  try {
    await login(req);

    // create a JWT token
    const token = await user.getJWT();

    // add the token to cookie
    res.cookie("token", token, {
      httpOnly: true, // ✅ Prevents JavaScript access (for security)
      secure: true, // ✅ Ensures cookie only sent over HTTPS
      sameSite: "None", // ✅ Required when frontend & backend are on different origins
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send(user);
  } catch (error) {
    res.status(404).send("Error :" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful");
});

module.exports = authRouter;
