const { body } = require("express-validator");

exports.createTaskValidators = () => {
  return [body("title").notEmpty().withMessage("Title is required")];
};

exports.patchTaskValidators = () => {
  return [body("title").notEmpty().withMessage("Title is required")];
};