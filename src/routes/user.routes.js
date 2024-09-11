import {Router} from 'express';
import ValidationMiddleware from '../middleware/validation.middleware.js';
import userController from '../modules/user/user.controller.js';
const userRoutes = Router();

userRoutes
    .post("/add",ValidationMiddleware(createUserSchema), userController.createUser)
    .get("/", userController.getAllUsers);

export default userRoutes;