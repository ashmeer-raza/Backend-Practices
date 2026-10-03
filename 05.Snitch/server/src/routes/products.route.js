import { Router } from "express";
import {
  createProductValidator,
  unlistProductValidator,
  listProductValidator,
} from "../validators/product.valdator.js";
import {
  authenticate,
  authenticateSeller,
} from "../middleware/auth.middleware.js";
import {
  createProduct,
  listAllProducts,
  unlistProduct,
  listProduct,
  listAllProductsToSeller,
} from "../controller/product.controller.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5, // Maximum number of files
    fileSize: 1 * 1024 * 1024, // 1MB
  },
});

const router = Router();

// Create a new product
router.post(
  "/",

  // check if user is authenticated and has role of seller
  authenticate,

  // check the role is seller or not
  authenticateSeller,

  // required for reading the data from the request body and validating it
  upload.array("images"),

  // parse the price and sizes fields from JSON string to object
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  },

  createProductValidator,
  createProduct,
);

// get all products
router.get("/", authenticate, listAllProducts);

// get all products for a seller
router.get(
  "/seller",
  authenticate,
  authenticateSeller,
  listAllProductsToSeller,
);

// Unlist a product
router.patch(
  "/unlist/:id",
  authenticate,
  authenticateSeller,
  unlistProductValidator,
  unlistProduct,
);

// List a product
router.patch(
  "/list/:id",
  authenticate,
  authenticateSeller,
  listProductValidator,
  listProduct,
);

export default router;
