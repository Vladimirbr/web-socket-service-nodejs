const schema = require("./schema").schema;
const errors = require("./errors");

function validate(payload) {
  const { error, value } = schema.validate(payload);

  if (!error) return null;

  return error.details[0].type === "any.required" ? errors.MISSING_MANDATORY_FIELD : errors.VALIDATION_ERROR;
}

module.exports.validate = validate;
