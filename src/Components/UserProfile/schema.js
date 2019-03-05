import Joi from "joi";

export default {
  firstName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .label("First Name")
    .options({
      language: {
        any: {
          empty: "!!You missed first name here..."
        },
        string: {
          min: "!!First name is too short!!!",
          max: "!!First name is too long!!!"
        }
      }
    }),
  lastName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .label("Last Name")
    .options({
      language: {
        any: {
          empty: "!!You missed last name here..."
        },
        string: {
          min: "!!Last name is too short!!!",
          max: "!!Last name is too long!!!"
        }
      }
    }),
  email: Joi.string()
    .email()
    .min(3)
    .max(30)
    .required()
    .label("Email")
    .options({
      language: {
        any: {
          empty: "!!Oops!!! You need to enter an email for the user",
          email: "!!This email looks invalid...",
          default: "!!Looks like there is some problem with the email"
        },
        string: {
          min: "!!Email is too short!!!",
          max: "!!Email is too long!!!"
        }
      }
    })
};
