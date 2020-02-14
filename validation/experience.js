//adding experience rules
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.JobTitle = !isEmpty(data.JobTitle) ? data.JobTitle : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  if (Validator.isEmpty(data.JobTitle)) {
    errors.JobTitle = "Job Title is necessary";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is necessary";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is necessary";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
