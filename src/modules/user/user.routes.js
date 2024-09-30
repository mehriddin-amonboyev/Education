import { Router } from 'express';
import userController from './user.controller.js';
import ValidationMiddleware from '../../middleware/validation.middleware.js';
import { CheckAuthGuard } from '../../guards/check-auth.guard.js';
import { createUserSchema } from './dtos/user-create.dto.js';
import { CheckRolesGuard } from '../../guards/check-role.guard.js';
import { updateUserSchema } from './dtos/user-update.dto.js';
import { UpdateRoleSchema } from './dtos/user-update-role.dto.js';

const userRoutes = Router();

userRoutes
  .get("/",
    CheckAuthGuard(false),
    CheckRolesGuard(),
    userController.getAllUsers
  )

  .patch(
    "/role/:id",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    ValidationMiddleware(UpdateRoleSchema),
    userController.updateUserRole
  )

  .patch(
    "/:id",
    ValidationMiddleware(updateUserSchema),
    userController.updateUser
  )

  .delete(
    "/:id",
    CheckAuthGuard(true),
    CheckRolesGuard("super-admin", "admin"),
    userController.deleteUser
  );

export default userRoutes;
