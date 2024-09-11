import { Router } from "express";
import adminController from "./admin.controller.js";

const  adminRouter = Router();

adminRouter
    .post('/add', adminController.addAdmin)
    .post('/signin', adminController.signin)
    .post('/confirm-otp', adminController.confirmOTP);

export default adminRouter;
