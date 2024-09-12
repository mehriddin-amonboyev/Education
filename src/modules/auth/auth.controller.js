import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import appConfig from "../../config/app.config.js";
import bcryptConfig from "../../config/bcrypt.config.js";
import {generateOTP} from "../../utils/generate-otp.utils.js";
import passwordResetConfig from "../../config/password-reset.config.js";
import { Otp } from "./otp.model.js";
import { sendMail } from "../../utils/send-email.utils.js";
import { signToken } from "../../helper/jwt.helper.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { ConflictException } from "../../exceptions/conflic.exception.js";

class AuthController {
  #_userModel;
  #_otpModel;

  constructor() {
    this.#_userModel = User;
    this.#_otpModel = Otp;
  }

  // REGISTER
  signup = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new ConflictException("Bu username afsuski band!!!")
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new ConflictException("Bu email afsuski band!!!")
      }

      const hashed_password = await bcrypt.hash(password, bcryptConfig.rounds);

      const newUser = await User.create({
        username,
        email,
        password: hashed_password,
        role: "student",
      });

      res.status(201).send("Foydalanuvchi muvaffaqqiyatli ro'yxatdan o'tdi!!!");
    } catch (error) {
      next(error)
    };
  };

  // LOGIN
  signin = async (req, res, next) => {
    try {
      const foundedUser = await this.#_userModel.findOne({
        username: req.body.username,
      });

      if (!foundedUser) {
        throw new NotFoundException("User not found");
      }

      const result = await bcrypt.compare(
        req.body.password,
        foundedUser.password
      );

      if (!result) {
        return res.status(409).send({
          message: "Invalid password or username",
        });
      }

      const accessToken = signToken({
        id: foundedUser.id,
        role: foundedUser.role,
      });

      res.cookie("token", accessToken, { maxAge: 1000 * 60 * 6, signed: true });

      res.send({
          message: "success",
          token: accessToken,
        });

      // switch (foundedUser.role) {
      //   case "student":
      //     res.send("/student");
      //     break;
      //   case "teacher":
      //     res.send("/teacher");
      //     break;
      //   case "admin":
      //     res.send("/admin");
      //     break;
      //   default:
      //     res.send("Not Faund:", { message: "User page not found" });
      // }
    } catch (error) {
      next(error);
    }
  };

  // Generate OTP
  generateOtp = async (req, res, next) => {
    try {
      const { email } = req.body;
      const otpCode = generateOTP();

      const verifyText = crypto.randomBytes(64).toString("hex");

      await this.#_otpModel.create({
        email,
        verifyText,
        code: otpCode,
      });

      // SEND CODE VIA EMAIL
      await sendMail({
        to: email,
        subject: "Education uchun",
        html: `<h2>Sizning verifikatsiya kodingiz: ${otpCode} </h2>/>`,
      });

      res.send({
        verifyText,
        otpCode,
      });
    } catch (error) {
      next(error);
    }
  };

  // Verify OTP
  verifyOtp = async (req, res, next) => {
    try {
      const { code, verifyText } = req.body;

      const foundedOtp = await this.#_otpModel.findOne({ code, verifyText });

      if (!foundedOtp) {
        throw new ConflictException("Your OTP is already expired or used");
      }

      // DELETE USED OTP
      await this.#_otpModel.findByIdAndDelete(foundedOtp.id);

      res.send({
        user: {
          email: foundedOtp.email,
        },
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // Forgot Password
  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;

      const foundedUser = await this.#_userModel.findOne({ email });

      if (!foundedUser) {
        throw new NotFoundException("User not found");
      }

      const randomText = crypto.randomBytes(32).toString("hex");

      const passwordResetUrl = `${req.protocol}://${req.host}:${appConfig.port}/api/v1/auth/reset-password/${randomText}`;

      await sendMail({
        html: `<a href="${passwordResetUrl}">Click here</a>`,
        to: foundedUser.email,
        subject: "Click link below to reset password",
      });

      await this.#_userModel.findByIdAndUpdate(foundedUser.id, {
        passwordResetToken: randomText,
        passwordResetTokenExpireTime:
          Date.now() + Number(passwordResetConfig.expireTime) * 1000,
      });

      res.send(passwordResetUrl);

    } catch (error) {
      next(error);
    }
  };

  // Reset Password
  resetPassword = async (req, res, next) => {
    try {
      const { password } = req.body;

      const token = req.params.token;

      const foundedUser = await this.#_userModel.findOne({
        passwordResetToken: token,
      });

      if (!foundedUser) {
        throw new NotFoundException("User not found");
      }

      if (foundedUser.passwordResetTokenExpireTime - Date.now() < 0) {
        throw new ConflictException("Password reset time already expired");
      }

      const hashedPass = await bcrypt.hash(password, bcryptConfig.rounds);

      await this.#_userModel.findByIdAndUpdate(foundedUser.id, {
        password: hashedPass,
        passwordResetToken: null,
        passwordResetTokenExpireTime: null,
      });

      res.send("Muvaffaqqiyatli o'zgartirildi");
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();