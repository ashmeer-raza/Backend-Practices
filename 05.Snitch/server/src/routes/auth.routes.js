import { Router } from "express";
import { registerValidator } from "../validators/auth.validators.js";

const router = Router();

/* // @route   POST /api/auth/register
 */

router.post("/register", registerValidator, (req, res) => {
export default router;
