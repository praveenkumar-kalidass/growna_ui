import Joi from "joi";

export default {
  brand: Joi.string()
    .required()
    .label("Brand")
    .options({
      language: {
        any: {
          empty: "!!You missed to select brand"
        }
      }
    }),
  model: Joi.string()
    .required()
    .label("Model")
    .options({
      language: {
        any: {
          empty: "!!You missed to select model"
        }
      }
    }),
  variant: Joi.string()
    .required()
    .label("Variant")
    .options({
      language: {
        any: {
          empty: "!!You missed to select variant"
        }
      }
    }),
  vehicleYear: Joi.number()
    .required()
    .label("Vehicle registration year")
    .options({
      language: {
        any: {
          empty: "!!You missed to select year here"
        }
      }
    })
};
