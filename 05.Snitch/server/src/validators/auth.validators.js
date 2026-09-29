import { body, validationResult } from "express-validator";

const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .trim(),

  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isString()
    .withMessage("Email must be a string")
    .trim()
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

export { registerValidator, loginValidator };
