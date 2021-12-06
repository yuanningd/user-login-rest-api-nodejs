import express from 'express';
import validateRequestBody from '../middleware/validateRequestBody';
import { usernamePasswordLogin } from '../controllers/auth';
import { loginPostDtoSchema } from '../dtos/loginPostDto';

const router = express.Router();

router.post('/', [validateRequestBody(loginPostDtoSchema), usernamePasswordLogin]);

export default router;