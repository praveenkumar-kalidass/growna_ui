import Joi from "joi";

export default {
  vehicleNumber: Joi.string()
    .required()
    .label("Vehicle number")
    .options({
      language: {
        any: {
          empty: "!!You missed vehicle number here..."
        }
      }
    })
};
