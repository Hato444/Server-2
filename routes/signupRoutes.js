import express from 'express';
import { signup } from '../controllers/authController.js';

const router = express.Router();

// POST route for Signup
router.post('/signup', signup);

export default router;
