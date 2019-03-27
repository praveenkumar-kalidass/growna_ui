import Joi from "joi";

export default {
  policyNumber: Joi.string()
    .required()
    .label("Policy number")
    .options({
      language: {
        any: {
          empty: "!!You missed policy number here..."
        }
      }
    }),
  expiryDate: Joi.date()
    .required()
    .label("Expiry date")
    .options({
      language: {
        any: {
          empty: "!!You missed expiry date here..."
        }
      }
    }),
  noClaimBonus: Joi.number()
    .required()
    .label("No Claim Bonus")
    .options({
      language: {
        any: {
          empty: "!!You missed no claim bonus here..."
        }
      }
    }),
  companyId: Joi.string()
    .required()
    .label("Company")
    .options({
      language: {
        any: {
          empty: "!!You missed policy company here..."
        }
      }
    })
};
