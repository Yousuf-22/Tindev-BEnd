const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils//validation");
const authRouter = require("./auth");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { login } = require("../utils/validationForLogin");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request");
    }
    const loggedInuser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));
    await loggedInuser.save();
    res.json({
      message: `${loggedInuser.firstName} your profile is updated successfuly`,
      data: loggedInuser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { password } = req.body;
    const isStrong = validator.isStrongPassword(password);

    if (!isStrong) {
      throw new Error("Enter Strong Password");
    }
    const loggedInuser = req.user;

    const passwordHash = await bcrypt.hash(password, 10);
    loggedInuser.password = passwordHash;

    await loggedInuser.save();
    res.json({ message: "Forget password successfuly", data: loggedInuser });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
