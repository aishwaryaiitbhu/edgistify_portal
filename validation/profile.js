//validation rules for profile
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.handle = "Username must be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.username)) {
    errors.handle = "Username cannot be empty";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills cannot be empty";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid website";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
