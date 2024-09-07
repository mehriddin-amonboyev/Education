import { Router } from 'express';
import userController from './user.controller.js';
import ValidationMiddleware from '../../middleware/validation.middleware.js';



const userRoutes = Router();

userRoutes
    .post("/add",
        CheckAuthGuard(true),
        CheckRolesGuard("admin", "super-admin", "student"),
        ValidationMiddleware(createUserSchema),
        userController.createUser
        )
        .get(
            "/",
            CheckAuthGuard(false),
            CheckRolesGuard(),
            userController.getAllUsers
          )
          .patch(
            "/update/:userId",
            CheckAuthGuard(true),
            CheckRolesGuard(),
            ValidationMiddleware(updateUserSchema),
            userController.updateUser
          )
          .delete(
            "/delete/:userId",
            CheckAuthGuard(true),
            CheckRolesGuard("super-admin", "admin"),
            userController.deleteUser
          );
        
        export default userRoutes;
        