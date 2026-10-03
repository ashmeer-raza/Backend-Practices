import { Router } from "express";
import { addToCartValidator } from "../validators/cart.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { addToCart, getCart } from "../controller/cart.controller.js";

const router = Router();

// Add a product to the cart
router.post("/", authenticate, addToCartValidator, addToCart);

router.get("/", authenticate, getCart);
export default router;
