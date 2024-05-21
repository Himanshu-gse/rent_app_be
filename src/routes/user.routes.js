import express from 'express';
import UserController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', UserController.createUser);
userRouter.post('/login', UserController.login);
userRouter.get('/logout', UserController.logout);

export default userRouter;
