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
  gender: Joi.string()
    .required()
    .label("Gender")
    .options({
      language: {
        any: {
          empty: "!!You missed to select gender here..."
        }
      }
    }),
  dateOfBirth: Joi.date()
    .required()
    .label("Date of Birth")
    .options({
      language: {
        any: {
          empty: "!!You missed to select your birth date here..."
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
          empty: "!!Oops!!! You need to enter an email",
          email: "!!This email looks invalid...",
          default: "!!Looks like there is some problem with the email"
        },
        string: {
          min: "!!Email is too short!!!",
          max: "!!Email is too long!!!"
        }
      }
    }),
  mobileNumber: Joi.number()
    .min(1000000000)
    .max(9999999999)
    .required()
    .label("Mobile Number")
    .options({
      language: {
        any: {
          empty: "!!Oops!!! You missed to enter your mobile number",
          default: "!!Looks like there is some problem with the mobile number"
        },
        number: {
          min: "!!Mobile Number is too short!!!",
          max: "!!Mobile Number is too long!!!"
        }
      }
    })
};
