const validator = require("validator");

const validation = (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name not valid !");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid !");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password !");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = { validation, validateEditProfileData };
