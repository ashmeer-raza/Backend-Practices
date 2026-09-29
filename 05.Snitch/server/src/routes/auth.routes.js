import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validators.js";
import {
  login,
  register,
  refresh,
  getMe,
} from "../controller/auth.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// @route   POST /api/auth/register
router.post("/register", registerValidator, register);

// @route   POST /api/auth/login
router.post("/login", loginValidator, login);

// @route   GET /api/auth/refresh-token
router.get("/refresh", refresh);

// @route   GET /api/auth/me
router.get("/me", authenticate, getMe);

export default router;
