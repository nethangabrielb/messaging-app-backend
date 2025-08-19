import { validationResult } from "express-validator";
import username from "../rules/username.js";
import email from "../rules/email.js";
import password from "../rules/password.js";
import confirmPassword from "../rules/confirmPassword.js";

const registrationValidation = [username, email, password, confirmPassword];

const validateRegistration = [
  registrationValidation,
  (req, res, next) => {
    // Retrieve errors from express-validator on input fields
    const errors = validationResult(req);

    // Return errors if there are any
    if (!errors.isEmpty()) {
      const errorsArr = errors.array({ onlyFirstError: true });
      return res.json({
        code: "INVALID_INPUT",
        message: errorsArr.map((err) => err.msg),
        statusCode: 400,
      });
    } else {
      next();
    }
  },
];

export { validateRegistration };
