import { Router } from 'express';
import userController from './user.controller.js';
import ValidationMiddleware from '../../middleware/validation.middleware.js';
import { CheckAuthGuard } from '../../guards/check-auth.guard.js';
import { createUserSchema } from './dtos/user-create.dto.js';

const userRoutes = Router();

userRoutes
//   .get(
//     "/",
//     CheckAuthGuard(false),
//     CheckRolesGuard(),
//     userController.getAllUsers
//   )
//   .patch(
//     "/update/:userId",
//     CheckAuthGuard(true),
//     CheckRolesGuard(),
//     ValidationMiddleware(updateUserSchema),
//     userController.updateUser
//   )
//   .delete(
//     "/delete/:userId",
//     CheckAuthGuard(true),
//     CheckRolesGuard("super-admin", "admin"),
//     userController.deleteUser
//   );

export default userRoutes;
