import express from 'express';
import { getUSer, login, signup, verifyToken } from '../Controller/user-controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/user',verifyToken, getUSer);

//verify token
export default router;