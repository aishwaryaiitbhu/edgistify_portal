//adding education rules
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  if (Validator.isEmpty(data.school)) {
    errors.JobTitle = "School should be mentioned";
  }

  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.company = "Field of study should be mentioned";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is necessary";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
