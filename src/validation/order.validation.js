const joi = require("joi");

exports.createOrderSchemaValidation = joi.object({
  products: joi
    .array()
    .items(
      joi.object({
        productId: joi.string().required(),
        quantity: joi.number().min(1).required(),
      }),
    )
    .required(),
  city: joi.string().optional(),
  state: joi.string().optional(),
  country: joi.string().optional(),
  zipCode: joi.string().optional(),
  address: joi.string().optional(),
});

exports.updateOrderSchemaValidation = joi.object({
  orderId: joi.string().required(),
  products: joi
    .array()
    .items(
      joi.object({
        productId: joi.string().optional(),
        quantity: joi.number().min(1).optional(),
      }),
    )
    .optional(),

  city: joi.string().optional(),
  state: joi.string().optional(),
  country: joi.string().optional(),
  zipCode: joi.string().optional(),
  address: joi.string().optional(),
});

exports.deleteOrderSchemaValidation = joi.object({
  orderId: joi.string().required(),
});
