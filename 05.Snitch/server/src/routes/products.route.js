import { Router } from "express";
import { createProductValidator } from "../validators/product.valdator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5, // Maximum number of files
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const router = Router();

router.post(
  "/",

  // check if user is authenticated and has role of seller
  authenticate,

  // check the role is seller or not
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "Only sellers can create products. user are not sellers.",
      });
    }
    next();
  },
  // __________ required for reading the data from the request body and validating it
  upload.array("images"),
  // parse the price and sizes fields from JSON string to object
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
  },
  createProductValidator,
  createProduct,
);

export default router;
