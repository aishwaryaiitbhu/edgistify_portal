//registration rules
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  if (!Validator.isLength(data.name, { min: 4, max: 35 })) {
    errors.name = "Name must be in between 4 and 35 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is necessary";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is necessary";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is necessary";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 35 })) {
    errors.password = "Password must be atleast 6 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password must be confirmed";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
