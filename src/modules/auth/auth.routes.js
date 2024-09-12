import { Router } from "express";
import authController from "./auth.controller.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";
import { forgotPasswordDto } from "./dtos/forgot-password.dto.js";
import { resetPasswordDto } from "./dtos/reset-password.dto.js";
import { generateOTPDto } from "./dtos/generate-otp.dto.js";
import { verifyOTPDto } from "./dtos/verify-otp.dto.js";
import { register } from "./dtos/register.dto.js";
import { loginSchema } from "./dtos/login.dto.js";

const authRoutes = Router();

authRoutes
  .post(
    "/register",
    ValidationMiddleware(register),
    authController.signup
  )

  .post(
    "/login",
    ValidationMiddleware(loginSchema),
    authController.signin
  )

  .post(
    "/generate-otp",
    ValidationMiddleware(generateOTPDto),
    authController.generateOtp
  )

  .post(
    "/verify-otp",
    ValidationMiddleware(verifyOTPDto),
    authController.verifyOtp
  )

  .post(
    "/forgot-password",
    ValidationMiddleware(forgotPasswordDto),
    authController.forgotPassword
  )
  .post(
    "/reset-password/:token",
    ValidationMiddleware(resetPasswordDto),
    authController.resetPassword
  )


export default authRoutes;