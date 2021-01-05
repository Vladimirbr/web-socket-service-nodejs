const Joi = require("joi");

const schema = Joi.object({
  action: Joi.object({
    method: Joi.string().min(1).max(100).required(),
    parameters: Joi.object({
      batch_id: Joi.number().required(),
      vehicle_id: Joi.number(),
      timestamp: Joi.date().max("now").required(),
    }).required(),
  }).required(),
}).required();

module.exports.schema = schema;
