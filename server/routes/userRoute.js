
import express from 'express';
import { getPublishedCreations, getUserCcreations } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.get('/get-user-creations', auth, getUserCcreations)
userRouter.get('/get-publish-creations', auth, getPublishedCreations)
userRouter.post('/toggle-like-creation', auth, getPublishedCreations)

export default userRouter;