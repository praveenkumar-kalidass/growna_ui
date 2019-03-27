import Joi from "joi";

export default {
  houseNumber: Joi.string()
    .min(1)
    .max(10)
    .required()
    .label("House number")
    .options({
      language: {
        any: {
          empty: "!!You missed house number here..."
        },
        string: {
          min: "!!House number is too short!!!",
          max: "!!House number is too long!!!"
        }
      }
    }),
  address: Joi.string()
    .required()
    .label("Address")
    .options({
      language: {
        any: {
          empty: "!!You missed address here..."
        }
      }
    }),
  pincode: Joi.number()
    .required()
    .min(100000)
    .max(999999)
    .label("Pincode")
    .options({
      language: {
        any: {
          empty: "!!You missed pincode here..."
        }
      }
    }),
};
