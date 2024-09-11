import { Router } from "express";
import ValidationMiddleware from "../middleware/validation.middleware.js";
// import { loginSchema } from "../dtos/login.dto.js";
import authController from "../modules/auth/auth.controller.js";

const authRoutes = Router();

authRoutes
    .post("/login", ValidationMiddleware(loginSchema), authController.signin)
    .post("/register", ValidationMiddleware(), authController.signup)

export default authRoutes; 