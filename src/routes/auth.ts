import express from 'express';
import validateRequestBody from '../middleware/validateRequestBody';
import { usernamePasswordLogin } from '../controllers/auth';
import { loginPostDtoSchema } from '../dtos/loginPostDto';
import UserDetailsService from '../services/auth/userDetailService';
import AuthenticationProvider from '../services/auth/authenticationProvider';

const authProvider = new AuthenticationProvider(new UserDetailsService());

const router = express.Router();

router.post('/', [validateRequestBody(loginPostDtoSchema), usernamePasswordLogin(authProvider)]);

export default router;