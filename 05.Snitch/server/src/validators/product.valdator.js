import { body, param, validationResult } from "express-validator";

export const createProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Title must contain only letters"),

  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Description must be between 2 and 200 characters"),

  body("price.amount")
    .exists()
    .withMessage("Price amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price amount must be a positive number"),
  body("price.currency")
    .exists()
    .withMessage("Price currency is required")
    .bail()
    .isString()
    .withMessage("Price currency must be a string")
    .bail()
    .isIn(["INR", "USD"])
    .withMessage("Price currency must be either INR or USD"),

  body("sizes")
    .exists()
    .withMessage("Sizes are required")
    .bail()
    .isArray({ min: 1 })
    .withMessage("Sizes must be an array with at least one size")
    .bail(),

  body("sizes.*.size")
    .exists()
    .withMessage("Size is required")
    .bail()
    .isString()
    .withMessage("Size must be a string")
    .bail()
    .isIn(["S", "M", "L", "XL"])
    .withMessage("Size must be one of S, M, L, XL"),

  body("sizes.*.stock")
    .exists()
    .withMessage("Stock is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const unlistProductValidator = [
  param("id")
    .exists()
    .withMessage("Product ID is required")
    .bail()
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ObjectId"),

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

export const listProductValidator = [
  param("id")
    .exists()
    .withMessage("product id is required in req params")
    .bail()
    .isMongoId()
    .withMessage("product is must be a valid mongo object id"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "invalid Data",
        errors: errors.array(),
      });
    }

    next();
  },
];
