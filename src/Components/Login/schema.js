import Joi from "joi";

export default {
  email: Joi.string()
    .email()
    .min(3)
    .max(30)
    .required()
    .label("Email")
    .options({
      language: {
        any: {
          empty: "!!Oops!!! You need an email to login...",
          email: "!!This email looks invalid...",
          default: "!!Looks like there is some problem with your email"
        },
        string: {
          min: "!!Your email is too short!!!",
          max: "!!Your email is too long!!!"
        }
      }
    }),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .label("Password")
    .options({
      language: {
        any: {
          empty: "!!Oops!!! You need a password to login...",
          default: "!!Looks like there is some problem with your password"
        },
        string: {
          min: "!!Your password is too short!!!",
          max: "!!Your password is too long!!!"
        }
      }
    })
};
