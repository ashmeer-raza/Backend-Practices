import { Router } from "express";
import { registerValidator } from "../validators/auth.validators.js";
import { register } from "../controller/auth.controller.js";

const router = Router();

/* // @route   POST /api/auth/register
 */

router.post("/register", registerValidator, register);
export default router;
