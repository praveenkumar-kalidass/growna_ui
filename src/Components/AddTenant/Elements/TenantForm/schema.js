import Joi from "joi";

export default {
  name: Joi.string()
    .required()
    .label("Tenant Name")
    .options({
      language: {
        any: {
          empty: "!!You missed tenant name here..."
        }
      }
    })
};
