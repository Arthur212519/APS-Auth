import { loginLimiter } from "../middlewares/rateLimit.js";
import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validadeSchema } from "../middlewares/validadeSchema.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post('/login', loginLimiter,validadeSchema(loginSchema),
 login);
router.post('/register',validadeSchema(registerSchema), register);



export default router;