import express from 'express';
import { register, login } from '../controllers/authController.js';
import protect  from '../middleware/authMiddleware.js'; 

const app = express.Router();

app.post('/register', register);
app.post('/login',  login,protect);


export default app;
