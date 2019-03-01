import Joi from "joi";

export default {
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .label("Role")
    .options({
      language: {
        any: {
          empty: "!!You missed name here..."
        },
        string: {
          min: "!!Role is too short!!!",
          max: "!!Role is too long!!!"
        }
      }
    }),
  parentId: Joi.string()
    .required()
    .label("Manager")
    .options({
      language: {
        any: {
          empty: "!!You missed to select manager here"
        }
      }
    })
};
