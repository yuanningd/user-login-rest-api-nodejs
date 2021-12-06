import express from 'express';
import authRoute from './auth';

const router = express.Router();

router.use('/login', authRoute);

export default router;