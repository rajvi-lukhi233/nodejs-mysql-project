const joi = require("joi");

exports.updateUserSchemaValidation = joi.object({
  userId: joi.string().required(),
  name: joi.string().optional(),
  email: joi.string().email().optional(),
});

exports.deleteUserSchemaValidation = joi.object({
  userId: joi.string().required(),
});
