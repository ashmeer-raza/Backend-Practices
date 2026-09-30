import { body } from "express-validator";

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
    .bail()
    .custom((sizes) => {
      const validSizes = ["XS", "S", "M", "L", "XL", "XXL"];
      if (!sizes.every((size) => validSizes.includes(size))) {
        throw new Error("Invalid size provided");
      }
      return true;
    }),
];
